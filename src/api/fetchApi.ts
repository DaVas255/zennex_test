import { API_URL } from "@/app/consts";
import { Category, Product } from "@/types/types";

export async function fetchProducts(): Promise<Product[] | null> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Ошибка получения товаров');

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchCategories(): Promise<Category[] | null> {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Ошибка получения категорий');

    const data: Category[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchCategoryProducts(selectedCategories: string[]): Promise<Product[] | null> {
  if (!selectedCategories.length) return fetchProducts();

  try {
    const responses = selectedCategories.map((category) =>
      fetch(`${API_URL}/category/${category}`).then((res) =>
        res.json()
      )
    );

    const data = await Promise.all(responses);
    return data.flat();
  } catch (error) {
    console.error(error);
    return null;
  }
}
