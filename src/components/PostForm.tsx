// src/components/PostForm.tsx
import React from 'react';
import { FormData, FormProps } from '@/types'; // Adjust path if types.ts is elsewhere
import CategorySelector from './CategorySelector';
import  {categories } from '@/data/categories'; // Adjust path if categories.ts is elsewhere

const PostForm: React.FC<FormProps> = ({
  formData,
  setFormData,
  handleImageUpload,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleSubmit,
  handleClear,
  fileInputRef,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
        <div className="flex justify-between mb-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Post Item
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Add Photo</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/png,image/jpeg"
              multiple
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
            />
            <p className="text-xs text-gray-500 mt-1">First picture is the title picture. Drag to reorder. PNG/JPG only, max 5 images.</p>
            <div className="grid grid-cols-5 gap-4 mt-2">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="relative border-2 border-dashed border-gray-300 p-2 rounded"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  {index === 0 && <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs p-1 rounded-br">Title</span>}
                </div>
              ))}
            </div>
          </div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="Price"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            placeholder="Condition (e.g., new, used)"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Location"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            placeholder="Contact Info"
            className="w-full p-2 border rounded"
            required
          />
          <CategorySelector formData={formData} setFormData={setFormData} />
          {formData.category === 'Jobs' && (
            <>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                value={formData.requirements || ''}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Requirements"
                className="w-full p-2 border rounded"
                required
              />
            </>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Post Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;