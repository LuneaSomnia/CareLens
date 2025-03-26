import { useState } from "react";
import { Link, useLocation } from "wouter";
import { User, Heart, Globe, Shield, Clipboard, Building, AlertTriangle, Menu, Bell } from "lucide-react";
import AlertHeart from "@/components/AlertHeart";
import { useMobile } from "@/hooks/use-mobile";

const navItems = [
  { icon: User, name: "User Profile", path: "/user-profile", alert: false },
  { icon: Globe, name: "Primordial Prevention", path: "/primordial-prevention", alert: true },
  { icon: Shield, name: "Primary Prevention", path: "/primary-prevention", alert: true },
  { icon: Clipboard, name: "Secondary Prevention", path: "/secondary-prevention", alert: false },
  { icon: Building, name: "Tertiary Prevention", path: "/tertiary-prevention", alert: false },
  { icon: AlertTriangle, name: "Quaternary Prevention", path: "/quaternary-prevention", alert: false },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col antialiased bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-xl font-heading font-semibold text-primary">CareLens</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-neutral-600 hover:text-primary rounded-full hover:bg-neutral-50 transition">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center text-white text-xs">3</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
              <span className="font-semibold text-sm">JS</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-neutral-600 hover:text-primary hover:bg-neutral-50"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === item.path
                    ? "text-primary bg-neutral-50"
                    : "text-neutral-900 hover:bg-neutral-50 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (desktop only) */}
        <nav className="hidden md:flex md:flex-shrink-0">
          <div className="w-64 flex flex-col h-full border-r border-neutral-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      location === item.path
                        ? "bg-primary-600 text-white"
                        : "text-neutral-900 hover:bg-neutral-50 hover:text-primary"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                    {item.alert && <AlertHeart className="ml-auto" />}
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-neutral-200">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center">
                  <span className="font-semibold">JS</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-900">John Smith</p>
                  <p className="text-xs text-neutral-600">View profile</p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 bg-neutral-50">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-2 py-3">
          <div className="flex justify-around">
            {navItems.slice(0, 5).map((item) => (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`flex flex-col items-center ${
                  location === item.path
                    ? "text-primary"
                    : "text-neutral-600"
                }`}
              >
                <div className="relative">
                  <item.icon className="h-6 w-6" />
                  {item.alert && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
                  )}
                </div>
                <span className="text-xs mt-1">{item.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
