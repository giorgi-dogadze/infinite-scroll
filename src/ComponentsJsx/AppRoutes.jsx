import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Users from './Users'
import User from './User'

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Users></Users>}></Route>
        <Route path='/user' element={<User></User>}></Route>
    </Routes>
  )
}

export default AppRoutes