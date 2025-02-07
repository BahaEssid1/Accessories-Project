package middlewares

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func Authenticate(c *fiber.Ctx) error {
	// Récupérer l'en-tête Authorization
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		log.Println("Authorization header is missing")
		return c.Status(401).JSON(fiber.Map{"error": "Missing Authorization header"})
	}

	// Extraire le token
	tokenString := authHeader[len("Bearer "):]
	log.Println("Token received:", tokenString)

	// Valider le token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Vérifier la méthode de signature
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			log.Println("Invalid signing method")
			return nil, fiber.NewError(fiber.StatusUnauthorized, "Invalid signing method")
		}
		// Retourner le secret partagé
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		log.Println("Token parsing error:", err)
		return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	// Vérifier les claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		log.Println("Invalid token claims")
		return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	// Loguer les claims extraits
	log.Println("Token claims:", claims)

	// Ajouter les claims au contexte
	c.Locals("user", claims)
	return c.Next()
}
