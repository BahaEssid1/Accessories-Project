package database

import (
    "database/sql"
    "log"
    "os"

    _ "github.com/jackc/pgx/v5/stdlib" // Driver PostgreSQL
)

var DB *sql.DB

func Connect() {
    // Récupérer l'URL de la base de données depuis .env
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        log.Fatal("DATABASE_URL is not set in the environment variables")
    }

    var err error
    DB, err = sql.Open("pgx", dsn)
    if err != nil {
        log.Fatalf("Failed to connect to the database: %v", err)
    }

    // Vérifier la connexion
    if err := DB.Ping(); err != nil {
        log.Fatalf("Database connection error: %v", err)
    }

    log.Println("Connected to the database successfully!")
}
