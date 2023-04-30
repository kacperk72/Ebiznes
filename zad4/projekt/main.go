package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"projekt/product"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Inicjalizacja bazy danych
	db, err := gorm.Open(sqlite.Open("products.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}

	// Migracja bazy danych
	err = db.AutoMigrate(&product.Product{})
	if err != nil {
		panic("failed to migrate database")
	}

	// Inicjalizacja kontrolera produktów
	pc := product.NewController(db)

	// Dodaj obsługę routingu produktów
	e.GET("/products", pc.GetAll)
	e.POST("/products", pc.Create)
	e.GET("/products/:id", pc.GetByID)
	e.PUT("/products/:id", pc.Update)
	e.DELETE("/products/:id", pc.Delete)

	// Uruchom serwer Echo
	e.Start(":8080")
}
