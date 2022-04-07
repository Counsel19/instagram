import PropTypes from "prop-types"
import {Navigate, Outlet } from "react-router-dom";
import * as ROUTES from '../contants/routes';


export default function ProtectedRoutes ({ user, children, ...rest }){
   return(
       user ? <Outlet {...rest}>{children}</Outlet> : <Navigate to={ROUTES.LOGIN} replace />
   )
}

ProtectedRoutes.propTypes = {
    user: PropTypes.object,
    children: PropTypes.element

}