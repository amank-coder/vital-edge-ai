// app/signup/page.js
import { SignUp } from '@clerk/nextjs'

export default function SignupPage() {
  return(
<div className='flex items-center justify-center min-h-screen'>
  <SignUp path="/signup" routing="path" signInUrl="/login" />
</div>
  ) 
}
