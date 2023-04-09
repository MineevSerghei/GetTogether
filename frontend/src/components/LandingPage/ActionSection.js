import ActionItem from "./ActionItem";

export default function ActionSection() {
    return (
        <div className="actions-container">
            <ActionItem link={{ text: 'whatever', url: "no idea" }} heading="See all groups" description="" />
            <ActionItem link={{ text: 'whatever', url: "no idea" }} heading="Find an event" description="" />
            <ActionItem link={{ text: 'whatever', url: "no idea" }} heading="Start a new group" description="" authDependant={true} />
        </div>
    )
}
