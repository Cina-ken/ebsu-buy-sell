import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { uploadImage } from '@/lib/cloudinary';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const condition = formData.get('condition') as string;
  const location = formData.get('location') as string;
  const contact = formData.get('contact') as string;
  const category = formData.get('category') as string;
  const subcategory = formData.get('subcategory') as string;
  const company = formData.get('company') as string | null;
  const requirements = formData.get('requirements') as string | null;
  const images = formData.getAll('images') as File[];

  try {
    const imageUrls: string[] = [];
    for (const image of images) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const url = await uploadImage(buffer, 'ebsu-buy-sell');
      imageUrls.push(url);
    }

    const productCategories = [
      'Phones & Tablets', 'Electronics', 'Fashion',
      'Home Furniture & Appliances', 'Leisure & Activities',
      'Property', 'Repair & Construction', 'Vehicles',
      'Food, Agriculture & Farming', 'Babies & Kids',
      'Beauty & Personal Care', 'Commercial Equipment & Tools',
    ];

    let data;
    if (productCategories.includes(category)) {
      data = await prisma.product.create({
        data: { title, description, price: price ? parseFloat(price) : 0, condition, imageUrl: imageUrls[0] || '', location, contact, category, subcategory, userId },
      });
    } else if (category === 'Services') {
      data = await prisma.service.create({
        data: { title, description, rate: price ? parseFloat(price) : 0, contact, category, subcategory, userId },
      });
    } else if (category === 'Jobs') {
      data = await prisma.job.create({
        data: { title, description, requirements: requirements || '', company: company || '', contact, category, subcategory, userId },
      });
    } else {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}