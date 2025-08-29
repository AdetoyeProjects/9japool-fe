import Link from "next/link"
import { Facebook, Twitter, Instagram, MessageCircle, Youtube } from "lucide-react"
import { footerSections, socialLinks, contactInfo } from "@/lib/data/footer-links"
import Image from "next/image"

const socialIcons = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  telegram: MessageCircle,
  youtube: Youtube,
}

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-12 justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand and Contact Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
            <Image
              src="/assets/images/logo.png"
              alt="9jaPool"
              width={140}
              height={32}
              priority
              className="h-6 w-auto md:h-6"
              // sizes="(max-width: 767px) 96px, 128px"
            />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="font-medium">Telephone:</span> {contactInfo.telephone.join(" | ")}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <Link href={`mailto:${contactInfo.email}`} className="hover:text-green-500 transition-colors">
                    {contactInfo.email}
                  </Link>
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons]
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Footer Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-col justify-between items-center text-sm text-white">
            <p>©2025 9jaPool. All Rights Reserved</p>
            <p className="mt-2 md:mt-0">Play responsibly. Gambling can be addictive.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
