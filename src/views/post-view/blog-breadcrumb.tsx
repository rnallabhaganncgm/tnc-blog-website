import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogBreadcrumbProsp {
  categoryName: string;
}
const BlogBreadcrumb = ({ categoryName }: BlogBreadcrumbProsp) => {
  return (
    <div className="w-full bg-white">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2 text-xs font-medium text-gray-600">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="flex items-center gap-1">
                <div className="relative w-5 h-5">
                  <Image
                    src="/assets/nc-logo-icon.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-gray-400" />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="transition-colors text-gray-600 hover:text-black"
              >
                News
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-gray-400" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black font-semibold">
              {categoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BlogBreadcrumb;
