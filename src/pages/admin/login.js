import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import Input from '../../components/ui/Input';

const AdminLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Show loading message
      const loadingToast = toast.loading('Logging in...');

      // Simulate admin login API call
      // In real implementation, you would call your admin authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if credentials are valid (demo credentials)
      if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
        toast.dismiss(loadingToast);
        toast.success('Login successful!');
        
        // Store admin session (in real app, use proper session management)
        localStorage.setItem('adminToken', 'demo-admin-token');
        localStorage.setItem('adminUser', JSON.stringify({
          email: formData.email,
          role: 'admin'
        }));
        
        // Redirect to article management
        router.push('/admin/article-management');
      } else {
        toast.dismiss(loadingToast);
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.dismiss();
      console.error('Admin login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] text-[#26231E] px-4 py-10">
        <div className="w-[798px] h-[540px] bg-[#EFEEEB] rounded-[16px] px-[120px] py-[60px] border border-[#DAD6D1] opacity-100 flex flex-col gap-[40px]">
          <div className="text-center">
            <h1 className="text-[#8B7355] text-lg font-medium mb-2">Admin panel</h1>
            <h2 className="font-poppins font-semibold text-[40px] leading-[48px] tracking-[0] text-[#26231E]">Log in</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-[558px] h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border border-[#DAD6D1] opacity-100"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block mb-2 font-poppins font-medium text-[16px] leading-[24px] tracking-[0] text-[#75716B]">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-[558px] h-12 rounded-[8px] pt-3 pr-3 pb-3 pl-4 gap-1 border border-[#DAD6D1] opacity-100"
                autoComplete="current-password"
              />
            </div>
            
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[141px] h-[48px] rounded-[999px] bg-[#26231E] px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-[#3A342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </div>

            {/* Demo Credentials Info */}
            <div className="text-center mt-4">
              <p className="text-sm text-[#75716B] mb-2 font-poppins font-medium">Demo Credentials:</p>
              <p className="text-xs text-[#75716B]">Email: admin@example.com</p>
              <p className="text-xs text-[#75716B]">Password: admin123</p>
            </div>
          </form>
        </div>
    </div>
  );
};

export default AdminLogin;
