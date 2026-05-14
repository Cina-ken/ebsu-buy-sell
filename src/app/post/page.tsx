'use client';

import { useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import PostForm from '@/components/PostForm';
import type { FormData, FormProps } from '@/types'; // Adjust path if types.ts is elsewhere
import { Category } from '@/types'; // Adjust path if categories.ts is elsewhere

export default function PostPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    condition: 'new',
    location: '',
    contact: '',
    category: 'Phones & Tablets', // Default to first category
    subcategory: '',
    images: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isSignedIn) {
    return <p className="p-4">Please sign in to post an item.</p>;
  }

  const handleImageUpload: FormProps['handleImageUpload'] = (event) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file =>
      file.type === 'image/png' || file.type === 'image/jpeg'
    ).slice(0, 5);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...validFiles] }));
  };

  const handleDragStart: FormProps['handleDragStart'] = (e, index) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver: FormProps['handleDragOver'] = (e) => {
    e.preventDefault();
  };

  const handleDrop: FormProps['handleDrop'] = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData('index'), 10);
    const updatedImages = [...formData.images];
    const [movedImage] = updatedImages.splice(oldIndex, 1);
    updatedImages.splice(newIndex, 0, movedImage);
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  const handleSubmit: FormProps['handleSubmit'] = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('condition', formData.condition);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('contact', formData.contact);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('subcategory', formData.subcategory);
    formDataToSend.append('userId', user?.id || '');
    if (formData.company) formDataToSend.append('company', formData.company);
    if (formData.requirements) formDataToSend.append('requirements', formData.requirements);
    formData.images.forEach((image, index) => {
      formDataToSend.append('images', image);
    });

    const response = await fetch('/api/post', {
      method: 'POST',
      body: formDataToSend,
    });
    if (response.ok) {
      router.push('/marketplace');
    } else {
      const error = await response.json();
      console.error(error);
    }
  };

  const handleClear: FormProps['handleClear'] = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      condition: 'new',
      location: '',
      contact: '',
      category: 'Phones & Tablets', // Default to first category
      subcategory: '',
      images: [],
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <PostForm
      formData={formData}
      setFormData={setFormData}
      handleImageUpload={handleImageUpload}
      handleDragStart={handleDragStart}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleSubmit={handleSubmit}
      handleClear={handleClear}
      fileInputRef={fileInputRef}
    />
  );
}