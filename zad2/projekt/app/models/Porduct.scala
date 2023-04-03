package models

case class Product(id: Long, description: String, price: Double, category: Category)

object Product {
  val productList = List(
    Product(1, "Produkt 1", "Opis produktu 1", 100.0, Category(1, "Kategoria 1")),
    Product(2, "Produkt 2", "Opis produktu 2", 200.0, Category(2, "Kategoria 2")),
    Product(3, "Produkt 3", "Opis produktu 3", 300.0, Category(3, "Kategoria 3")),
    Product(4, "Produkt 4", "Opis produktu 4", 400.0, Category(1, "Kategoria 1")),
    Product(5, "Produkt 5", "Opis produktu 5", 500.0, Category(2, "Kategoria 2"))
  )
}
