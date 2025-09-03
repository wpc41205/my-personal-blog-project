import React from 'react';
import meImage from '../assets/me.jpg';

const HeroSection = () => {
  return (
    <section className="flex justify-center items-center w-full md:w-[70vw] mt-12 md:mt-20 px-4 md:px-4">
      <div className="flex flex-col md:flex-row w-full gap-y-8">
        {/* Left Section - Inspiring Text */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-end md:pr-4">
          <h1 className="text-[52px] leading-[60px] font-semibold text-[#26231E] text-center md:text-right mb-4 font-['Poppins'] max-w-[540px] md:max-w-[347px]">
            Live your life <br />
            with happiness <br />
            every day.
          </h1>
          <p className="text-[16px] font-medium text-[#75716B] leading-[24px] text-center md:text-right font-['Poppins'] max-w-[540px] md:max-w-[347px]">
            Discover knowledge at your fingertips, <br />
            embrace inspiration every day, <br />
            and live with purpose and passion.
          </p>
        </div>

        {/* Center Section - Image */}
        <div className="flex-1 flex justify-center items-center md:px-4 mb-8 md:mb-0">
          <div className="w-[386px] h-[529px] rounded-2xl border-2 border-gray-300 overflow-hidden">
            <img src={meImage} alt="Profile" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Right Section - Author Information */}
        <div className="flex-1 flex flex-col justify-center items-start md:items-start md:pl-4">
          <div className="text-xs font-medium text-[#75716B] mb-2 leading-5 font-['Poppins']">-Author</div>
          <h2 className="text-2xl font-semibold text-[#43403B] mb-4 leading-8 font-['Poppins']">Pataveekorn C.</h2>
          <div className="space-y-3 text-[#75716B] max-w-[540px] md:max-w-[347px] text-left md:text-left">
            <p className="text-base font-medium leading-6 font-['Poppins']">
              "I am passionate about psychology and personal development, 
              always seeking ways to grow and improve. 
              I love reading books that provide new perspectives and insights into self-growth, 
              emotional intelligence, and mental well-being.
            </p>
            <p className="text-base font-medium leading-6 font-['Poppins']">
              When I&apos;m reading or learning, 
              I focus on applying these concepts to my daily life, 
              striving to become a better version of myself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;