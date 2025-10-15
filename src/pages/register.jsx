import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/layout/Navigation';
import { Input } from '../components/ui/input';
import { registerUser } from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const isValidEmail = (value) => {
    // Basic email validation
    return /.+@.+\..+/.test(String(value).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({ name: '', username: '', email: '', password: '' });

    // Basic client-side validation with per-field errors
    const nextFieldErrors = { name: '', username: '', email: '', password: '' };
    if (!name) nextFieldErrors.name = 'Please enter your name';
    if (!username) nextFieldErrors.username = 'Please enter a username';
    if (!email || !isValidEmail(email)) nextFieldErrors.email = 'Please enter a valid email address';
    if (!password) nextFieldErrors.password = 'Please enter a password';

    const hasClientErrors = Object.values(nextFieldErrors).some(Boolean);
    if (hasClientErrors) {
      setFieldErrors(nextFieldErrors);
      setError('Please fill in all fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await registerUser({ name, username, email, password });

      // Handle normalized errors from API
      if (result?.error) {
        const message = String(result.error).toLowerCase();
        if (message.includes('email')) {
          setFieldErrors((prev) => ({ ...prev, email: 'Email is already taken, Please try another email.' }));
        } else {
          setError(result.error || 'Sign up failed. Please try again.');
        }
        return;
      }

      // If email confirmation is enabled, show info instead of crashing
      if (!result?.user && result?.message) {
        setError(result.message);
        return;
      }

      router.push('/registration-success');
    } catch (err) {
      const message = (err?.response?.data?.message || err?.message || '').toLowerCase();
      // Handle common auth errors
      if (message.includes('email') && (message.includes('exists') || message.includes('taken') || message.includes('already'))) {
        setFieldErrors((prev) => ({ ...prev, email: 'Email is already taken, Please try another email.' }));
      } else if (message.includes('username') && (message.includes('exists') || message.includes('taken') || message.includes('already'))) {
        setFieldErrors((prev) => ({ ...prev, username: 'Username is already taken, please choose another.' }));
      } else if (message.includes('password')) {
        setFieldErrors((prev) => ({ ...prev, password: 'Invalid password format' }));
      } else if (message.includes('email')) {
        setFieldErrors((prev) => ({ ...prev, email: 'Invalid email' }));
      } else {
        setError('Sign up failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#26231E]">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[798px] min-h-[748px] bg-[#EFEEEB] rounded-[16px] px-6 sm:px-10 md:px-20 lg:px-[120px] py-8 md:py-10 lg:py-[60px] border border-[#DAD6D1] opacity-100 flex flex-col gap-6 md:gap-8 lg:gap-[24px]">
          <h1 className="text-center font-poppins font-semibold text-[40px] leading-[48px] tracking-[0] text-[#26231E]">Sign up</h1>

          {/* Top alert removed as requested */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Name</label>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border opacity-100 ${fieldErrors.name ? 'border-red-500 focus:ring-red-300' : 'border-[#DAD6D1]'}`}
                autoComplete="name"
              />
              {fieldErrors.name && (
                <p className="mt-2 text-[12px] leading-[16px] text-red-600">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Username</label>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border opacity-100 ${fieldErrors.username ? 'border-red-500 focus:ring-red-300' : 'border-[#DAD6D1]'}`}
                autoComplete="username"
              />
              {fieldErrors.username && (
                <p className="mt-2 text-[12px] leading-[16px] text-red-600">{fieldErrors.username}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Email</label>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border opacity-100 ${fieldErrors.email ? 'border-red-500 focus:ring-red-300' : 'border-[#DAD6D1]'}`}
                autoComplete="email"
              />
              {fieldErrors.email && (
                <p className="mt-2 text-[12px] leading-[16px] text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Password</label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border opacity-100 ${fieldErrors.password ? 'border-red-500 focus:ring-red-300' : 'border-[#DAD6D1]'}`}
                autoComplete="new-password"
              />
              {fieldErrors.password && (
                <p className="mt-2 text-[12px] leading-[16px] text-red-600">{fieldErrors.password}</p>
              )}
            </div>
            
            <div className="flex items-center justify-center mt-2">
              <button
                className="w-[141px] h-[48px] rounded-[999px] bg-[#26231E] px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-[#3A342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sign up...' : 'Sign up'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-0 text-[#75716B]">
            Already have an account?{' '}
            <button 
              onClick={() => router.push('/login')} 
              className="underline font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#26231E] hover:text-[#75716B] transition-colors"
            >
              Log in
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
