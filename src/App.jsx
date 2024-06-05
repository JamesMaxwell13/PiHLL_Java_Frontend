import './App.css'
import { FooterComponent } from './component/FooterComponent'
import { HeaderComponent } from './component/HeaderComponent'
import ListUserComponent from './component/ListUserComponent'
import UserComponent from './component/UserComponent'
import ListShareComponent from './component/ListShareComponent'
import ShareComponent from './component/ShareComponent'
import ListCompanyComponent from './component/ListCompanyComponent'
import CompanyComponent from './component/CompanyComponent'
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
            <Route path='/user-shares/:userId' element = { <ListShareComponent/> }></Route>
            <Route path='/store-shares/:userBuyId' element = { <ListShareComponent/> }></Route>

            <Route path='/shares' element = { <ListShareComponent/> }></Route>
            <Route path='/add-share' element = { <ShareComponent/> }></Route>
            <Route path='/edit-share/:id' element = { <ShareComponent/>}></Route>


            <Route path='/companies' element = { <ListCompanyComponent/> }></Route>
            <Route path='/add-company' element = { <CompanyComponent/> }></Route>
            <Route path='/edit-company/:id' element = { <CompanyComponent/>}></Route>
            <Route path='/company-shares/:companyId' element = { <ListShareComponent/> }></Route>
          </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>  
  )
}

export default App
