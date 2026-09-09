import { Navigate, Route, Routes } from "react-router"

import { AdminLayout } from "@/components/layout/AdminLayout"
import { ConfigPage } from "@/pages/config/index.tsx"

export function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<ConfigPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
