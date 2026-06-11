import { Routes, Route } from 'react-router-dom'
import { Shell } from './components/Shell'
import { Launcher } from './launcher/Launcher'
import { DataJourney } from './journey/DataJourney'
import { PillarModuleShell } from './module/PillarModuleShell'
import { ProgressScreen } from './module/ProgressScreen'

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Launcher />} />
        <Route path="/journey" element={<DataJourney />} />
        <Route path="/pillar/:id" element={<PillarModuleShell />} />
        <Route path="/progress" element={<ProgressScreen />} />
        <Route path="*" element={<Launcher />} />
      </Route>
    </Routes>
  )
}
