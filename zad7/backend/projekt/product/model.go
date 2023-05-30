package product

import (
	"gorm.io/gorm"
)

// Product represents a product with a name and price.
type Product struct {
	gorm.Model
	Name  string `json:"name"`
	Price uint   `json:"price"`
}
