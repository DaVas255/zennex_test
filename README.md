## Getting Started

## 1. Установка и запуск

Создать файл .env в корне и указать NEXT_PUBLIC_API_URL

```
npm install
npm run dev
```

Приложение запустится на http://localhost:3000.

## 2. Структура

/api

- fetchApi.ts — функции для запросов к API.

/app

- Общие файлы приложения (Стили, Иконки, Константы и т.д.)

/components

- /ComboBox — компонент для выбора категорий (multi-select с поиском).
- /Filter — обёртка, точка входа.
- /ProductsList — список всех товаров.
- /ProductsItem — товар.

/types

- types.ts — типы.

## 3. Использование стилизации ComboBox

Есть параметр Theme, с помощью которого можно указать тему компонента
light | dark | multi-color

```javascript
<ComboBox
	selectedCategories={selectedCategories}
	onChange={setSelectedCategories}
	theme='light'
/>
```
