import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from '~/pages/dashboard/Dashboard'
import WishPage from '~/pages/wish-page/WishPage'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wish" element={<WishPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
