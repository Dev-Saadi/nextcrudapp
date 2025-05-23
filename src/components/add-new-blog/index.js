"use client";

import React from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddNewBlog = ({
  openDialogBox,
  setopenDialogBox,
  loading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
  currentEditBlogId,
  setCurrentEditBlogId,
}) => {
  return (
    <>
      <div>
        <Button
          className="bg-pink-900 hover:bg-slate-600 hover:text-white text-black duration-300 ease-in-out"
          onClick={() => setopenDialogBox(true)}
        >
          Add New Blog
        </Button>
      </div>

      <Dialog
        open={openDialogBox}
        onOpenChange={() => {
          setopenDialogBox(false);
          setBlogFormData({
            title: "",
            description: "",
          });
          setCurrentEditBlogId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-zinc-400">
          <DialogHeader>
            <DialogTitle>
              {currentEditBlogId ? "Edit Blog" : "Add New Blog"}
            </DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Enter Blog title"
                value={blogFormData.title}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    title: event.target.value,
                  })
                }
                id="title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                name="description"
                placeholder="What's on your mind ?"
                value={blogFormData.description}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: event.target.value,
                  })
                }
                id="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveBlogData} type="button">
              {loading ? "Saving change" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewBlog;
