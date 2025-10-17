import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#14151e] text-[#ffffff] py-12 px-4 md:px-8 lg:px-16 relative">
      {/* Logo and Social Media Section */}
      <div className="w-full mx-auto">
        <div className="flex flex-col space-y-12">
          {/* Main Navigation Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-8">
              {/* Logo */}
              <div className="flex items-center">
                <div className="w-full h-full relative mr-4">
                  <Image
                    src="/assets/logo-footer.png"
                    alt="TheNewsCrypto Logo"
                    width={500}
                    height={200}
                    className="h-full w-full"
                  />
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {[
                  { name: "Twitter", icon: <FaXTwitter /> },
                  { name: "Telegram", icon: <FaTelegramPlane /> },
                  { name: "YouTube", icon: <FaYoutube /> },
                  { name: "LinkedIn", icon: <FaLinkedinIn /> },
                  { name: "Instagram", icon: <FaInstagram /> },
                  { name: "Facebook", icon: <FaFacebook /> },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href="#"
                    className="w-10 h-10 bg-[#282828] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <span className="text-xl hover:text-primary">
                      {social.icon}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Crypto News Column */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Crypto News</h2>
              <ul className="space-y-2">
                {["Bitcoin", "Ethereum", "Solana"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-[#09c1bf] transition-colors text-[#FFFFFFAD]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Quick Links</h2>
              <ul className="space-y-2">
                {[
                  "News",
                  "Altcoin News",
                  "Bitcoin News",
                  "Exchange News",
                  "Crypto Price Prediction",
                  "Our Partners",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-[#09c1bf] transition-colors text-[#FFFFFFAD]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us Column */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Us</h2>
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">For Advertisement</p>
                  <Link
                    href="mailto:Advertise@thenewscrypto.com"
                    className="hover:text-[#09c1bf] transition-colors"
                  >
                    Advertise@thenewscrypto.com
                  </Link>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">For Media Partnership</p>
                  <Link
                    href="mailto:Media@thenewscrypto.com"
                    className="hover:text-[#09c1bf] transition-colors"
                  >
                    Media@thenewscrypto.com
                  </Link>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">For Press Release</p>
                  <Link
                    href="mailto:submissionPr@thenewscrypto.com"
                    className="hover:text-[#09c1bf] transition-colors"
                  >
                    submissionPr@thenewscrypto.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Categories */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Top Crypto Sectors */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Top Crypto Sectors</h2>
              <div className="flex flex-wrap gap-2 ">
                {[
                  "Decentralized Finance",
                  "Non-Fungible Tokens",
                  "GameFi",
                  "Metaverse",
                  "Institutional Crypto",
                  "Privacy Coins",
                  "Stablecoins",
                ].map((sector) => (
                  <Link
                    key={sector}
                    href="#"
                    className="px-4 py-2 bg-[#282828] rounded-full text-sm hover:bg-opacity-80 transition-colors text-[#FFFFFF66] hover:text-primary"
                  >
                    {sector}
                  </Link>
                ))}
              </div>
            </div>

            {/* More */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">More</h2>
              <ul className="space-y-2 ">
                {[
                  "About",
                  { name: "Advertising", isNew: true },
                  "FAQ",
                  "Disclaimers",
                  "Support",
                ].map((item) => (
                  <li key={typeof item === "string" ? item : item.name}>
                    <Link
                      href="#"
                      className="hover:text-[#09c1bf] transition-colors flex items-center text-[#FFFFFFAD]"
                    >
                      {typeof item === "string" ? (
                        item
                      ) : (
                        <>
                          {item.name}
                          {item.isNew && (
                            <span className="ml-2 px-2 py-0.5 bg-[#09c1bf] text-[#14151e] text-xs rounded">
                              New
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chain Data */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Chain Data</h2>
              <ul className="space-y-2">
                {["Polygon", "Ethereum", "Solana"].map((chain) => (
                  <li key={chain}>
                    <Link
                      href="#"
                      className="hover:text-[#09c1bf] transition-colors text-[#FFFFFFAD]"
                    >
                      {chain}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reports */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Reports</h2>
              <ul className="space-y-2">
                {["Market Reports", "Project Reports"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-[#09c1bf] transition-colors text-[#FFFFFFAD]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-[#282828] pt-6">
            <p className="text-xs text-[#FFFFFF99]">
              <span className="font-semibold text-white">Disclaimer:</span> By
              using this website, you agree to our Terms and Conditions and
              Privacy Policy. Thenewscrypto has no affiliation or relationship
              with any coin, business, project or event unless explicitly stated
              otherwise. Thenewscrypto is only an informational website that
              provides news about coins, blockchain companies, blockchain
              products and blockchain events. None of the information you read
              on thenewscrypto should be taken as investment advice. Buying and
              trading cryptocurrencies should be considered a high-risk
              activity. Please do your own diligence before making any
              investment decision. Thenewscrypto is not accountable, directly or
              indirectly, for any damage or loss incurred, alleged or otherwise
              in connection to the use or reliance of any content you read on
              the site.
            </p>
          </div>

          {/* Copyright */}
          <div className="border-t border-[#282828] pt-6 flex flex-col md:flex-row justify-between">
            <p className="text-sm text-[#FFFFFF99]">
              © Copyright 2024 All rights Reserved | TheNewsCrypto
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 w-[50%] justify-between">
              <Link
                href="#"
                className="text-sm hover:text-[#09c1bf] transition-colors text-[#FFFFFF99] font-normal"
              >
                Terms and Conditions
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-[#09c1bf] transition-colors text-[#FFFFFF99] font-normal"
              >
                Privacy / Disclosure Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
