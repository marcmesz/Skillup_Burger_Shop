import "../../styles/contact.scss";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import burger from "../../assets/burger2.png";
import { GrSend } from "react-icons/gr";
import { useForm, Controller } from "react-hook-form";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBTextArea,
    MDBValidation,
    MDBValidationItem
} from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";

const Contact = () => {
    const formRef = useRef()
    const { register, handleSubmit, setValue, reset, formState: { errors }, control } = useForm()
    const [message, setMessage] = useState(false)
    const users = useSelector(state => state.user.users)
    const userEmail = useSelector(state => state.user.isAuthenticated.email)
    const user = users.find(user => user.email === userEmail)

    const onSubmit = data => setMessage(data)

    const handleCloseModal = () => {
        formRef.current.reset()
        setMessage(false)
        reset({
            name: user ? user.name : "",
            email: user ? user.email : "",
            message: ""
        })
    }

    useEffect(() => {
        if (user) {
            setValue("name", user.name)
            setValue("email", user.email)
        }
    }, [])

    return (
        <>
            <h1 className="page-title">Contact</h1>
            <section className="contact">
                <motion.div
                    className="motion-container"
                    initial={{
                        x: "-100vw",
                        opacity: 0,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                    }}
                    transition={{ delay: 0.2 }}
                >
                    <MDBValidation onSubmit={handleSubmit(onSubmit)} id="contactUs" ref={formRef}>
                        <h2>Contact Us</h2>
                        <MDBValidationItem className="col-12" feedback="You have to enter your name." invalid>
                            <MDBInput
                                wrapperClass="mb-1"
                                label="Name"
                                {...register("name", {
                                    required: true
                                })}
                                id="name"
                                type="text"
                                autoComplete="name"
                                required
                            />
                        </MDBValidationItem>
                        <MDBValidationItem
                            feedback=""
                            className="col-12"
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
                        <MDBValidationItem feedback="">
                            <Controller
                                name="message"
                                control={control}
                                rules={{ required: "We cannot send an empty message." }}
                                render={({ field }) => <MDBTextArea
                                    {...field}
                                    id="message"
                                    ref={null}
                                    name="message"
                                    label="Message"
                                    rows="9"
                                    required
                                />
                                }
                            />
                            {errors.message && <div className="invalid-feedback d-block">{errors.message.message}</div>}
                        </MDBValidationItem>
                        <MDBBtn type="submit">Send</MDBBtn>
                    </MDBValidation>
                </motion.div>
                <motion.div
                    className="formBorder"
                    initial={{
                        x: "100vw",
                        opacity: 0,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                    }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.div
                        initial={{
                            y: "-100vh",
                            x: "50%",
                            opacity: 0,
                        }}
                        animate={{
                            x: "50%",
                            y: "-50%",
                            opacity: 1,
                        }}
                        transition={{
                            delay: 1,
                        }}
                    >
                        <img src={burger} alt="Burger" />
                    </motion.div>
                </motion.div>
            </section >

            {
                message &&
                <MDBModal show={message} tabIndex='-1' className="d-flex flex-column align-items-center justify-content-center">
                    <MDBModalDialog className="w-75">
                        <MDBModalContent>
                            <MDBModalBody className="text-center">
                                <GrSend className="message-sent-icon" />
                                <h4 className="mt-4">Your message has been sent.</h4>
                                <p className="mt-4">Thank you for contacting us!</p>
                                <p>We will get back to you shortly on the given address:</p>
                                <p className="reply-email">{message.email}</p>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn onClick={handleCloseModal}>OK</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            }
        </>
    )
}

export default Contact