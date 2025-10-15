import Navigation from "../components/layout/Navigation";
import HeroSection from "../components/blog/HeroSection";
import ArticleGrid from "../components/blog/ArticleGrid";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="font-sans">
      <Navigation />
      <HeroSection />
      <ArticleGrid />
      <Footer />
    </div>
  );
}
