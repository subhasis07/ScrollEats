import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ChooseRegister from '../pages/auth/ChooseRegister'
import RegisterUser from '../pages/auth/RegisterUser'
import LoginUser from '../pages/auth/LoginUser'
import RegisterPartner from '../pages/auth/RegisterPartner'
import LoginPartner from '../pages/auth/LoginPartner'
import HomePage from '../pages/General/HomePage'
import FoodCreate from '../pages/food-partner/FoodCreate'
import Profile from '../pages/food-partner/Profile'
import BottomNav from '../components/BottomNav'
import Saved from '../pages/General/Saved'


const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/register" element={<ChooseRegister/>}/>
            <Route path="/user/register" element={<RegisterUser/>}/>
            <Route path="/user/login" element={<LoginUser/>} />
            <Route path="/food-partner/register" element={<RegisterPartner/>} />
            <Route path="/food-partner/login" element={<LoginPartner/>} />
            <Route path="/" element={<><HomePage/> <BottomNav/></>} />
            <Route path="/create-food" element={<FoodCreate/>} />
            <Route path="/food-partner/:id" element={<Profile />} />
            <Route path="/saved" element={<><Saved /><BottomNav/></>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes
