import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: {
        id: parseInt(id, 10)
      },
      include: {
        author: {
          select: {
            email: true
          }
        }
      }
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
