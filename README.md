## Getting Started

## 1. Установка и запуск

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

Пример

```javascript
<ComboBox
	selectedCategories={selectedCategories}
	onChange={setSelectedCategories}
	backgroundColor='red'
	color='red'
	fontSize='20px'
	border='1px solid red'
/>
```
