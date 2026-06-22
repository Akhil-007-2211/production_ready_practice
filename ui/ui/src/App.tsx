import './App.css'
import { OrbitProgress } from 'react-loading-indicators'
import Signup from './Signup'
import { useState } from 'react';

function App() {
  let [showSignup, setShowSignup] = useState(false);
  return (
    <>
      <div className="App">
        <button className='signup-btn'
          onClick={() => {setShowSignup(true)}}>
          Signup
        </button>
        {(showSignup ? <Signup /> : (<>
        <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
        <h1>App building is in progress</h1>
        </>))}
      </div>
    </>
  )
}

export default App
