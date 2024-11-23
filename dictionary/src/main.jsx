import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import DictionaryTable from './components/table/Table.jsx'
import { DictionaryTable } from './components/table/Table.jsx'
import CardSlider from './components/cardSlider/CardSlider.jsx'
import { spy } from 'mobx' // для дебагинга мобх-а
import RootStore from './components/stores/RootStore.jsx'
import { RootStoreContext } from './components/stores/RootStoreContext.jsx'

spy((event) => {
  if (event.type === 'action') {
    console.log(event);
  }
})

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
    <RootStoreContext.Provider value={new RootStore}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </RootStoreContext.Provider>
  </StrictMode>,
)
