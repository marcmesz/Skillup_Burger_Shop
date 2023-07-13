import React, { useEffect, useState } from "react";
import { MDBTabsPane, MDBBtn, MDBInput, MDBCheckbox, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import SocialLogin from "./SocialLogin";
import { useForm, Controller } from "react-hook-form";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";

const RegisterForm = ({ justifyActive }) => {
    const { register, handleSubmit, control } = useForm({ defaultValues: { agreeTerms: false } })
    const [regError, setregError] = useState(null)
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
            e.target[4].classList.add("is-invalid")
        }

        if (!error) {
            // Register the user if everything went OK!
            /* const checkPassword = bcrypt.compareSync(data.password, hash) */
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(data.password, salt)
            const registerUser = {
                isAuthenticated: true,
                username: data.username,
                password: hash,
                name: data.name,
                email: data.email,
                address: [],
                orders: []
            }
            setregError(e.target[2])
            dispatch(userActions.registerUser(registerUser))
        }
    }

    useEffect(() => {
        if (process === "reg_error") {
            regError.classList.add("is-invalid")
        }
    }, [process, regError])

    return (
        <MDBTabsPane show={justifyActive === "tab2"}>
            <SocialLogin type="up" />
            <MDBValidation className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <MDBValidationItem className="col-12" feedback="You have to enter your full name." invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="Name"
                        {...register("name", {
                            required: true,
                            validate: {
                                minLength: v => v.length >= 3
                            }
                        })}
                        id="name"
                        type="text"
                        required
                    />
                </MDBValidationItem>
                <MDBValidationItem
                    className="col-12"
                    feedback={process === "reg_error" ?
                        "E-mail is already in use, please choose another one." :
                        "You have to enter a valid e-mail address."
                    }
                    invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="Email"
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                maxLength: (v) =>
                                    v.length <= 50 || "The email should have at most 50 characters",
                                matchPattern: (v) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                    "Email address must be a valid address",
                            },
                        })}
                        id="email"
                        type="email"
                        required
                    />
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
                <MDBValidationItem className="col-12" feedback="Passwords do not match!" invalid>
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