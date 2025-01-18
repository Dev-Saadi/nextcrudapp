import connectToDataBase from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDataBase();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");

    if (!getCurrentBlogId) {
      return NextResponse({
        success: false,
        message: "Blog ID Is Required for updating",
      });
    }

    const { title, description } = await req.json();

    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      console.log(error);
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateBlogByID = await Blog.findOneAndUpdate(
      {
        _id: getCurrentBlogId,
      },
      { title, description },
      { new: true }
    );

    if (updateBlogByID) {
      return NextResponse.json({
        success: true,
        message: "Blog is Updated Successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something Went wrong while Updating!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something Went wrong while Updating!",
    });
  }
}
