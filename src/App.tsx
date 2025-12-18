import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '~/pages/dashboard/Dashboard';
import WishPage from '~/pages/wish-page/WishPage';
import NotFoundPage from '~/pages/404/404';
import URLs from '~/constants/routes'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={URLs.pages.dashboard} element={<Dashboard />} />
          <Route path={URLs.pages.wishPage} element={<WishPage />} />
          <Route path="*" element={<NotFoundPage />} />s
        </Routes>
      </Router>
    </>
  )
}

export default App
