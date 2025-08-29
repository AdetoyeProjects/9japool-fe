import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Navigation() {
  return (
    <nav className="w-full bg-slate-800 px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">
           
            <Image
              src="/assets/images/logo.png"
              alt="9jaPool"
              width={140}
              height={32}
              priority
              className="h-6 w-auto md:h-6"
              // sizes="(max-width: 767px) 96px, 128px"
            />
            {/* <span className="sr-only">9jaPool</span> */}
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/games" className="text-white hover:text-green-400 transition-colors font-medium cursor-pointer">
            Games
          </Link>
          <Link href="/how-it-works" className="text-white hover:text-green-400 transition-colors font-medium cursor-pointer">
            How It Works
          </Link>
          <Link href="/winners" className="text-white hover:text-green-400 transition-colors font-medium cursor-pointer">
            Winners
          </Link>
          <Link href="/referrals" className="text-white hover:text-green-400 transition-colors font-medium cursor-pointer">
            Referrals
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:text-green-400 hover:bg-transparent cursor-pointer font-medium">
            Login
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  )
}
