import { Link } from "react-router-dom";
import "../../styles/about.scss";

const RegistrationSuccess = () => {
    return (
        <section className="about">
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