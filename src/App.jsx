import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom';
import HomeLayout from './components/layouts/HomeLayout.jsx';
import Login from './components/pages/auth/Login.jsx'
import Register from './components/pages/auth/Register.jsx'
import Home from './components/pages/Home.jsx';
import Programs from './components/pages/Programs.jsx'
import ProgramDetails from './components/pages/ProgramDetails.jsx';
import DashboardLayout from './components/layouts/DashboardLayout.jsx';
import Profile from './components/pages/Profile.jsx';
import Main from './components/dashboards/student/main.jsx';
import ProgramGoals from './components/pages/ProgramGoals.jsx';
import ProgramsList from './components/pages/ProgramsList.jsx'
import MainAdmin from './components/dashboards/admin/main.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route index element={<Home/>} />
            <Route path="login" element={<Login/>}/>
            <Route path='register' element={<Register/>} />
            <Route path='programs' element={<Programs/>}>
              <Route index element={<ProgramGoals/>}/>
              <Route path='list' element={<ProgramsList/>}/>
              <Route path=':id' element={<ProgramDetails/>}/>
            </Route>
            <Route path='dashboard' element={<DashboardLayout/>}>
                <Route index element={<Profile/>}/>
            </Route>
            <Route path='student/*' element={<Main/>} />
            <Route path='admin/*' element={<MainAdmin/>} />
        </Route>
    )
);
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
