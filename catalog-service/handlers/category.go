package handlers

import (
	//"fmt"
	"log"
	"github.com/gofiber/fiber/v2"
	"catalog-service/database"

)

//creation d'une category par admin
func CreateCategory(c *fiber.Ctx) error {
	// Récupérer le nom de la catégorie
	name := c.FormValue("name")
	if name == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Category name is required"})
	}

	// Insérer la catégorie dans la base de données
	query := `INSERT INTO categories (name) VALUES ($1) RETURNING id`
	var id int
	err := database.DB.QueryRow(query, name).Scan(&id)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create category"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "Category created successfully", "id": id})
}

//update category
func UpdateCategory(c *fiber.Ctx) error {
	// Récupérer l'ID de la catégorie depuis les paramètres de la route
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Category ID is required"})
	}

	// Récupérer le nouveau nom de la catégorie depuis le corps de la requête
	name := c.FormValue("name") // Assurez-vous que "name" est dans la requête
	if name == "" {
		log.Println("Category name is missing")
		return c.Status(400).JSON(fiber.Map{"error": "Category name is required"})
	}

	// Mise à jour de la catégorie dans la base de données
	query := `UPDATE categories SET name = $1 WHERE id = $2 RETURNING id`
	var updatedID int
	err := database.DB.QueryRow(query, name, id).Scan(&updatedID)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update category"})
	}

	log.Println("Category updated successfully:", updatedID)
	return c.Status(200).JSON(fiber.Map{"message": "Category updated successfully", "id": updatedID})
}


//deleteCategory
func DeleteCategory(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Category ID is required"})
	}

	// Supprimer les produits associés
	_, err := database.DB.Exec(`DELETE FROM products WHERE category_id = $1`, id)
	if err != nil {
		log.Println("Database error while deleting products:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete products for category"})
	}

	// Supprimer la catégorie
	_, err = database.DB.Exec(`DELETE FROM categories WHERE id = $1`, id)
	if err != nil {
		log.Println("Database error while deleting category:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete category"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Category deleted successfully"})
}


//GetCategories
func GetCategories(c *fiber.Ctx) error {
	query := `SELECT id, name FROM categories`
	rows, err := database.DB.Query(query)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch categories"})
	}
	defer rows.Close()

	var categories []fiber.Map
	for rows.Next() {
		var id int
		var name string
		if err := rows.Scan(&id, &name); err != nil {
			log.Println("Error scanning category row:", err)
			return c.Status(500).JSON(fiber.Map{"error": "Failed to parse categories"})
		}
		categories = append(categories, fiber.Map{"id": id, "name": name})
	}

	return c.Status(200).JSON(categories)
}


//GetCategoryCount
func GetCategoryCount(c *fiber.Ctx) error {
	query := `SELECT COUNT(*) FROM categories`
	var count int
	err := database.DB.QueryRow(query).Scan(&count)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to count categories"})
	}

	return c.Status(200).JSON(fiber.Map{"category_count": count})
}


//GetCategoryByID
func GetCategoryByID(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Category ID is required"})
	}

	var categoryID int
	var categoryName string

	query := `SELECT id, name FROM categories WHERE id = $1`
	err := database.DB.QueryRow(query, id).Scan(&categoryID, &categoryName)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(404).JSON(fiber.Map{"error": "Category not found"})
	}

	category := fiber.Map{
		"id":   categoryID,
		"name": categoryName,
	}

	return c.Status(200).JSON(category)
}


//GetProductsByCategory
func GetProductsByCategory(c *fiber.Ctx) error {
	categoryID := c.Params("id")
	if categoryID == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Category ID is required"})
	}

	query := `
		SELECT id, title, description, price, available, photos
		FROM products
		WHERE category_id = $1
	`
	rows, err := database.DB.Query(query, categoryID)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch products"})
	}
	defer rows.Close()

	var products []fiber.Map
	for rows.Next() {
		var id int
		var title, description, photos string
		var price float64
		var available bool

		err := rows.Scan(&id, &title, &description, &price, &available, &photos)
		if err != nil {
			log.Println("Error scanning product row:", err)
			return c.Status(500).JSON(fiber.Map{"error": "Failed to parse products"})
		}

		products = append(products, fiber.Map{
			"id":          id,
			"title":       title,
			"description": description,
			"price":       price,
			"available":   available,
			"photos":      photos,
		})
	}

	return c.Status(200).JSON(products)
}



//GetProductCountByCategory
func GetProductCountByCategory(c *fiber.Ctx) error {
	query := `
		SELECT c.id, c.name, COUNT(p.id) AS product_count
		FROM categories c
		LEFT JOIN products p ON c.id = p.category_id
		GROUP BY c.id, c.name
	`
	rows, err := database.DB.Query(query)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch product counts"})
	}
	defer rows.Close()

	var counts []fiber.Map
	for rows.Next() {
		var id int
		var name string
		var productCount int
		err := rows.Scan(&id, &name, &productCount)
		if err != nil {
			log.Println("Error scanning product count row:", err)
			return c.Status(500).JSON(fiber.Map{"error": "Failed to parse product counts"})
		}
		counts = append(counts, fiber.Map{"category_id": id, "name": name, "product_count": productCount})
	}

	return c.Status(200).JSON(counts)
}

