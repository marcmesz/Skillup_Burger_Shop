import "../../styles/login.scss";
import React, { useState } from "react";
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent } from "mdb-react-ui-kit";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Login = () => {
    const [justifyActive, setJustifyActive] = useState("tab1")

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return
        }
        setJustifyActive(value)
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <MDBTabs
                pills
                justify
                className="mb-3 d-flex flex-row justify-content-between"
            >
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleJustifyClick("tab1")}
                        active={justifyActive === "tab1"}
                    >
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleJustifyClick("tab2")}
                        active={justifyActive === "tab2"}
                    >
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
                <LoginForm justifyActive={justifyActive} />
                <RegisterForm justifyActive={justifyActive} />
            </MDBTabsContent>
        </MDBContainer>
    )
}
export default Login