import "../../styles/login.scss";
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent } from "mdb-react-ui-kit";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import { useLocation } from "react-router-dom";

const Login = () => {
    const [justifyActive, setJustifyActive] = useState("tab1")
    const process = useSelector(state => state.user.process)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return
        }
        setJustifyActive(value)
    }

    useEffect(() => {
        if (location.pathname === "/logout") {
            dispatch(userActions.logoutUser())
        }
        else if (process.type === "reg_success") {
            dispatch(userActions.handleProcess({ type: "finished" }))
            navigate("/registration-successful")
        }

    }, [process.type, navigate, dispatch, location])

    return (
        <MDBContainer className="p-3 my-5 login-container">
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
                <LoginForm justifyActive={justifyActive} handleJustifyClick={handleJustifyClick} />
                <RegisterForm justifyActive={justifyActive} />
            </MDBTabsContent>
        </MDBContainer>
    )
}
export default Login