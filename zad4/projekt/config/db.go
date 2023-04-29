package config

import (
	models "../models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func InitDB() (*gorm.DB, error) {
	db, err := gorm.Open("sqlite3", "product.db")
	if err != nil {
		return nil, err
	}

	db.AutoMigrate(&models.Product{})

	return db, nil
}
