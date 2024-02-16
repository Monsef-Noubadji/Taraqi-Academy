import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom';
import HomeLayout from './components/layouts/HomeLayout.jsx';
import Login from './components/pages/auth/Login.jsx'
import Register from './components/pages/auth/Register.jsx'
import Home from './components/pages/Home.jsx';
import Programs from './components/pages/Programs.jsx'
import ProgramDetails from './components/pages/ProgramDetails.jsx';
import DashboardLayout from './components/layouts/DashboardLayout.jsx';
import Profile from './components/pages/Profile.jsx';
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route index element={<Home/>} />
            <Route path="login" element={<Login/>}/>
            <Route path='register1' element={<Register/>} />
            <Route path='programs' element={<Programs/>}>
              <Route path=':id' element={<ProgramDetails/>}/>
            </Route>
            <Route path='dashboard' element={<DashboardLayout/>}>
                <Route index element={<Profile/>}/>
            </Route>
        </Route>
    )
);
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
