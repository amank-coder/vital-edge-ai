'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useUser, useClerk, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-[#1a057a] text-white shadow-md fixed w-full z-20">
  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    
    {/* Left: Brand */}
    <div className="flex-1">
      <Link href="/" className="text-lg font-bold hover:text-gray-300">HEALTHCARE</Link>
    </div>

    {/* Center: Nav Links */}
    <div className="hidden md:flex flex-1 justify-center space-x-8">
      {["/dashboard", "/physical-health", "/mental-health"].map((href, i) => {
        const label = ["Dashboard", "Physical Health", "Mental Health"][i];
        return (
          <Link
            key={href}
            href={href}
            className="relative hover:text-gray-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            {label}
          </Link>
        );
      })}
    </div>

    {/* Right: Signin + Signup */}
    <div className="flex-1 flex justify-end space-x-4 items-center">
      <UserButton showName appearance={{
        elements: {
          userButtonBox: {
            color: 'white', // 👈 name text color
          },
        },
      }}/>
    </div>

    {/* Mobile Hamburger */}
    <div className="md:hidden ml-4">
      <button onClick={toggleSidebar} aria-label="Toggle Menu">
        {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
      </button>
    </div>

  </div>
</nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-blue-600 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-30 shadow-lg md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-xl">Menu</span>
          <button onClick={closeSidebar} aria-label="Close Menu">
            <HiX size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <Link href="/dashboard" onClick={closeSidebar}>Dashboard</Link>
          <Link href="/physical-health" onClick={closeSidebar}>Physical Health</Link>
          <Link href="/mental-health" onClick={closeSidebar}>Mental Health</Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
