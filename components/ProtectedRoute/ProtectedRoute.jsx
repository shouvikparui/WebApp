import { useEffect } from "react"
import { useUserContext } from "../../context/user.context"
import { useNavigate, useLocation } from "react-router-dom"

function ProtectedRoute({children, ...rest}) {

    console.log(rest);

    const { user } = useUserContext()

    const navigate = useNavigate()
    const {pathname} = useLocation()

    useEffect (() => {
        if(user && (pathname.includes('auth')) || (!user && rest.onlyWhenUser)) {
            navigate('/')
        }
    }, [user])

    return children
}

export default ProtectedRoute