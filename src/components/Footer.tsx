"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/[0.1] bg-black text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold text-white">
              TechSonance <span className="text-blue-500">InfoTech</span>
            </h3>
            <p className="mb-4 text-sm">
              Empowering businesses with cutting-edge technology solutions. We specialize in web development, cloud solutions, AI/ML, and cybersecurity services.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1TKgqjwQ9u/" className="transition-colors hover:text-blue-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/techsonance_in" className="transition-colors hover:text-blue-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/techsonance-infotech" className="transition-colors hover:text-blue-500">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/techsonance_infotech?igsh=MTZqNm04enMxaGZmbg==" className="transition-colors hover:text-blue-500">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="transition-colors hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-blue-500">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="transition-colors hover:text-blue-500">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-blue-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>UG-112, Palladium Plaza, Vip Road, Vesu, Surat, Gujarat, 395007</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 91731 01711</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>admin@techsonance.co.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.1] pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TechSonance InfoTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
