import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../utils/auth';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Check for authentication
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const { valid, decoded } = verifyToken(token);
    if (!valid) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const { title, description, category, content, image } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Create new blog post
    const newBlog = await prisma.blog.create({
      data: {
        title,
        description,
        category,
        content,
        image,
        authorId: decoded.id // From the JWT token
      }
    });

    return NextResponse.json({ message: 'Blog created successfully', blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Blog creation error:', error.message, error.stack);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req) {
  try {
    // Fetch all blogs
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
