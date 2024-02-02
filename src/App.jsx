import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom';
import HomeLayout from './components/layouts/HomeLayout.jsx';
import Login from './components/pages/auth/Login.jsx'
import Register from './components/pages/auth/Register.jsx'
import Home from './components/pages/Home.jsx';
import Programs from './components/pages/Programs.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route index element={<Home/>} />
            <Route path="login" element={<Login/>}/>
            <Route path='register' element={<Register/>} />
            <Route path='programs' element={<Programs/>} />

        </Route>
    )
);
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
