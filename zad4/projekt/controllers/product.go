package controllers

import (
	"net/http"
	"strconv"

	config "../config"
	models "../models"
	"github.com/labstack/echo/v4"
)

func GetAllProducts(c echo.Context) error {
	db, err := config.InitDB()
	if err != nil {
		return err
	}
	defer db.Close()

	var products []models.Product
	db.Find(&products)

	return c.JSON(http.StatusOK, products)
}

func GetProductByID(c echo.Context) error {
	db, err := config.InitDB()
	if err != nil {
		return err
	}
	defer db.Close()

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}

	var product models.Product
	db.First(&product, id)

	return c.JSON(http.StatusOK, product)
}

func CreateProduct(c echo.Context) error {
	db, err := config.InitDB()
	if err != nil {
		return err
	}
	defer db.Close()

	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return err
	}

	db.Create(&product)

	return c.JSON(http.StatusCreated, product)
}

func UpdateProduct(c echo.Context) error {
	db, err := config.InitDB()
	if err != nil {
		return err
	}
	defer db.Close()

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}

	var product models.Product
	db.First(&product, id)

	if err := c.Bind(&product); err
		return err
	}

	db.Save(&product)

	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
	db, err := config.InitDB()
	if err != nil {
		return err
	}
	defer db.Close()

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}

	var product models.Product
	db.First(&product, id)
	db.Delete(&product)

	return c.JSON(http.StatusOK, echo.Map{
		"message": "Product deleted successfully",
	})
}
