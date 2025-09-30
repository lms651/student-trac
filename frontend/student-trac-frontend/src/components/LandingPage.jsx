import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <main>
            <h1>Welcome!</h1>
            <button onClick={() => navigate("/create-profile")}>Create Profile</button>
        </main>
    )
}