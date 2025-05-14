import { Link } from "@tanstack/react-router";

export default function Nav() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </nav>
    )
}