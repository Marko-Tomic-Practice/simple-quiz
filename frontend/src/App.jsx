import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import WelcomePageComponent from './components/WelcomePage/WelcomePageComponent'
import HomePageComponent from './components/HomePage/HomePageComponent'



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePageComponent/>}></Route>
        <Route path='/home' element={<HomePageComponent/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
