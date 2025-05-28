// app/login/page.js
import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return(
<div className="flex items-center justify-center min-h-screen">
  <SignIn path="/login" routing="path" signUpUrl="/signup" />
</div>


)
} 
