
export default function Member({ user, member, groupId }) {


    if (!member) return null;

    return <div className="member-box">
        <p>{member.firstName} {member.lastName} </p>
        <div>
            <p>{member.Membership.status}</p>
            {user === 'organizer' && <div><i className="fa-solid fa-user-pen user-manage-icon user-manage"></i> <i className="fa-solid fa-user-xmark user-manage-icon user-remove"></i></div>}
        </div>

    </div>
}
