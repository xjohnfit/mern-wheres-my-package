import { Route, Routes } from "react-router";
import Layout from "./Layout"
import Homepage from "./Homepage";

function App() {

  return(
    <Routes>
      <Route path="/" element={<Layout><Homepage /></Layout>} />
      <Route path="/track" element={<Layout><div>Track Page</div></Layout>} />
    </Routes>
  )
}

export default App