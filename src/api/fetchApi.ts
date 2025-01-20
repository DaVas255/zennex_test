const url = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type Category = Product['category'];

export async function fetchProducts(): Promise<Product[] | null> {
  try {
    if (!url) return null;
    const response = await fetch(url);
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
    const response = await fetch(`${url}/categories`);
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
      fetch(`${url}/category/${category}`).then((res) =>
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
