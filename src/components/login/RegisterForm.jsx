import React from "react";
import { MDBTabsPane, MDBBtn, MDBInput, MDBCheckbox, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import SocialLogin from "./SocialLogin";
import { useForm, Controller } from "react-hook-form";
import bcrypt from "bcryptjs";

const RegisterForm = ({ justifyActive }) => {
    const { register, handleSubmit, control } = useForm({ defaultValues: { agreeTerms: false } })

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
            console.log(data)
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
            console.log(registerUser)
        }

    }

    return (
        <MDBTabsPane show={justifyActive === "tab2"}>
            <SocialLogin type="up" />
            <MDBValidation className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <MDBValidationItem className="col-12" feedback="You have to enter your full name." invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="Name"
                        {...register("name")}
                        id="name"
                        type="text"
                        required
                    />
                </MDBValidationItem>
                <MDBValidationItem className="col-12" feedback="You have to enter a username." invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="Username"
                        {...register("username")}
                        id="username"
                        type="text"
                        autoComplete="username"
                        required
                    />
                </MDBValidationItem>
                <MDBValidationItem className="col-12" feedback="You have to enter a valid e-mail address." invalid>
                    <MDBInput
                        wrapperClass="mb-1"
                        label="Email"
                        {...register("email")}
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