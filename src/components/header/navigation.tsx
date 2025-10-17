"use client";
import React, { useMemo } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axiosClient";

// Type the API response
interface Category {
  term_id: number;
  name: string;
  slug: string;
}

interface MenuItem {
  title: string;
  dropdown?: Category[];
  basePath?: string;
  href?: string;
  static?: boolean;
}

const Navigation: React.FC = () => {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await API.get("/api/categories");
      return response.data;
    },
  });

  const usedCategoryNames = new Set<string>();

  const findCategories = (names: string[]): Category[] => {
    const matched = categories.filter(
      (cat) =>
        names.some(
          (n) =>
            n.toLowerCase().trim() === cat.name.toLowerCase().trim() &&
            !usedCategoryNames.has(cat.name.toLowerCase().trim())
        )
    );

    matched.forEach((cat) =>
      usedCategoryNames.add(cat.name.toLowerCase().trim())
    );

    return matched;
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuItems: MenuItem[] = useMemo(() => {
    return [
      {
        title: "News",
        dropdown: findCategories([
          "Altcoin News",
          "Bitcoin News",
          "Ethereum News",
          "Blockchain News",
          "NFT News",
          "Exchange News",
        ]),
        basePath: "news",
      },
      {
        title: "Exclusive",
        dropdown: findCategories([
          "Market news",
          "Price Analysis",
          "Crypto Price Prediction",
        ]),
        basePath: "exclusive",
      },
      { title: "Editor’s Choice", href: "/category/editors-news" },
      { title: "Press Release", href: "/category/press-release" },
      { title: "Interview", href: "/category/interview" },
      { title: "Learn", href: "/category/learn" },
      {
        title: "Our Company",
        dropdown: [
          { name: "About Us", slug: "about-us", term_id: 0 },
          { name: "Contact Us", slug: "contact-us", term_id: 0 },
        ],
        static: true,
      },
    ];
  }, [categories]); // findCategories is fine to exclude as it's stable in scope

  return (
    <div className="flex-1 hidden lg:flex justify-center">
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex-wrap">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              {item.dropdown && item.dropdown.length > 0 ? (
                <>
                  <NavigationMenuTrigger className="hover:cursor-pointer">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white shadow-lg z-10 relative">
                    <ul className="grid w-52 gap-1">
                      {item.dropdown.map((cat, i) => (
                        <li key={cat.term_id || i}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={
                                item.static
                                  ? `/${cat.slug}`
                                  : `/${item.basePath}/${cat.slug}`
                              }
                              className="block rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                            >
                              {cat.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.href || "#"}>{item.title}</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
