package com.example

import com.jessecorbett.diskord.bot.bot
import com.jessecorbett.diskord.bot.events

suspend fun main() {

    val productCategories = mapOf(
        "Elektronika" to listOf("Smartfon", "Laptop", "Tablet"),
        "Odzież" to listOf("Koszulka", "Spodnie", "Buty"),
        "Sport" to listOf("Piłka", "Rower", "Hantle"),
        "Książki" to listOf("Powieść", "Kryminał", "Biografia"),
        "Zabawki" to listOf("Klocki", "Lalka", "Samochodzik")
    )

    bot("BOT_TOKEN") {

        events {
            onMessageCreate { message ->
                if (message.content == "Kategorie") {
                    message.reply(productCategories.keys.joinToString(separator = ", "))
                    message.react("💯")
                }

                productCategories[message.content]?.let { productList ->
                    message.reply(productList.joinToString(separator = ", "))
                    message.react("💯")
                }
            }
        }


    }

}