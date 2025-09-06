import './index.css'
import Navbar from './components/navbar'
import HeroSection from './components/herosection'
import Articles from './components/articles'
import Footer from './components/footer'

function App() {
  return (
    <div className="flex flex-col w-full">
      <Navbar/>
      <HeroSection/>
      <Articles/>
      <Footer/>
    </div>
  )
}

export default App