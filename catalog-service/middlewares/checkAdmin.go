package middlewares

import (
	"log"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func CheckAdmin(c *fiber.Ctx) error {
	// Vérifier si les claims existent dans le contexte
	user := c.Locals("user")
	if user == nil {
		log.Println("Access denied: no user found in context")
		return c.Status(403).JSON(fiber.Map{"error": "Access forbidden: Admin only"})
	}

	claims, ok := user.(jwt.MapClaims)
	if !ok {
		log.Println("Access denied: invalid user claims")
		return c.Status(403).JSON(fiber.Map{"error": "Access forbidden: Admin only"})
	}

	// Vérifier si le rôle est "admin"
	role, ok := claims["role"].(string)
	if !ok || role != "admin" {
		log.Println("Access denied: user role is not admin")
		return c.Status(403).JSON(fiber.Map{"error": "Access forbidden: Admin only"})
	}

	// L'utilisateur est admin, continuer
	return c.Next()
}
