import connectToDataBase from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDataBase();
    const { searchParams } = new URL(req.url);
    const getBlogID = searchParams.get("id");
    if (!getBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog Id is required",
      });
    }

    const deleteCurrentBlogbyID = await Blog.findByIdAndDelete(getBlogID);

    if (deleteCurrentBlogbyID) {
      return NextResponse.json({
        success: true,
        message: "Blog is Deleted",
      });
    } else {
      return NextResponse.json({
        success: false,
        message:
          "Something Went wrong when trying to delete a blog! Check Again",
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
