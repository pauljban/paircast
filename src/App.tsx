import './App.css'
import WeatherDisplay from './WeatherDisplay';


function App() {


  return (
    <>
      <div className="p-4">
        <h1 className="text-center text-3xl font-bold mb-8">Paircast</h1>
        <div className="flex justify-around items-start">
          <WeatherDisplay />
          <WeatherDisplay />
        </div>
      </div>

    </>
  )
}

export default App
