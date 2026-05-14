// src/types.ts
export interface Category {
  name: string;
  subcategories: string[];
}

// Define all valid category names based on the provided list
export type CategoryName =
  | 'Phones & Tablets'
  | 'Babies & Kids'
  | 'Beauty & Personal Care'
  | 'Commercial Equipment & Tools'
  | 'Electronics'
  | 'Fashion'
  | 'Food, Agriculture & Farming'
  | 'Jobs'
  | 'Home Furniture & Appliances'
  | 'Leisure & Activities'
  | 'Property'
  | 'Repair & Construction'
  | 'Services'
  | 'Vehicles';

export interface FormData {
  title: string;
  description: string;
  price: string;
  condition: string;
  location: string;
  contact: string;
  category: CategoryName;
  subcategory: string;
  images: File[];
  company?: string;
  requirements?: string;
}

export interface FormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>, newIndex: number) => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleClear: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export interface CategorySelectorProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}