import { MDBTabsPane, MDBBtn, MDBInput, MDBCheckbox, MDBValidation, MDBValidationItem, MDBTabsLink } from "mdb-react-ui-kit";
import SocialLogin from "./SocialLogin";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import LoginError from "./LoginError";
import bcrypt from "bcryptjs";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const LoginForm = ({ justifyActive, handleJustifyClick }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({ defaultValues: { rememberMe: false } })
    const formRef = useRef()
    const dispatch = useDispatch()
    const state = useSelector(state => state.user)
    const [noAccount, setNoAccount] = useState(false)
    const loginError = state.process.type === "login_error" || noAccount
    const checkout = state.process.checkout

    const onSubmit = (data) => {
        /* data.rememberMe needs to implement */
        !checkout && dispatch(userActions.handleProcess())
        const findUser = state.users.find(user => user.email === data.emailLogin)

        if (findUser) {
            bcrypt.compare(data.passwordLogin.trim(), findUser.password).then(isAuth => {
                dispatch(userActions.loginUser({ email: findUser.email, isAuth: isAuth }))
                dispatch(userActions.handleProcess({ type: "loggedIn" }))
            })
        }
        else {
            setNoAccount(true)
        }
    }

    useEffect(() => {
        if (state.process.type === "login_error") {
            formRef.current.classList.remove("was-validated")
            formRef.current[1].value = ""
        }
    }, [state.process.type])

    return (
        <MDBTabsPane show={justifyActive === "tab1"}>
            <SocialLogin type="in" />
            {loginError && <LoginError message={state.process.message || "No account found with this e-mail address."} />}
            <MDBValidation ref={formRef} className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <MDBValidationItem className="col-12" feedback="" invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="E-mail address"
                        id="email-login"
                        type="email"
                        autoComplete="email"
                        required
                        {...register("emailLogin", {
                            required: "You have to enter your e-mail address.",
                            validate: {
                                maxLength: (v) =>
                                    v.length <= 50 || "The email should have at most 50 characters",
                                matchPattern: (v) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                    "You have to enter a valid e-mail address!"
                            },
                        })}
                    />
                    {errors.emailLogin && <div className="invalid-feedback d-block">{errors.emailLogin.message}</div>}
                </MDBValidationItem>
                <MDBValidationItem className="col-12" feedback="You have to enter your password." invalid>
                    <MDBInput
                        label="Password"
                        id="password-login"
                        type="password"
                        autoComplete="current-password"
                        required
                        {...register("passwordLogin", {
                            required: true
                        })}
                    />
                </MDBValidationItem>
                <MDBValidationItem className="col-12" feedback="">
                    <div className="d-flex justify-content-between mb-1">
                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => <MDBCheckbox
                                label="Remember me"
                                id="rememberMe"
                                {...field}
                                ref={null}
                            />}
                        />
                        <a href="!#">Forgot password?</a>
                    </div>
                </MDBValidationItem>
                <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
            </MDBValidation>
            <p className="text-center d-flex justify-content-center gap-2 not-a-member">
                Not a member? <MDBTabsLink
                    onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}
                >
                    Register
                </MDBTabsLink>
            </p>
        </MDBTabsPane >
    )
}

export default LoginForm