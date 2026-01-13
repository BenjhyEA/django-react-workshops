
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WorkshopsPage from './pages/WorkshopsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WorkshopsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
