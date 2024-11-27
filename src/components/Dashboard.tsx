import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <div>
        <p>Dashboard</p>
        <Link to="/device-selector" className="underline">
            Devices Selector
        </Link>
    </div>
  )
}

export default Dashboard