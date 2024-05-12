import './App.css'
import WeatherDisplay from './WeatherDisplay';


function App() {


  return (
    <>
      <h1>Paircast</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <WeatherDisplay />
        <WeatherDisplay />
      </div>

    </>
  )
}

export default App
