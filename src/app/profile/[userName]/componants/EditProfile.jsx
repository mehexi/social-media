"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ChevronLeft, Pen } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const EditProfile = ({ currentUser }) => {
  const { user } = useUser();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState(
    currentUser?.firstName + " " + currentUser?.lastName || ""
  );
  const [bio, setBio] = useState(currentUser?.bio || "");

  console.log(currentUser.coverPicture);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    try {
      if (profilePicture) {
        const profileImage = await user
          .setProfileImage({ file: profilePicture })
          .then(user.reload());
        formData.append("profileImage", profileImage.publicUrl);
      }

      if (backgroundImage) {
        formData.append("coverPicture", backgroundImage);
      }

      formData.append("name", name);
      formData.append("bio", bio);

      console.log("Submitting Form Data:", formData);

      const { data } = await axios.put("/api/profile", formData);

      toast({
        title: "Profile Updated Successfully",
      });

      window.location.reload()
      console.log("Response Data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full h-8" variant="secondary">
          <Pen /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DialogClose>
                  <Button size="icon" variant="ghost">
                    <ChevronLeft />
                  </Button>
                </DialogClose>
                <span>Edit Profile</span>
              </div>
              <Button className="rounded-full" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {/* Background Image Input */}
          <label htmlFor="background-input">
            <div className="w-full h-32 bg-primary rounded-md overflow-hidden cursor-pointer">
              {backgroundImage ? (
                <Image
                  width={300}
                  height={200}
                  src={URL.createObjectURL(backgroundImage)}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  width={300}
                  height={200}
                  src={currentUser.coverPicture}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </label>
          <input
            id="background-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, setBackgroundImage)}
          />

          {/* Profile Picture Input */}
          <div className="-mt-12 p-3 flex items-end">
            <label htmlFor="profile-picture-input">
              <div className="w-24 h-24 rounded-full bg-secondary overflow-hidden cursor-pointer">
                {profilePicture ? (
                  <Image
                    width={300}
                    height={200}
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    width={300}
                    height={200}
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </label>
            <input
              id="profile-picture-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, setProfilePicture)}
            />
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Bio Input */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              name="bio"
              type="text"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
