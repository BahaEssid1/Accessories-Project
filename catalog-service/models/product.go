package models

type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Available   bool    `json:"available"`
	Photos      string  `json:"photos"`
	CategoryID  int     `json:"category_id"` // Référence à la catégorie
	CreatedAt   string  `json:"created_at"`
}
