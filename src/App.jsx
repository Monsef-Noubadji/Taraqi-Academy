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
import StudentRegister from './components/dashboards/student/register.jsx';
import ConfirmStudentEmail from './components/dashboards/student/confirmEmail.jsx';
import StudentLogin from './components/dashboards/student/login.jsx';
import ResetStudentPassword from './components/dashboards/student/resetPassword.jsx';
import AdminLogin from './components/dashboards/admin/login.jsx';
import ResetAdminPassword from './components/dashboards/admin/resetPassword.jsx';

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
            <Route path='student/register' element={<StudentRegister/>} />
            <Route path='student/check-email-link' element={<ConfirmStudentEmail/>} />
            <Route path='student/login' element={<StudentLogin/>} />
            <Route path='student/ResetPassword' element={<ResetStudentPassword/>} />
            {/* admin */}
            <Route path='admin/*' element={<MainAdmin/>} />
            <Route path='admin/login' element={<AdminLogin/>} />
            <Route path='admin/check-email-link' element={<ConfirmStudentEmail/>} />
            <Route path='admin/ResetPassword' element={<ResetAdminPassword/>} />


        </Route>
    )
);
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
