import { Link } from "react-router-dom";
import "../../styles/pagecontent.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";

const RegistrationSuccess = () => {
    const success = useSelector(state => state.user.process.type === "finished")
    const dispatch = useDispatch()

    useEffect(() => {
        if (!success) {
            dispatch(userActions.handleProcess())
        }
    }, [success, dispatch])

    return (
        <section className="page-content">
            <h1 className="page-title">Registration</h1>
            <main className="container-xxl">
                <article>
                    <h4 className="text-capitalize">Registration Successful!</h4>
                    <p>
                        Thank you for registering!< br />
                        You may now login to your account.
                    </p>
                    <p>
                        <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
                    </p>
                </article>
            </main>
        </section>
    )
}

export default RegistrationSuccess