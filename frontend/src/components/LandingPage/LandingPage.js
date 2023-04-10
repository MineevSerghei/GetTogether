import TitleSection from "./TitleSection";
import SubtitleSection from "./SubtitleSection";
import ActionSection from "./ActionSection";
import JoinSection from "./JoinSection";
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className="landing-container">
            <TitleSection />
            <SubtitleSection />
            <ActionSection />
            <JoinSection />
        </div>
    )
}
