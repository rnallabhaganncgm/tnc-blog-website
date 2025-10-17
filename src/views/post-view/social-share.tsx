import React from "react";
import { RiTwitterXLine } from "react-icons/ri";
import {
  FaTelegramPlane,
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { Button } from "@/components/ui/button";

const SocialShare = () => {
  const socials = [
    RiTwitterXLine,
    FaTelegramPlane,
    FaLinkedin,
    FaFacebookF,
    FaInstagram,
    IoMdMail,
    IoLinkSharp,
  ];

  return (
    <div className="hidden lg:block">
      <div className="sticky top-32">
        <div className="space-y-[0.88rem]">
          <div className="text-xs font-normal text-center">Reading</div>
          <div className="flex justify-start">
            <div className="flex flex-col p-[0.75rem] space-y-4 border border-[#03030333]">
              {socials.map((Icon, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="size-6"
                >
                  <Icon className="w-6 h-6" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
