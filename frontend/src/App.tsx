import { Route, Routes } from "react-router";
import Layout from "./Layout"
import Homepage from "./Homepage";

function App() {
  return(
    <div className="font-primary z-50 relative">
    <Routes>
      <Route path="/" element={<Layout><Homepage /></Layout>} />
      <Route path="/login" element={<Layout><div>Login Page</div></Layout>} />
      <Route path="/register" element={<Layout><div>Register Page</div></Layout>} />
      <Route path="/track" element={<Layout><div>Track Page</div></Layout>} />
    </Routes>
    </div>
  )
}

export default App