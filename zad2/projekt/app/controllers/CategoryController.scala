// package controllers

// import javax.inject._
// import play.api.mvc._
// import models.Category

// @Singleton
// class CategoryController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
//    // Metoda wyświetlająca wszystkie kategorie
//   def showAllCategories = Action { implicit request: Request[AnyContent] =>
//     Ok(views.html.categoryList(categoryList))
//   }

//   // Metoda wyświetlająca kategorię o podanym ID
//   def showCategoryById(categoryId: Long) = Action { implicit request: Request[AnyContent] =>
//     categoryList.find(_.id == categoryId) match {
//       case Some(category) => Ok(views.html.categoryDetails(category))
//       case None => NotFound
//     }
//   }

//   // Metoda aktualizująca kategorię o podanym ID
//   def updateCategoryById(categoryId: Long) = Action { implicit request: Request[AnyContent] =>
//     categoryList.find(_.id == categoryId) match {
//       case Some(category) =>
//         val updatedCategory = Category(categoryId, "Nowa nazwa kategorii")
//         categoryList = categoryList.filterNot(_.id == categoryId) :+ updatedCategory
//         Redirect(routes.CategoryController.showCategoryById(categoryId))
//       case None => NotFound
//     }
//   }

//   // Metoda usuwająca kategorię o podanym ID
//   def deleteCategoryById(categoryId: Long) = Action { implicit request: Request[AnyContent] =>
//     categoryList.find(_.id == categoryId) match {
//       case Some(category) =>
//         categoryList = categoryList.filterNot(_.id == categoryId)
//         Redirect(routes.CategoryController.showAllCategories())
//       case None => NotFound
//     }
//   }

//   // Metoda dodająca nową kategorię
//   def addCategory() = Action { implicit request: Request[AnyContent] =>
//     val newCategory = Category(4, "Nowa kategoria")
//     categoryList = categoryList :+ newCategory
//     Redirect(routes.CategoryController.showAllCategories())
//   }
// }
