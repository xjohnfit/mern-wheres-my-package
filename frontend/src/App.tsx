import { Route, Routes } from "react-router";
import Layout from "./Layout"
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
import { Toaster } from 'react-hot-toast';

function App() {
  return(
    <div className="font-primary z-50 relative">
      <Toaster position="bottom-right" />
    <Routes>
      <Route path="/" element={<Layout><Homepage /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/track" element={<Layout><div>Track Page</div></Layout>} />
    </Routes>
    </div>
  )
}

export default App