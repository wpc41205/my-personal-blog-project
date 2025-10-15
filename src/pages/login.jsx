import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/layout/Navigation';
import AlertBanner from '../components/ui/AlertBanner';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({ email: '', password: '' });

    if (!email || !password) {
      const errors = { email: '', password: '' };
      if (!email) errors.email = 'กรุณากรอกอีเมล';
      if (!password) errors.password = 'กรุณากรอกรหัสผ่าน';
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setError(''); // Clear previous errors

    try {
      const result = await login({ email, password });
      
      if (result.error) {
        // Inline Thai messages and highlight fields
        if (result.error.includes('Invalid email or password')) {
          setFieldErrors({
            email: '',
            password: 'รหัสผ่านไม่ถูกต้อง หรืออีเมลนี้ไม่มีอยู่',
          });
          // Show banner matching the provided design
          setError("Your password is incorrect or this email doesn't exist");
        } else if (result.error.toLowerCase().includes('email') && result.error.toLowerCase().includes('confirm')) {
          setFieldErrors({
            email: 'กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ',
            password: '',
          });
          setError('Please confirm your email before logging in');
        } else {
          setError(result.error);
        }
        setIsSubmitting(false);
        return;
      }

      // Login successful
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบข้อมูลแล้วลองใหม่');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#26231E]">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[798px] min-h-[540px] bg-[#EFEEEB] rounded-[16px] px-6 sm:px-10 md:px-20 lg:px-[120px] py-8 md:py-10 lg:py-[60px] border border-[#DAD6D1] opacity-100 flex flex-col gap-6 md:gap-8 lg:gap-[40px]">
          <h1 className="text-center font-poppins font-semibold text-[40px] leading-[48px] tracking-[0] text-[#26231E]">Log in</h1>

          {error && (
            <div className="fixed bottom-4 right-4 z-50 w-[700px] h-[86px]">
              <AlertBanner
                variant="error"
                title="Your password is incorrect or this email doesn't exist"
                description="Please try another password or email"
                onClose={() => setError('')}
                className="shadow-lg rounded-[8px] px-4 py-4 w-full h-full"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Email</label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border opacity-100 ${fieldErrors.email ? 'border-red-500 focus:ring-red-300' : 'border-[#DAD6D1]'}`}
                autoComplete="email"
              />
              {/* Inline error text removed as requested */}
            </div>

            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Password</label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border opacity-100 ${fieldErrors.password ? 'border-red-500 focus:ring-red-300' : 'border-[#DAD6D1]'}`}
                autoComplete="current-password"
              />
              {/* Inline error text removed as requested */}
            </div>
            
            <div className="flex items-center justify-center mt-4">
              <button
                className="w-[141px] h-[48px] rounded-[999px] bg-[#26231E] px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-[#3A342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Log in...' : 'Log in'}
              </button>
            </div>

            <p className="text-center text-sm  text-[#75716B] mt-4">
            Don&apos;t have an account?{' '}
            <button 
              onClick={() => router.push('/register')} 
              className="underline font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#26231E] hover:text-[#75716B] transition-colors"
            >
              Sign up
            </button>
          </p>

            <div className="text-center mt-4">
              <p className="text-sm text-[#75716B] mb-2 font-poppins font-medium">Demo Credentials:</p>
              <p className="text-xs text-[#75716B]">Email: users_test@gmail.com</p>
              <p className="text-xs text-[#75716B]">Password: users@123</p>
            </div>
          </form>


        </div>
      </main>
    </div>
  );
};

export default Login;
