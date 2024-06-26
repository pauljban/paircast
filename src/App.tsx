import './App.css'
import WeatherDisplay from './WeatherDisplay';


function App() {


  return (
    <>
      <div className="bg-landscape bg-cover min-h-screen">
        <div className="p-4">
          <h1 className="text-center text-3xl font-bold mb-8">Paircast</h1>
          <div className="flex justify-around flex-wrap items-start">
            <WeatherDisplay />
            <WeatherDisplay />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
