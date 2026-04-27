import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App({count,setCount}) {
  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  )
}

function SuperApp() {
  const [count, setCount] = useState(0)
  return <>
    <h1>Este é um super app</h1>
    <App count={count} setCount={setCount}/>
    <App count={count} setCount={setCount}/>
    <App count={count} setCount={setCount}/>
    <App count={count} setCount={setCount}/>
    <App count={count} setCount={setCount}/>
  </>
}

export default SuperApp
