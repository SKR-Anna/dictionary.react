// import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Card from './components/card/Card'
import Footer from './components/footer/Footer'
import data from './data'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <main className="card-container">
        {data.map((card) => (
          <Card
            key={card.id}
            english={card.english}
            transcription={card.transcription}
            russian={card.russian}
          />
        ))}
      </main>
      <Footer />
    </div>
  )
}

export default App
