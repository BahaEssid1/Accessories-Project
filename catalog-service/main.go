// package main

// import (
// 	"log"
// 	"os"

//     "github.com/gofiber/fiber/v2/middleware/cors"
// 	"github.com/gofiber/fiber/v2"
// 	"github.com/gofiber/fiber/v2/middleware/logger"
// 	"github.com/joho/godotenv"

// 	"catalog-service/database"
// 	"catalog-service/handlers"
// 	"catalog-service/middlewares"
// )

// func main() {
// 	if err := godotenv.Load(); err != nil {
// 		log.Println("No .env file found")
// 	}

// 	database.Connect()
// 	app := fiber.New()
// 	app.Use(logger.New())

// 	app.Post("/categories",
// 	middlewares.Authenticate,
// 	middlewares.CheckAdmin,
// 	handlers.CreateCategory)

// 	app.Put("/categories/update/:id",
//     middlewares.Authenticate, // Vérifie la validité du token JWT
//     middlewares.CheckAdmin,   // Vérifie que l'utilisateur est admin
//     handlers.UpdateCategory)  // Modifier une catégorie

// 	app.Delete("/categories/delete/:id",
//     middlewares.Authenticate, // Vérifie la validité du token JWT
//     middlewares.CheckAdmin,   // Vérifie que l'utilisateur est admin
//     handlers.DeleteCategory)  // Supprimer une catégorie


// 	app.Post("/products",
// 	middlewares.Authenticate, // Vérifie la validité du token
// 	middlewares.CheckAdmin,   // Vérifie que l'utilisateur est admin
// 	handlers.CreateProduct)   // Ajouter un produit

// 	app.Delete("/products/delete/:id",
// 	middlewares.Authenticate, // Vérifie la validité du token
// 	middlewares.CheckAdmin,   // Vérifie que l'utilisateur est admin
// 	handlers.DeleteProduct)
    
// 	app.Put("/products/update/:id",
// 	middlewares.Authenticate, // Vérifie le token JWT
// 	middlewares.CheckAdmin,   // Vérifie le rôle admin
// 	handlers.UpdateProduct)   // Modifier un produit

// 	app.Get("/admin/categories", 
// 	middlewares.Authenticate,
// 	middlewares.CheckAdmin, 
// 	handlers.GetCategories)          // Voir toutes les catégories
//     app.Get("/admin/categories/count", 
// 	middlewares.Authenticate, 
// 	middlewares.CheckAdmin, 
// 	handlers.GetCategoryCount) // Voir le nombre total de catégories
//     app.Get("/admin/categories/:id", 
// 	middlewares.Authenticate, 
// 	middlewares.CheckAdmin, 
// 	handlers.GetCategoryByID)    // Voir une catégorie par ID
//     app.Get("/admin/categories/:id/products", 
// 	middlewares.Authenticate, 
// 	middlewares.CheckAdmin, 
// 	handlers.GetProductsByCategory) // Voir les produits d'une catégorie
//     app.Get("/admin/categories/products/count", 
// 	middlewares.Authenticate, 
// 	middlewares.CheckAdmin, 
// 	handlers.GetProductCountByCategory) // Nombre de produits par catégorie
// 	app.Get("/admin/products", 
// 	middlewares.Authenticate, 
// 	middlewares.CheckAdmin, 
// 	handlers.GetAllProducts)


// 	app.Static("/uploads", "./uploads")
// 	port := os.Getenv("PORT")
// 	if port == "" {
// 		port = "3002"
// 	}
// 	log.Fatal(app.Listen(":" + port))
// }



package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"catalog-service/database"
	"catalog-service/handlers"
	"catalog-service/middlewares"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	database.Connect()
	app := fiber.New()
	app.Use(logger.New())

	// Set up CORS to allow your frontend's origin
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3001", // Update this to your frontend's URL
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Authorization,Content-Type",
	}))

	app.Post("/categories",
		middlewares.Authenticate,
		middlewares.CheckAdmin,
		handlers.CreateCategory)

	app.Put("/categories/update/:id",
		middlewares.Authenticate, // Vérifie la validité du token JWT
		middlewares.CheckAdmin,   // Vérifie que l'utilisateur est admin
		handlers.UpdateCategory)  // Modifier une catégorie

	app.Delete("/categories/delete/:id",
		middlewares.Authenticate, // Vérifie la validité du token JWT
		middlewares.CheckAdmin,   // Vérifie que l'utilisateur est admin
		handlers.DeleteCategory)  // Supprimer une catégorie

	app.Post("/products",
		middlewares.Authenticate, // Vérifie la validité du token
		middlewares.CheckAdmin,   // Vérifie que l'utilisateur est admin
		handlers.CreateProduct)   // Ajouter un produit

	app.Delete("/products/delete/:id",
		middlewares.Authenticate, // Vérifie la validité du token
		middlewares.CheckAdmin,   // Vérifie que l'utilisateur est admin
		handlers.DeleteProduct)

	app.Put("/products/update/:id",
		middlewares.Authenticate, // Vérifie le token JWT
		middlewares.CheckAdmin,   // Vérifie le rôle admin
		handlers.UpdateProduct)   // Modifier un produit

	app.Get("/admin/categories",
		middlewares.Authenticate,
		middlewares.CheckAdmin,
		handlers.GetCategories) // Voir toutes les catégories

	app.Get("/admin/categories/count",
		middlewares.Authenticate,
		middlewares.CheckAdmin,
		handlers.GetCategoryCount) // Voir le nombre total de catégories

	app.Get("/admin/categories/:id",
		middlewares.Authenticate,
		middlewares.CheckAdmin,
		handlers.GetCategoryByID) // Voir une catégorie par ID

	app.Get("/admin/categories/:id/products",
		middlewares.Authenticate,
		middlewares.CheckAdmin,
		handlers.GetProductsByCategory) // Voir les produits d'une catégorie

	app.Get("/admin/categories/products/count",
		middlewares.Authenticate,
		middlewares.CheckAdmin,
		handlers.GetProductCountByCategory) // Nombre de produits par catégorie

	app.Get("/admin/products",
		middlewares.Authenticate,
		middlewares.CheckAdmin,
		handlers.GetAllProducts)

	app.Static("/uploads", "./uploads")

	port := os.Getenv("PORT")
	if port == "" {
		port = "3002"
	}
	log.Fatal(app.Listen(":" + port))
}
