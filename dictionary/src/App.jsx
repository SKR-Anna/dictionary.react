// import { useState } from 'react'
import 'normalize.css'
import './App.css'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
// import CardSlider from './components/cardSlider/CardSlider'
// import Card from './components/card/Card'
// import DictionaryTable from './components/table/Table'
import Footer from './components/footer/Footer'
// import data from './data'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Outlet } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <DictionaryTable />,
//   },
//   {
//     path: "/game",
//     element: <CardSlider />,
//   },
// ]);

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Menu title="Меню" />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App;

//   <div>
//     {/* <DictionaryTable /> */}
//     <RouterProvider router={router} />
//   </div>
//   <div className="card-container">
//     <CardSlider>
//       {data.map((card) => (
//         <Card
//           key={card.id}
//           english={card.english}
//           transcription={card.transcription}
//           russian={card.russian}
//         />
//       ))}
//     </CardSlider>
//   </div>

// </div>
