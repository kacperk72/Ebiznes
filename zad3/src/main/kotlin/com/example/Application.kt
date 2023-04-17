package com.example

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.plugins.*
import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.entity.Message
import dev.kord.core.entity.channel.TextChannel
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable

@Serializable
data class DiscordMessage(val channelId: String, val message: String)

suspend fun sendMessageToDiscord(kord: Kord, channelId: String, message: String): Message {
    val channel = kord.getChannel(Snowflake(channelId)) as? TextChannel
        ?: throw IllegalArgumentException("Nieprawidłowe ID kanału")
    return channel.createMessage(message)
}

fun main() {
    val token = "MTA5NzIzNTExMzM4Njk2NzA2MA.Gik2-U.pOoMDCTcEda7wWUfOlEUEuInsXfc51alsH_qdA"
    val kord = runBlocking { Kord(token) }

    embeddedServer(Netty, port = 8081) {
        routing {
            post("/send-message") {
                val discordMessage = call.receive<DiscordMessage>()

                try {
                    runBlocking { sendMessageToDiscord(kord, discordMessage.channelId, discordMessage.message) }
                    call.respond(HttpStatusCode.OK, "Wiadomość wysłana")
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Błąd podczas wysyłania wiadomości")
                }
            }
        }
    }.start(wait = true)
}

fun Application.module() {
    configureSerialization()
    configureSockets()
    configureRouting()
}
