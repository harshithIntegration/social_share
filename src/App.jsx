import React from 'react'
import Login from './Navbar/Login'
import SignUp from './Navbar/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeNavbar from './Navbar/HomeNavbar'
import Sidenav from './Navbar/Sidenav'
import AccountOverview from './Sidebar/AccountOverview'
import Post from './Sidebar/Post'
import { Analytics } from '@mui/icons-material'
import TeamChatBox from './Sidebar/TeamChatBox'
import SocialIntegration from './Sidebar/SocialIntegration'
import './global.css'

const App = () => {
    return (
        // <BrowserRouter>
        //     <Routes>
               
        //         <Route path='/' element={<HomeNavbar/>}/>
        //         <Route path="/login"  element={<Login />}/>
        //         <Route path="/signUp"  element={<SignUp />}/>
        //         <Route path='/dashboard' element={<Sidenav/>}>
        //         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        //     <Route path="/dashboard/account-overview" element={<AccountOverview />} />
        //     <Route path="/dashboard/publish" element={<Post />} />
        //     <Route path="/dashboard/analytics" element={<Analytics />} />
        //     <Route path="/dashboard/team-chat-box" element={<TeamChatBox />} />
        //     <Route path="/dashboard/social-integration" element={<SocialIntegration />} />
        //         </Route>
        //     </Routes>
        // </BrowserRouter>
        
        <Post/>
        
    )
}

export default App









// import React from 'react'
// import Simply from './Testing/Simply'

// const App = () => {
//   return (
//     <div>
     
//       <Simply/>
//     </div>
//   )
// }

// export default App
