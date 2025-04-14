"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu, X, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "./shared/Container";

import { useRouter } from "next/navigation";
import Image from "next/image";
import userImage from "@/assets/icon/userp.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/features/authSlice";
import { useGetmeQuery } from "@/redux/api/userApi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state.auth);
  const router = useRouter();
  const { data: userData } = useGetmeQuery("");

  const handleLogout = () => {
    dispatch(logout());
    // router.push("/login");
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const authLinks = user?.email
    ? [
        {
          name: "Dashboard",
          href: `/dashboard/${user.role}`,
          icon: <User className="h-4 w-4" />,
        },
        {
          name: "Profile",
          href: `/profile/${user._id}`,
          icon: <User className="h-4 w-4" />,
        },
      ]
    : [
        {
          name: "Login",
          href: "/login",
          icon: <LogIn className="h-4 w-4" />,
        },
        {
          name: "Register",
          href: "/register",
          icon: <User className="h-4 w-4" />,
        },
      ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-white/10"
      )}
    >
      <Container>
        <div className="py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">CeramicShield Pro</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Auth Links - Desktop */}
              {user?.email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className=" rounded-full border-2 border-white cursor-pointer">
                      <Image
                        src={userData?.data?.profileImg || userImage}
                        alt="user profile picture"
                        width={35}
                        height={35}
                        className="rounded-full object-cover object-center w-9 h-9 "
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    {authLinks.map((link) => (
                      <DropdownMenuItem key={link.name} asChild>
                        <Link
                          href={link.href}
                          className="flex items-center w-full p-2 hover:bg-accent"
                        >
                          {link.icon}
                          <span className="ml-2">{link.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center w-full p-2 hover:bg-accent cursor-pointer"
                    >
                      <LogIn className="h-4 w-4" />
                      <span className="ml-2">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                  <Button onClick={() => router.push("/register")}>
                    Register
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col space-y-2 pt-4 border-t">
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center text-foreground/80 hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                ))}
                {user?.email && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-foreground/80 hover:text-primary transition-colors py-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="ml-2">Logout</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
