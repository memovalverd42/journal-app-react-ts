import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JorunalRoutes } from "../journal/routes/JorunalRoutes"
import { CheckingAuth } from "../ui"
import { useCheckAuth } from "../hooks"


export const AppRouter = () => {

  const status = useCheckAuth();

  if (status === "cheking") {
    return <CheckingAuth/>
  }

  return (
    <Routes>

        {
          (status === "authenticated")
          ? <Route  path="/*" element={ <JorunalRoutes /> } />
          : <Route path="auth/*" element={ <AuthRoutes /> } />
        }

        <Route path="/*" element={ <Navigate to='/auth/login' /> } />

    </Routes>
  )

}
