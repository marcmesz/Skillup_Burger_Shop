import "../../styles/shipping.scss";
import React, { useEffect } from "react";
import { State, City } from "country-state-city";
import { Link } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";

const Shipping = () => {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [checkError, setCheckError] = useState(false)
  const stateOptions = State.getStatesOfCountry(country).map(option => ({ value: option.isoCode, label: option.name }))
  const required = { required: "This field is required." }
  const dispatch = useDispatch()
  const order = useSelector(state => state.cart)

  const onSubmit = (data) => {
    dispatch(userActions.addOrderToUser({ address: data, order: order }))
  }

  const errorStyle = {
    control: (base) => ({
      ...base,
      outline: "2px solid red"
    })
  }

  return (
    <section className="shipping">
      <h1 className="page-title">Shipping Details</h1>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="streetHouseNo">Street, H. No.
              {errors.streetHouseNo && <div className="input-error">{errors.streetHouseNo?.message}</div>}
            </label>
            <input {...register("streetHouseNo", required)} placeholder="Enter Street, House No." />

          </div>
          <div>
            <label htmlFor="city">City
              {errors.city && <div className="input-error">{errors.city?.message}</div>}
            </label>
            <input {...register("city", required)} placeholder="Enter City" />
          </div>
          <div>
            <label>Country
              {errors.country && <div className="input-error">{errors.country?.message}</div>}
            </label>
            <Controller
              name="country"
              control={control}
              defaultValue=""
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
            <label>State</label>
            <Controller
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
            <label htmlFor="pincode">Pin Code
              {errors.pincode && <div className="input-error">{errors.pincode?.message}</div>}
            </label>
            <input {...register("pincode", required)} type="number" placeholder="Enter Pincode" />
          </div>
          <div>
            <label htmlFor="phone">Phone No.
              {errors.phone && <div className="input-error">{errors.phone?.message}</div>}
            </label>
            <input {...register("phone", required)} type="number" placeholder="Enter Phone No." />
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
