import openai
import sys

openai.api_key = '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'

user_message = sys.argv[1]  # Pobierz wiadomość od użytkownika z argumentów linii poleceń

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": user_message},
    ]
)

print(response.choices[0].message['content'])