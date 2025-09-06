import './index.css'
import Navbar from './components/navbar'
import HeroSection from './components/herosection'
import Articles from './components/articles'

function App() {
  return (
    <div className="flex flex-col w-full">
      <Navbar/>
      <HeroSection/>
      <Articles/>
    </div>
  )
}

export default App
