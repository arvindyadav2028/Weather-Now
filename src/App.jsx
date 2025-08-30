import { useState } from 'react'
import WeatherInfo from './WeatherInfo.jsx'
import FunCard from "./FunCard";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WeatherInfo/>
    </>
  )
}

export default App