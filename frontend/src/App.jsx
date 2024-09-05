import React from 'react'
import{Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import CarList from './pages/CarList'
import ShowCar from './pages/ShowCar'
import DeleteCar from './pages/DeleteCar'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/'element={<Home/>}></Route>
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/signup'element={<SignUp/>}></Route>
        <Route path='/cars' element={<CarList/>}></Route>
        <Route path='/cars/create' element={<CreateCar/>}></Route>
        <Route path='/cars/edit/:id' element={<EditCar/>}></Route>
        <Route path='/cars/details/:id' element={<ShowCar/>}></Route>
        <Route path='/cars/delete/:id' element={<DeleteCar/> }></Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
