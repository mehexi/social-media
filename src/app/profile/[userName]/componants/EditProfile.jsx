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
import { useUser } from "@clerk/nextjs";
import { ChevronLeft, Pen } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const EditProfile = ({ currentUser }) => {
  const { user } = useUser();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    console.log(profilePicture);
    try {
      if (profilePicture) {
        const profileImage = await user.setProfileImage({ file: profilePicture }).then(user.reload())
        console.log(profileImage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(user.imageUrl)

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
                  <Button size="icon" variant="ghost" className="">
                    <ChevronLeft />
                  </Button>
                </DialogClose>
                <h1>Edit Profile</h1>
              </div>
              <Button className="rounded-full" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div>
          {/* Background Image Input */}
          <label htmlFor="background-input">
            <div className="w-full h-32 bg-primary rounded-md overflow-hidden cursor-pointer">
              {backgroundImage ? (
                <Image
                  width={300}
                  height={200}
                  src={backgroundImage}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="flex items-center justify-center text-white h-full">
                  Upload Background Image
                </span>
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

          {/* Other Inputs */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input name="name" type="text" placeholder="Full Name" />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input name="bio" type="text" placeholder="Bio" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
