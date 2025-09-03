import './index.css'
import Navbar from './components/navbar'
import HeroSection from './components/herosection'

function App() {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar/>
      <HeroSection/>
    </div>
  )
}

export default App
