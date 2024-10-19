import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DictionaryTable from './components/table/Table.jsx'
import CardSlider from './components/cardSlider/CardSlider.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:
      [{
        path: "/",
        element: <DictionaryTable />,
      },
      {
        path: "/game",
        element: <CardSlider />,
      }]
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
