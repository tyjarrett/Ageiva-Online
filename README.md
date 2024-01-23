frontend dev setup

- cd AgingHealthApp
- download expo go app
- npx expo start
- set ip adresss of local server in utilities/constants.ts
- scan qr code with camera app (ios) or the expo go app (android)

backend dev setup

- cd AgingHealthBackend
- pip install dependencies: python-dotenv, django, djangorestframework, psycopg, psycopg2
- create local postgres database
  > psql postgres -> CREATE DATABASE healthapp
- create .env file from .env.template
- python manage.py runserver 0.0.0.0:8000
