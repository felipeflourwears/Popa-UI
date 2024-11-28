import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard';
import Layout from "./components/shared/Layout";
import DeviceSelector from "./components/DeviceSelector";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="device-selector" element={<DeviceSelector />} />
        </Route>
        <Route path="login" element={<div>This is login page</div>}/>
      </Routes>
    </Router>
  )
}

export default App
