
import { Route, Router, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import router from './Routes/Route/Route'
import { Toaster } from 'react-hot-toast'




function App() {
  

  return (
    <>
      <div className='max-w-[1440px] mx-auto mt-23'>
        <RouterProvider router={router} ></RouterProvider>
        
        <Toaster position="top-right" reverseOrder={false} />

         
      </div>
    </>
  )
}

export default App
