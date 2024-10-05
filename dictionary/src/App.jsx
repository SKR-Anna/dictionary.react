// import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Card from './components/card/Card'
import DictionaryTable from './components/table/Table'
import Footer from './components/footer/Footer'
import data from './data'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <main>
        <div className="card-container">
          {data.map((card) => (
            <Card
              key={card.id}
              english={card.english}
              transcription={card.transcription}
              russian={card.russian}
            />
          ))}
        </div>
        <div>
          <DictionaryTable />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
