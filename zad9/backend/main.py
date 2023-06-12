import openai
import sys

openai.api_key = 'klucz api'

user_message = sys.argv[1]

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": user_message},
    ]
)

print(response.choices[0].message['content'])