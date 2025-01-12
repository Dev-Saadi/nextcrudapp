import connectToDataBase from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDataBase();
    const getAllBlogFromDatabase = await Blog.find({});
    if (getAllBlogFromDatabase) {
      return NextResponse.json({
        success: true,
        data: getAllBlogFromDatabase,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something Went wrong! Please Try Again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something Went wrong! Please Try Again",
    });
  }
}
