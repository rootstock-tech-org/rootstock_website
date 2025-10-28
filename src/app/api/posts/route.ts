import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Post = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string | null;
  slug: string;
  content?: string;
};

const dataFile = path.join(process.cwd(), 'src', 'data', 'posts.json');

function readPosts(): Post[] {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

function writePosts(posts: Post[]) {
  fs.writeFileSync(dataFile, JSON.stringify(posts, null, 2), 'utf8');
}

export async function GET() {
  const posts = readPosts();
  // sort by date desc (parse locale dates)
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json(sorted);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Post;
    const posts = readPosts();
    // prevent duplicate slugs
    if (posts.some(p => p.slug === body.slug)) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    const next = [body, ...posts];
    writePosts(next);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

