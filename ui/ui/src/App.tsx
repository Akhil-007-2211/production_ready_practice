import './App.css'
import { OrbitProgress } from 'react-loading-indicators'

function App() {

  return (
    <>
      <div className="App">
        <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
        <h1>App building is in progress</h1>
      </div>
    </>
  )
}

export default App
