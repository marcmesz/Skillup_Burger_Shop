import "../../styles/shipping.scss";
import React from "react";
import { State } from "country-state-city";
import { Link } from "react-router-dom";

const Shipping = () => {

  return (
    <section className="shipping">
      <h1 className="page-title">Shipping Details</h1>
      <main>
        <form>
          <div>
            <label>Street, H. No.</label>
            <input type="text" placeholder="Enter Street, House No." />
          </div>
          <div>
            <label>City</label>
            <input type="text" placeholder="Enter City" />
          </div>
          <div>
            <label>Country</label>
            <select>
              <option value="">India</option>
              { }
            </select>
          </div>
          <div>
            <label>State</label>
            <select>
              <option value="" disabled>Select state</option>
              {State &&
                State.getStatesOfCountry("IN").map((i) => (
                  <option value={i.isoCode} key={i.isoCode}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>Pin Code</label>
            <input type="number" placeholder="Enter Pincode" />
          </div>
          <div>
            <label>Phone No.</label>
            <input type="number" placeholder="Enter Phone No." />
          </div>
          <Link className="link mt-5" to="/confirm-order">
            Confirm Address
          </Link>
        </form>
      </main>
    </section>
  )
}

export default Shipping
