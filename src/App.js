import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Dishes, Drinks, DateGuests, Receipt } from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          index
          path='/'
          element={<Home />}
        />
        <Route
          index
          path='/dishes'
          element={<Dishes />}
        />
        <Route
          index
          path='/drinks'
          element={<Drinks />}
        />
        <Route
          index
          path='/dateguests'
          element={<DateGuests />}
        />
        <Route
          index
          path='/receipt'
          element={<Receipt />}
        />
      </Routes>
    </Router>
  )
}

export default App
