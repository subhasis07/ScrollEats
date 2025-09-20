import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ChooseRegister from '../pages/auth/ChooseRegister'
import RegisterUser from '../pages/auth/RegisterUser'
import LoginUser from '../pages/auth/LoginUser'
import RegisterPartner from '../pages/auth/RegisterPartner'
import LoginPartner from '../pages/auth/LoginPartner'


const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/register" element={<ChooseRegister/>}/>
            <Route path="/user/register" element={<RegisterUser/>}/>
            <Route path="/user/login" element={<LoginUser/>} />
            <Route path="/food-partner/register" element={<RegisterPartner/>} />
            <Route path="/food-partner/login" element={<LoginPartner/>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes
