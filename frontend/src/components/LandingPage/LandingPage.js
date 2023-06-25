import TitleSection from "./TitleSection";
import SubtitleSection from "./SubtitleSection";
import ActionSection from "./ActionSection";
import JoinSection from "./JoinSection";
import './LandingPage.css'
import { useSelector } from "react-redux";

export default function LandingPage() {

    const sessionUser = useSelector(state => state.session.user);
    return (
        <div className="landing-container">
            <TitleSection />
            <SubtitleSection />
            <ActionSection />
            {!sessionUser && <JoinSection />}
        </div>
    )
}
