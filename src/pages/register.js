import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/layout/Navigation';
import Input from '../components/ui/Input';
import { registerUser } from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser({ name, username, email, password });
      router.push('/registration-success');
    } catch (err) {
      setError('Sign up failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#26231E]">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-[798px] h-[748px] bg-[#EFEEEB] rounded-[16px] px-[120px] py-[60px] border border-[#DAD6D1] opacity-100 flex flex-col gap-[24px]">
          <h1 className="text-center font-poppins font-semibold text-[40px] leading-[48px] tracking-[0] text-[#26231E]">Sign up</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Name</label>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[558px] h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border border-[#DAD6D1] opacity-100"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Username</label>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-[558px] h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border border-[#DAD6D1] opacity-100"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Email</label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[558px] h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border border-[#DAD6D1] opacity-100"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Password</label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[558px] h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border border-[#DAD6D1] opacity-100"
                autoComplete="new-password"
              />
            </div>
            
            <div className="flex items-center justify-center mt-2">
              <button
                className="w-[141px] h-[48px] rounded-[999px] bg-[#26231E] px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-[#3A342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign up'}
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
