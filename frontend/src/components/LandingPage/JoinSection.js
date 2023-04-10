import OpenModalButton from "../OpenModalButton"
import SignupFormModal from "../SignupFormModal"

export default function JoinSection() {

    return (
        <div className="join-sec-container">
            <OpenModalButton
                buttonText="Join Meetup"
                modalComponent={<SignupFormModal />}
            />
        </div>
    )
}
