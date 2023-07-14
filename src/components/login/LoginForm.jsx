import { MDBTabsPane, MDBBtn, MDBInput, MDBCheckbox, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import SocialLogin from "./SocialLogin";
import { useForm, Controller } from "react-hook-form";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

const LoginForm = ({ justifyActive }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({ defaultValues: { rememberMe: false } })
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const loginUser = {
            email: data.emailLogin,
            password: data.passwordLogin.trim(),
            rememberMe: data.rememberMe
        }

        dispatch(userActions.loginUser(loginUser))
    }

    return (
        <MDBTabsPane show={justifyActive === "tab1"}>
            <SocialLogin type="in" />
            <MDBValidation className="row g-3" onSubmit={handleSubmit(onSubmit)}>
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
            <p className="text-center">
                Not a member? <a href="#!">Register</a>
            </p>
        </MDBTabsPane >
    )
}

export default LoginForm