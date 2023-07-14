import React, { useEffect, useState } from "react";
import { MDBTabsPane, MDBBtn, MDBInput, MDBCheckbox, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import SocialLogin from "./SocialLogin";
import { useForm, Controller } from "react-hook-form";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";

const RegisterForm = ({ justifyActive }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm()
    const [regError, setregError] = useState(null)
    const [matchPassword, setMatchPassword] = useState(false)
    const process = useSelector(state => state.user.process)
    const dispatch = useDispatch()

    const onSubmit = (data, e) => {
        let error = false
        for (let key in data) {
            if (typeof data[key] === "string") {
                data[key] = data[key].trim()
            }
        }

        if (data.password !== data.confirmPassword) {
            error = true
            setMatchPassword(true)
            e.target[3].classList.add("is-invalid")
        }

        if (!error) {
            // Register the user if everything went OK!
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(data.password, salt)
            const registerUser = {
                password: hash,
                name: data.name,
                email: data.email,
                address: [],
                orders: []
            }
            setregError(e.target[1])
            dispatch(userActions.registerUser(registerUser))
        }
    }

    useEffect(() => {
        if (process.type === "reg_error") {
            regError.classList.add("is-invalid")
        }
    }, [process.type, regError])

    return (
        <MDBTabsPane show={justifyActive === "tab2"}>
            <SocialLogin type="up" />
            <MDBValidation className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <MDBValidationItem className="col-12" feedback="You have to enter your full name." invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="Name"
                        {...register("name", {
                            required: true
                        })}
                        id="name"
                        type="text"
                        required
                    />
                </MDBValidationItem>
                <MDBValidationItem
                    className="col-12"
                    feedback={process.type === "reg_error" && process.message}
                    invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="E-mail address"
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        {...register("email", {
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
                    {errors.email && <div className="invalid-feedback d-block">{errors.email.message}</div>}
                </MDBValidationItem>
                <MDBValidationItem className="col-12" feedback="You have to enter a password." invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="Password"
                        {...register("password")}
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        required
                    />
                </MDBValidationItem>
                <MDBValidationItem className="col-12" feedback={
                    matchPassword ? "Passwords do not match!" : "You have to confirm your password."
                } invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="Confirm Password"
                        {...register("confirmPassword")}
                        id="confirmPassword"
                        type="password"
                        onChange={(e) => e.target.classList.remove("is-invalid")}
                        autoComplete="current-password"
                        required
                    />
                </MDBValidationItem>
                <MDBValidationItem className="col-12" feedback="You have to agree to the terms to register." invalid>
                    <div className="d-flex justify-content-center mb-1">
                        <Controller
                            name="agreeTerms"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <MDBCheckbox
                                label="I have read and agree to the terms."
                                id="agreeTerms"
                                required
                                {...field}
                                ref={null}
                            />}
                        />
                    </div>
                </MDBValidationItem>
                <MDBBtn type="submit" className="mb-4 w-100">Sign up</MDBBtn>
            </MDBValidation>
        </MDBTabsPane>
    )
}

export default RegisterForm