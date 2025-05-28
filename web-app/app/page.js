"use client"
import React from 'react';
import { FaHeartbeat, FaRobot, FaTrophy, FaRunning, FaUserCheck, FaComments, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import { motion } from "framer-motion";
import { useUser, useClerk, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const themeColor = '#1a057a';

export default function Home() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navbar */}
      <header className="w-full shadow-md py-5 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-[#1a057a]">VitalEdge AI</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#features" className="hover:text-[#1a057a]">Features</Link>
            <Link href="#how-it-works" className="hover:text-[#1a057a]">How It Works</Link>
            <Link href="#" className="hover:text-[#1a057a]">About Us</Link>
            {isSignedIn && <Link href="/dashboard" className="hover:text-[#1a057a]">Dashboard</Link>}
            {!isSignedIn ? (
              <>
                <Link href="/login" className="text-black hover:text-[#1a057a] font-medium">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 border border-[#1a057a] rounded-full hover:bg-[#1a057a] hover:text-white transition duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <UserButton showName />
            )}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleSidebar} aria-label="Toggle Menu">
              {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-[#1a057a] transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 shadow-lg md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-xl">Menu</span>
          <button onClick={closeSidebar} aria-label="Close Menu">
            <HiX size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <Link href="#features" onClick={closeSidebar}>Features</Link>
          <Link href="#how-it-works" onClick={closeSidebar}>How It Works</Link>
          <Link href="#" onClick={closeSidebar}>About Us</Link>
          {isSignedIn && <Link href="/dashboard" onClick={closeSidebar}>Dashboard</Link>}
          {!isSignedIn ? (
            <>
              <Link href="/login" onClick={closeSidebar} className="text-black font-medium">
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={closeSidebar}
                className="px-4 py-2 border border-[#1a057a] rounded-full text-center hover:bg-[#1a057a] hover:text-white transition duration-200 font-medium"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <UserButton showName />
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <motion.h2
  className="text-4xl font-bold text-[color:#1a057a] leading-tight mb-4"
  initial={{ opacity: 0, y: -50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  viewport={{ once: true }}
>
  Your Smart Health <br /> Companion
</motion.h2>

            <p className="text-gray-600 text-lg mb-6">
              Track your health, get AI-driven recommendations, and stay motivated every step of the way.
            </p>
            <div className="flex gap-4">
              <button className="bg-[color:#1a057a] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition">
                Get Started
              </button>
              <button className="border border-[color:#1a057a] text-[color:#1a057a] px-6 py-3 rounded-md hover:bg-[color:#f4f4f8] transition">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 text-center">
            <motion.img
        src="/banner.png"
        alt="Health App"
        className="rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-[color:#1a057a]">Features You&apos;ll Love</h3>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            We combine AI and healthcare to bring you powerful and easy-to-use tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard icon={<FaRunning size={28} />} title="Activity Tracking" desc="Track workouts and receive optimized exercise plans." />
            <FeatureCard icon={<FaRobot size={28} />} title="AI Insights" desc="Real-time, personalized recommendations via chatbot." />
            <FeatureCard icon={<FaTrophy size={28} />} title="Goal Management" desc="Set health goals and monitor achievements easily." />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-[color:#1a057a]">How It Works</h3>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Start in 4 simple steps. No hassle, just better health.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <StepCard step={1} icon={<FaUserCheck />} title="Sign Up" desc="Create your account in seconds." />
            <StepCard step={2} icon={<FaHeartbeat />} title="Get Suggestions" desc="Receive health & wellness tips." />
            <StepCard step={3} icon={<FaComments />} title="Chatbot Help" desc="Talk to our AI assistant anytime." />
            <StepCard step={4} icon={<FaChartLine />} title="Track Progress" desc="Stay on top of your health goals." />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h3 className="text-3xl font-bold text-[color:#1a057a] mb-6">Take Charge of Your Health</h3>
          <p className="text-gray-600 mb-8">
            Join our community and experience the future of health tracking.
          </p>
          <ul className="text-left text-gray-700 mb-6 space-y-3">
            {[
              'Tailored fitness & diet plans',
              'AI-powered mental wellness support',
              'Health data visualization and progress tracking',
              'User-friendly and privacy-focused design'
            ].map((feature, index) => (
              <li key={index} className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <button className="bg-[color:#1a057a] text-white px-8 py-3 rounded-md text-lg hover:bg-opacity-90 transition">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 text-center text-sm text-gray-600">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Healthcare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};


const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="text-[color:#1a057a] mb-4">{icon}</div>
    <h4 className="font-semibold text-lg mb-2">{title}</h4>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

const StepCard = ({ step, icon, title, desc }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="mx-auto mb-4 text-[color:#1a057a] text-3xl">{icon}</div>
    <h4 className="text-lg font-bold mb-2">Step {step}: {title}</h4>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);


