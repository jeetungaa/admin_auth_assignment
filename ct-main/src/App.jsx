import { useState } from 'react'
import './App.css'
import { Signup } from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Form } from './components/Form'
import { Unauthorized } from './components/Unauthorized'
import { RequireAuth } from './components/RequireAuth'
import { Listing } from './pages/Listing'
import { Main } from './pages/Main'
import { Profile } from './pages/Profile'
import ProductInfo from './pages/ProductInfo'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/auth/register' element={<Signup/>} />
      <Route path='/auth/login' element={<Signin/>} />
      <Route path='/unauthorized' element={<Unauthorized />}/>
      <Route element={<RequireAuth allowedRoles={['Customer','Admin']} />}>
      <Route path='/your-profile' element={<Profile />}/>
      <Route path='/product/:id' element={<ProductInfo />}/>
      </Route>
      <Route path='/' element={<Main />} /> 
      {/* </Route> */}
      <Route element={<RequireAuth allowedRoles={['Admin']} />}>
      <Route path='/your-listings' element={<Listing/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={['Admin']} />}>
      {/* <Route path='' element={user details}/> */}
      </Route>
      <Route element={<RequireAuth allowedRoles={['Admin']} />}>
      <Route path='/dashboard' element={<Dashboard/>} />
      {/* <Route path='' element={transction log}/> */}
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
