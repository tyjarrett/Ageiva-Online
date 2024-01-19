frontend dev setup

- cd AgingHealthApp
- download expo go app
- npx expo start
- scan qr code with camera app (ios) or the expo go app (android)

backend dev setup

- cd AgingHealthBackend
- create local postgres database
  > psql postgres -> CREATE DATABASE healthapp
- create .env file from .env.template
- python manage.py runserver
