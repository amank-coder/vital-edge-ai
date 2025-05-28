import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export default function MainLayout({ children }) {
  return (
    <>
    <ClerkProvider>
      <Navbar />
      </ClerkProvider>
      {children}
    </>
  );
}
