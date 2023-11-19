import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JorunalRoutes } from "../journal/routes/JorunalRoutes"

export const AppRouter = () => {
  return (
    <Routes>
        {/* Login y registro */}
        <Route path="auth/*" element={ <AuthRoutes /> } />
        {/* JournalApp */}
        <Route  path="/*" element={ <JorunalRoutes /> } />
    </Routes>
  )
}
