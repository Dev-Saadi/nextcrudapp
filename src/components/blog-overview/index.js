"use client";

import { useState } from "react";
import AddNewBlog from "../add-new-blog";

const BlogOverview = () => {
  const initialBlogFormData = {
    title: "",
    description: "",
  };

  const [openDialogBox, setopenDialogBox] = useState(false);
  const [loading, setloading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);

  console.log(blogFormData);

  async function handleSaveBlogData() {
    try {
      setloading(true);
      const apiResponse = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      if (result.success) {
        setBlogFormData(initialBlogFormData);
        setopenDialogBox(false);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      setBlogFormData(initialBlogFormData);
    }
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
      />

      <h3>Blog List Section</h3>
    </div>
  );
};

export default BlogOverview;
