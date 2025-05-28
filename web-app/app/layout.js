import "./globals.css";
import Chatbot from "@/components/Chatbot";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
  className="bg-gradient-to-b from-gray-100 via-gray-200 to-gray-400 min-h-screen"
      >
        <Chatbot />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
