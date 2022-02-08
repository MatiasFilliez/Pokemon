import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
export default function Card() {
    const { loginWithRedirect } = useAuth0()

    return (
        <p onClick={() => loginWithRedirect()}>Login</p>
    )
}
