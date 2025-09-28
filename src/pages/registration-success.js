import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '../components/layout/Navigation';

export default function RegistrationSuccess() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Registration Successful - Personal Blog</title>
        <meta name="description" content="Your account has been created successfully" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#26231E]">
        <Navigation />

        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-[798px] h-[376px] bg-[#EFEEEB] rounded-[16px] px-[120px] py-[60px] border border-[#DAD6D1] opacity-100 flex flex-col gap-[40px]">
            
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[#12B279]">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-center font-poppins font-semibold text-[40px] leading-[48px] tracking-[0] text-[#26231E]">
              Registration Success
            </h1>

            {/* Continue Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleContinue}
                className="w-[141px] h-[48px] rounded-[999px] bg-[#26231E] px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-[#3A342E] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
