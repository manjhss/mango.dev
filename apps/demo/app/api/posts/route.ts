import { NextResponse } from "next/server";
import { mg } from "@/lib/mango";
import {Post, POSTS, TRANSLATED_POSTS } from "@/lib/data";

export async function GET() {
  try {
    /* translate posts using Mango — commented out to avoid unnecessary API calls during development

      const posts = POSTS as Post[]; // mimics fetching posts from an external api or database

      const translated = await mg.translate(
        { posts },
        {
          exclude: ["posts[].username"], // exclude username from translation
          fast: true,
        },
      );
    */

    const translated = TRANSLATED_POSTS; // mimics the same translated response from Mango

    return NextResponse.json({ data: translated, status: "ok" });
  } catch (error) {
    return NextResponse.json(
      { data: [], status: "error", message: String(error) },
      { status: 500 },
    );
  }
}
