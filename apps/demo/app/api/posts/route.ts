import { NextResponse } from "next/server"
import { mg } from "@/lib/mango"
import { DUMMY_POSTS } from "@/lib/blog-data"

export async function GET() {
  try {
    const posts = DUMMY_POSTS // mimic fetching posts from an external api or database
    
    const translated = await mg.translate(
      { posts },
      {
        exclude: ["posts[].id", "posts[].username"], // exclude id, userId and username from translation
        fast: true,
      }
    )

    return NextResponse.json({ data: translated.posts, status: "ok" })
  } catch (error) {
    return NextResponse.json(
      { data: [], status: "error", message: String(error) },
      { status: 500 }
    )
  }
}
