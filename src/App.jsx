import './App.css'
import { FooterComponent } from './component/FooterComponent'
import { HeaderComponent } from './component/HeaderComponent'
import ListUserComponent from './component/ListUserComponent'
import UserComponent from './component/UserComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
          <Routes>
            <Route path='/' element = { <ListUserComponent/> }></Route>
            <Route path='/users' element = { <ListUserComponent/> }></Route>
            <Route path='/add-user' element = { <UserComponent/> }></Route>
            <Route path='/edit-user/:id' element = { <UserComponent/>}></Route>

            <Route path='/' element = { <ListUserComponent/> }></Route>
            <Route path='/shares' element = { <ListUserComponent/> }></Route>
            <Route path='/add-share' element = { <UserComponent/> }></Route>
            <Route path='/edit-share/:id' element = { <UserComponent/>}></Route>
          </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>  
  )
}

export default App
