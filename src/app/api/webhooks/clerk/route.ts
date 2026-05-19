import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const headersList = await headers();
  const svix_id = headersList.get('svix-id');
  const svix_timestamp = headersList.get('svix-timestamp');
  const svix_signature = headersList.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const body = await request.json();
  const { type, data } = body;

  if (type === 'user.created' || type === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = data;
    const email = email_addresses?.[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(' ') || null;
    await prisma.user.upsert({ where: { id }, update: { email, name }, create: { id, email, name } });
  }

  if (type === 'user.deleted') {
    const { id } = data;
    await prisma.user.delete({ where: { id } }).catch(() => null);
  }

  return NextResponse.json({ received: true });
}