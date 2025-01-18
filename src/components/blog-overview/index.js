"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

const BlogOverview = ({ blogList }) => {
  const initialBlogFormData = {
    title: "",
    description: "",
  };

  const [openDialogBox, setopenDialogBox] = useState(false);
  const [loading, setloading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditBlogId, setCurrentEditBlogId] = useState(null);

  const router = useRouter();

  async function handleSaveBlogData() {
    try {
      setloading(true);
      const apiResponse =
        currentEditBlogId !== null
          ? await fetch(`/api/update-blog?id=${currentEditBlogId}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              body: JSON.stringify(blogFormData),
            });
      const result = await apiResponse.json();
      if (result.success) {
        setBlogFormData(initialBlogFormData);
        setopenDialogBox(false);
        setloading(false);
        setCurrentEditBlogId(null);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      setBlogFormData(initialBlogFormData);
    }
  }

  async function handleDeteleBlogbyID(getCurrentId) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentId}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result.success) router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditBlogbyID(getCurrentBlog) {
    setCurrentEditBlogId(getCurrentBlog._id);
    setBlogFormData({
      title: getCurrentBlog.title,
      description: getCurrentBlog.description,
    });
    setopenDialogBox(true);
  }

  return (
    <div className="min-h-screen p-5 flex flex-col gap-10 bg-gradient-to-br from-slate-500 to-slate-900">
      <AddNewBlog
        openDialogBox={openDialogBox}
        setopenDialogBox={setopenDialogBox}
        loading={loading}
        setloading={setloading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditBlogId={currentEditBlogId}
        setCurrentEditBlogId={setCurrentEditBlogId}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {blogList && blogList.length > 0 ? (
          blogList.map((item, key) => (
            <Card key={key} className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <div className="gap-5 flex mt-5 items-center">
                  <Button onClick={() => handleEditBlogbyID(item)}>Edit</Button>
                  <Button onClick={() => handleDeteleBlogbyID(item._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-4xl text-emerald-950 font-extrabold">
            No Blog Found! Add new Blog
          </Label>
        )}
      </div>
    </div>
  );
};

export default BlogOverview;
