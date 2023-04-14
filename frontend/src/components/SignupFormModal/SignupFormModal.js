import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [frontendErrors, setFrontendErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {

        const err = {};
        if (email.length <= 0) err.email = 'Email field cannot be empty';
        if (username.length < 4) err.username = 'Credential must be 4 characters or longer';
        if (firstName.length <= 0) err.firstName = 'First name field cannot be empty';
        if (lastName.length <= 0) err.lastName = 'Last name field cannot be empty';
        if (password.length < 6) err.password = 'Password must be 6 characters or longer';
        if (confirmPassword.length < 6) err.confirmPassword = 'Confirm password field cannot be empty';

        setFrontendErrors(err);

    }, [email, username, firstName, lastName, confirmPassword, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                        console.log('data---->>>', data)
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    const bttnClassName = `submit-bttn${Object.values(frontendErrors).length > 0 ? ' disabled-bttn' : ''}`;

    return (
        <>
            <h1 className="log-label">Sign Up</h1>
            <form className="signup-form form" onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p className="errors login-errors">{errors.email}</p>}
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p className="errors login-errors">{errors.username}</p>}
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p className="errors login-errors">{errors.firstName}</p>}
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p className="errors login-errors">{errors.lastName}</p>}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p className="errors login-errors">{errors.password}</p>}
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && (
                    <p className="errors login-errors">{errors.confirmPassword}</p>
                )}
                <button className={bttnClassName} type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
