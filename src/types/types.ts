export type Product = {
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
}

export type Category = Product['category'];

export type ProductsListProps = {
  products: Product[];
};

export type ChevronProps = {
  onClick: () => void;
}

export type ComboBoxProps = {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  border?: string;
};
