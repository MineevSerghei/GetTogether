import ActionSection from "../LandingPage/ActionSection"
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1>We're sorry, we couldn't find it :(</h1>
            <h2>Maybe it's here somewhere:</h2>
            <ActionSection redirect={true} />
        </div>

    )
}
