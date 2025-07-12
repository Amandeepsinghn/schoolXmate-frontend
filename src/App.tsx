import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Login} from "./pages/Login"
import './App.css'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path ="/signup" element={<Signup/>}/>
        <Route path ="/login" element={<Login/>} />
        <Route path ="/dashboard" element={<Dashboard/>}/> 
      </Routes>
    </BrowserRouter>
    </>
  )

}

export default App
