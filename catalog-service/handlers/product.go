package handlers

import (
	"fmt"
	"log"
	//"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"catalog-service/database"
	//"catalog-service/models"
)

// Ajouter un produit
func CreateProduct(c *fiber.Ctx) error {
	// Récupérer les données du produit
	title := c.FormValue("title")
	description := c.FormValue("description")
	priceStr := c.FormValue("price")
	categoryIDStr := c.FormValue("category_id")

	if title == "" || priceStr == "" || categoryIDStr == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Title, price, and category ID are required"})
	}

	// Convertir le prix et l'ID de la catégorie
	price, err := strconv.ParseFloat(priceStr, 64)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid price format"})
	}

	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid category ID format"})
	}

	// Gérer l'upload de photo
	var photoPath string
	file, err := c.FormFile("photo")
	if err == nil {
		photoPath = fmt.Sprintf("./uploads/%d-%s", time.Now().Unix(), file.Filename)
		if err := c.SaveFile(file, photoPath); err != nil {
			log.Println("Error saving photo:", err)
			return c.Status(500).JSON(fiber.Map{"error": "Failed to save photo"})
		}
	}

	// Insérer le produit dans la base de données
	query := `
		INSERT INTO products (title, description, price, available, photos, category_id)
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
	`
	var productID int
	err = database.DB.QueryRow(query, title, description, price, true, photoPath, categoryID).Scan(&productID)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create product"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "Product created successfully", "id": productID})
}

//update Produit
func UpdateProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Product ID is required"})
	}

	title := c.FormValue("title")
	description := c.FormValue("description")
	priceStr := c.FormValue("price")
	categoryIDStr := c.FormValue("category_id")
	availableStr := c.FormValue("available")

	var price *float64
	var categoryID *int
	var available *bool

	if priceStr != "" {
		parsedPrice, err := strconv.ParseFloat(priceStr, 64)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid price format"})
		}
		price = &parsedPrice
	}

	if categoryIDStr != "" {
		parsedCategoryID, err := strconv.Atoi(categoryIDStr)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid category ID format"})
		}
		categoryID = &parsedCategoryID
	}

	if availableStr != "" {
		parsedAvailable, err := strconv.ParseBool(availableStr)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid available format"})
		}
		available = &parsedAvailable
	}

	query := `
		UPDATE products
		SET title = COALESCE(NULLIF($1, ''), title),
		    description = COALESCE(NULLIF($2, ''), description),
		    price = COALESCE($3, price),
		    category_id = COALESCE($4, category_id),
		    available = COALESCE($5, available)
		WHERE id = $6
		RETURNING id
	`

	var updatedID int
	err := database.DB.QueryRow(query, title, description, price, categoryID, available, id).Scan(&updatedID)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update product"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Product updated successfully", "id": updatedID})
}

//deleteProduct
func DeleteProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Product ID is required"})
	}

	_, err := database.DB.Exec(`DELETE FROM products WHERE id = $1`, id)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete product"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Product deleted successfully"})
}


func GetAllProducts(c *fiber.Ctx) error {
	query := `
		SELECT p.id, p.title, p.description, p.price, p.available, p.photos, c.name AS category
		FROM products p
		JOIN categories c ON p.category_id = c.id
	`
	rows, err := database.DB.Query(query)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch products"})
	}
	defer rows.Close()

	var products []fiber.Map
	baseURL := c.BaseURL() // Récupère l'URL de base (exemple : http://localhost:3002)
	for rows.Next() {
		var id int
		var title, description, photos, category string
		var price float64
		var available bool

		err := rows.Scan(&id, &title, &description, &price, &available, &photos, &category)
		if err != nil {
			log.Println("Error scanning product row:", err)
			return c.Status(500).JSON(fiber.Map{"error": "Failed to parse products"})
		}

		// Générer l'URL complète de la photo
		photoURL := ""
		if photos != "" {
			photoURL = baseURL + "/uploads/" + photos
		}

		products = append(products, fiber.Map{
			"id":          id,
			"title":       title,
			"description": description,
			"price":       price,
			"available":   available,
			"photos":      photoURL,
			"category":    category,
		})
	}

	return c.Status(200).JSON(products)
}
