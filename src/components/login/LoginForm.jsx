import { MDBTabsPane, MDBBtn, MDBInput, MDBCheckbox, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import { useState } from "react";
import SocialLogin from "./SocialLogin";

const LoginForm = ({ justifyActive }) => {

    const [formValue, setFormValue] = useState({

    })


    return (
        <MDBTabsPane show={justifyActive === "tab1"}>
            <SocialLogin type="in" />
            <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
            />
            <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
            />
            <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Remember me"
                />
                <a href="!#">Forgot password?</a>
            </div>
            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
            <p className="text-center">
                Not a member? <a href="#!">Register</a>
            </p>
        </MDBTabsPane>
    )
}

export default LoginForm