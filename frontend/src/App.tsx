import { Route, Routes } from "react-router";
import Layout from "./Layout"
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./ProtectedRoute";
import Track from "./Track";

function App() {
  return(
    <div className="font-primary z-50 relative">
      <Toaster position="bottom-right" />
    <Routes>
      <Route path="/" element={<Layout><Homepage /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />

      //Protected Routes
      <Route element={<ProtectedRoute />}>
        <Route path="/track" element={<Layout><Track /></Layout>} />
        <Route path="/my-profile" element={<Layout><div>My Profile</div></Layout>} />
      </Route>

    </Routes>
    </div>
  )
}

export default App