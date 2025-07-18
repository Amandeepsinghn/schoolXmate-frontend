import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Login} from "./pages/Login"
import './App.css'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { Landing } from './pages/Landing'
import { Test } from './pages/Test'
import { ChatPdf } from './pages/chatPdf'
import { Profile } from './pages/Profile'
import { UpdateProfile } from './pages/updateProfile'
import { Chat } from './pages/chat'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path = "/signup" element={<Signup/>}/>
        <Route path = "/login" element={<Login/>} />
        <Route path = "/dashboard" element={<Dashboard/>}/> 
        <Route path = "/landing" element={<Landing/>}/>
        <Route path = "/test" element={<Test/>}/>
        <Route path = "/chatPdf" element={<ChatPdf/>}/>
        <Route path = "/profile" element = {<Profile/>}/>
        <Route path = "/profileUpdate" element = {<UpdateProfile/>}/>
        <Route path = "chat/:sessionId" element = {<Chat/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )

}

export default App
