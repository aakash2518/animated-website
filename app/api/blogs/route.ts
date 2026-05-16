import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'blogs.json');

interface Blog {
  slug: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: 'Failed to read blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newBlog = await request.json();
    const data = fs.readFileSync(filePath, 'utf8');
    const blogs = JSON.parse(data);
    
    // Check if slug already exists
    if (blogs.some((b: Blog) => b.slug === newBlog.slug)) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    blogs.unshift(newBlog);
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
    
    return NextResponse.json(newBlog);
  } catch {
    return NextResponse.json({ error: 'Failed to add blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { slug } = await request.json();
    const data = fs.readFileSync(filePath, 'utf8');
    let blogs = JSON.parse(data);
    
    blogs = blogs.filter((b: Blog) => b.slug !== slug);
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
