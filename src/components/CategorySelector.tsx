// src/components/CategorySelector.tsx
import React from 'react';
import { CategorySelectorProps, CategoryName } from '@/types'; // Remove FormData import if unused
import { categories } from '@/data/categories'; // Adjust path if categories.ts is elsewhere

const CategorySelector: React.FC<CategorySelectorProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryName, subcategory: '' })}
        className="w-full p-2 border rounded"
      >
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        value={formData.subcategory}
        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Subcategory</option>
        {categories
          .find((cat) => cat.name === formData.category)
          ?.subcategories.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CategorySelector;