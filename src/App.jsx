import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import AttackTree from './pages/attack-tree/AttackTree'
import AttackVectors from './pages/attack-vectors/AttackVectors'
import Safeguards from './pages/safeguards/Safeguards'
import References from './pages/references/References'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attack-tree" element={<AttackTree />} />
          <Route path="/attack-vectors" element={<AttackVectors />} />
          <Route path="/safeguards" element={<Safeguards />} />
          <Route path="/references" element={<References />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
