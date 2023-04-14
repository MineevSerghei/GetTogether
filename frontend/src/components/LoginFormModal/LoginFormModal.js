import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {

        const err = {};

        if (credential.length < 4) err.username = 'Credential must be 4 characters or longer';
        if (password.length < 6) err.password = 'Password must be 6 characters or longer';

        setErrors(err);

    }, [credential, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const handleDemo = e => {
        e.preventDefault();

        return dispatch(sessionActions.login({ credential: 'MichaelScott', password: 'password' }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });


    }

    const bttnClassName =
        `submit-bttn${errors.username ? ' disabled-bttn'
            : errors.password ? ' disabled-bttn' : ''}`

    return (
        <>
            <h1 className="log-label">Log In</h1>
            <form className="login-form form" onSubmit={handleSubmit}>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p className="errors login-errors">{errors.credential}</p>
                )}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <div>
                    <button className={bttnClassName} type="submit">Log In</button>
                    <button className='submit-bttn demo-bttn' onClick={handleDemo}>Demo</button>
                </div>
            </form>
        </>
    );
}

export default LoginFormModal;
