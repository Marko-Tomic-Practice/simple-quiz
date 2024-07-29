import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import WelcomePageComponent from './components/WelcomePage/WelcomePageComponent'
import HomePageComponent from './components/HomePage/HomePageComponent'
import QAComponent from './components/QAs-Card/QAComponent'
import EditQuestionsComponent from './components/EditQuestion/EditQuestionsComponent'
import EditQuestionComponent from './components/EditQuestion/EditQuestionComponent'
import SignInComponent from './components/Sign-In/SignInComponent'



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePageComponent/>}></Route>
        <Route path='/home' element={<HomePageComponent/>}></Route>
        <Route path='/add-questions' element={<QAComponent/>}></Route>
        <Route path='/edit-questions' element={<EditQuestionsComponent/>}></Route>
        <Route path='/edit-questions/:id' element={<EditQuestionComponent/>}></Route>
        <Route path='/sign-in' element={<SignInComponent/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
