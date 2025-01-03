# Проект:

**Блог like threads**

## Суть проекта:
Это веб-приложение для написания своих мыслей на публику. Каждый может зарегистрироваться и написать свой пост.

## Функционал:
- пользователь 
- меню
  - регистрация
  - авторизация
  - создание постов

- админ
- добавление поста
  - эндпоинт для загрузки поста с заголовком и текстом

- изменение поста
  - эндпоинт для изменения поста

- удаление поста
  - эндпоинт для удаления поста

## Доступные эндпоинты

### Посты
  ```
  POST /create-post
  ```
  - Описание: создание нового поста
  - Параметры:
    - `title`: заголовок для поста
    - `body`: текст для поста

  ```
  GET /one-post/:id
  ```
  - Описание: просмотр поста по id

  ```
  GET /posts
  ```
  - Описание: просмотр всех постов

  ```
  PUT /edit-post/:id
  ```
  - Описание: редактирование поста по id
  - Роль: админ

  ```
  GET /add-post
  ```
  - Описание: создание нового поста
  - Параметры:
    - `title`: заголовок для поста
    - `body`: текст для поста
  - Роль: админ

  ```
  GET /delete-post/:id
  ```
  - Описание: удаление поста по id
  - Роль: админ


### Авторизация

  ```
  POST /login
  ```
  - Описание: авторизация пользователя
  - Параметры:
    - `username`: логин
    - `password`: пароль

  ```
  POST /registration
  ```
  - Описание: регистрация обычного пользователя
  - Параметры:
    - `username`: логин
    - `password`: пароль

---

## 🔧 Запуск проекта

1. Склонируйте этот репозиторий и перейдите в папку с ним

2. Создайте файл `.env` с необходимыми переменными:

```env
MONGODB_URI=персональная ссылка на mongoDB
JWT_SECRET=MySecretBlog
PORT=9797
```

3. Запустите проект из корневой папки:

```bash
npm install
npm run dev
```
---