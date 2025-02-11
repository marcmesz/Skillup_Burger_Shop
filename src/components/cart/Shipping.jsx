import "../../styles/shipping.scss";
import React, { useEffect } from "react";
import { State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { v4 as uuid } from "uuid"
import { scrollToTop } from "../../functions/scrollToTop";

const Shipping = () => {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [checkError, setCheckError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const stateOptions = State.getStatesOfCountry(country).map(option => ({ value: option.isoCode, label: option.name }))
  const required = { required: "This field is required." }
  const order = useSelector(state => state.cart)
  const confirmOrder = useSelector(state => state.user.process.type === "confirm_order")
  const userEmail = useSelector(state => state.user.isAuthenticated.email)
  const users = useSelector(state => state.user.users)
  const userAddress = users.find(user => user.email === userEmail).address
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const userOrder = Object.assign({ ...order }, { orderId: uuid().split("-")[0] })
    !submitted && dispatch(userActions.addOrderToUser({ address: data, order: userOrder }))
    setSubmitted(true)
  }

  const errorStyle = {
    control: (base) => ({
      ...base,
      outline: "2px solid red"
    })
  }

  useEffect(() => {
    if (userAddress) {
      for (const key in userAddress) {
        setValue(key, userAddress[key])
      }
    }

    if (submitted && confirmOrder) {
      navigate("/confirm-order")
    }
    scrollToTop()
  }, [submitted, confirmOrder, navigate])

  return (
    <section className="shipping">
      <h1 className="page-title">Shipping Details</h1>
      <main>
        <form onSubmit={handleSubmit(onSubmit)} id="shippingForm">
          <div>
            <label htmlFor="streetHouseNo">Street, H. No.
            </label>
            <input
              {...register("streetHouseNo", required)}
              placeholder="Enter Street, House No."
              name="streetHouseNo"
              id="streetHouseNo"
              autoComplete="add"
            />
            {errors.streetHouseNo && <div className="input-error">{errors.streetHouseNo?.message}</div>}
          </div>
          <div>
            <label htmlFor="city">City
            </label>
            <input
              {...register("city", required)}
              placeholder="Enter City"
              name="city"
              id="city"
            />
            {errors.city && <div className="input-error">{errors.city?.message}</div>}
          </div>
          <div>
            <label htmlFor="country">Country
            </label>
            <Controller
              id="country"
              name="country"
              control={control}
              rules={required}
              render={({ field: { onChange, value } }) => (
                <Select options={[
                  { value: "IN", label: "India" },
                  { value: "HU", label: "Hungary" }
                ]}
                  placeholder="Select Country"
                  className="custom-select"
                  value={value}
                  styles={checkError && country === "" ? errorStyle : {}}
                  onChange={(e) => {
                    onChange(e)
                    setCountry(e.value)
                    setValue("state", "")
                    setState("")
                    setCheckError(false)
                  }}
                />
              )}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <Controller
              id="state"
              name="state"
              control={control}
              defaultValue=""
              rules={required}
              render={({ field: { onChange, value } }) => (
                <Select options={stateOptions}
                  placeholder="Select State"
                  className="custom-select"
                  styles={checkError && state === "" ? errorStyle : {}}
                  onChange={(e) => {
                    onChange(e)
                    setState(e.value)
                    setCheckError(false)
                  }}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <label htmlFor="pincode">Pin Code</label>
            <input
              {...register("pincode", required)}
              type="number"
              placeholder="Enter Pincode"
              name="pincode"
              id="pincode"
            />
            {errors.pincode && <div className="input-error">{errors.pincode?.message}</div>}
          </div>
          <div>
            <label htmlFor="phone">Phone No.
            </label>
            <input
              {...register("phone", required)}
              type="number"
              placeholder="Enter Phone No."
              name="phone"
              id="phone"
            />
            {errors.phone && <div className="input-error">{errors.phone?.message}</div>}
          </div>
          <button type="submit" className="link mt-5" style={{ border: "none" }} onClick={() => setCheckError(true)}>
            Confirm Address
          </button>
        </form>
      </main>
    </section>
  )
}

export default Shipping
