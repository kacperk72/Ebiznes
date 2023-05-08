package product

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type Controller struct {
	db *gorm.DB
}

func NewController(db *gorm.DB) *Controller {
	return &Controller{db}
}

func (c *Controller) GetAll(ctx echo.Context) error {
	var products []Product
	c.db.Find(&products)
	return ctx.JSON(http.StatusOK, products)
}

func (c *Controller) GetByID(ctx echo.Context) error {
	id, _ := strconv.Atoi(ctx.Param("id"))
	var product Product
	c.db.First(&product, id)

	if product.ID == 0 {
		return ctx.NoContent(http.StatusNotFound)
	}

	return ctx.JSON(http.StatusOK, product)
}

func (c *Controller) Create(ctx echo.Context) error {
	product := new(Product)
	if err := ctx.Bind(product); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	c.db.Create(&product)
	return ctx.JSON(http.StatusCreated, product)
}

func (c *Controller) Update(ctx echo.Context) error {
	id, _ := strconv.Atoi(ctx.Param("id"))
	var product Product
	c.db.First(&product, id)

	if product.ID == 0 {
		return ctx.NoContent(http.StatusNotFound)
	}
	newProduct := new(Product)
	if err := ctx.Bind(newProduct); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	product.Name = newProduct.Name
	product.Price = newProduct.Price
	c.db.Save(&product)

	return ctx.JSON(http.StatusOK, product)
}

func (c *Controller) Delete(ctx echo.Context) error {
	id, _ := strconv.Atoi(ctx.Param("id"))

	var product Product
	c.db.First(&product, id)

	if product.ID == 0 {
		return ctx.NoContent(http.StatusNotFound)
	}

	c.db.Delete(&product)

	return ctx.NoContent(http.StatusNoContent)
}

