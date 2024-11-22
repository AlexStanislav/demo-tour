export interface Product {
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  country: string;
  country_code: string;
  city: string;
  image: string;
  amenity_type: Array<string>;
}

export interface RadioInputProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
