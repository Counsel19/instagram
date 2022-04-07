import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";


export default function UserRedirect ({ children, user, redirect }) {
    return(user ? <Navigate to={redirect} /> : <Outlet>{children}</Outlet>)
}

UserRedirect.propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
    redirect: PropTypes.string
}

