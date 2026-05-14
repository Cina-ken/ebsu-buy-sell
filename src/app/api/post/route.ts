import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Adjust path if needed
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const condition = formData.get('condition') as string;
  const location = formData.get('location') as string;
  const contact = formData.get('contact') as string;
  const category = formData.get('category') as string;
  const subcategory = formData.get('subcategory') as string;
  const userId = formData.get('userId') as string;
  const company = formData.get('company') as string | null;
  const requirements = formData.get('requirements') as string | null;
  const images = formData.getAll('images') as File[];

  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let data;
  try {
    const imageUrls = [];
    for (const image of images) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = join(process.cwd(), 'public/uploads', fileName);
      await writeFile(filePath, buffer);
      imageUrls.push(`/uploads/${fileName}`);
    }

    switch (category) {
      case 'Phones & Tablets':
      case 'Electronics':
      case 'Fashion':
      case 'Home Furniture & Appliances':
      case 'Leisure & Activities':
      case 'Property':
      case 'Repair & Construction':
      case 'Vehicles':
        data = await prisma.product.create({
          data: {
            title,
            description,
            price: price ? parseFloat(price) : 0,
            condition,
            imageUrl: imageUrls[0] || '',
            location,
            contact,
            category,
            subcategory,
            userId,
          },
        });
        break;
      case 'Services':
        data = await prisma.service.create({
          data: {
            title,
            description,
            rate: price ? parseFloat(price) : 0,
            contact,
            category,
            subcategory,
            userId,
          },
        });
        break;
      case 'Jobs':
        data = await prisma.job.create({
          data: {
            title,
            description,
            requirements: requirements || '',
            company: company || '',
            contact,
            category,
            subcategory,
            userId,
          },
        });
        break;
      case 'Food, Agriculture & Farming':
      case 'Babies & Kids':
      case 'Beauty & Personal Care':
      case 'Commercial Equipment & Tools':
        data = await prisma.product.create({
          data: {
            title,
            description,
            price: price ? parseFloat(price) : 0,
            condition,
            imageUrl: imageUrls[0] || '',
            location,
            contact,
            category,
            subcategory,
            userId,
          },
        });
        break;
      default:
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}