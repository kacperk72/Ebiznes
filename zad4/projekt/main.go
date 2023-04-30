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

	db, err := gorm.Open(sqlite.Open("products.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}

	err = db.AutoMigrate(&product.Product{})
	if err != nil {
		panic("failed to migrate database")
	}

	pc := product.NewController(db)

	e.GET("/products", pc.GetAll)
	e.POST("/products", pc.Create)
	e.GET("/products/:id", pc.GetByID)
	e.PUT("/products/:id", pc.Update)
	e.DELETE("/products/:id", pc.Delete)

	e.Start(":8080")
}
