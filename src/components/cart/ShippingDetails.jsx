import "../../styles/shippingdetails.scss";

const ShippingDetails = ({ currentOrder }) => {
    const address = currentOrder.address
    const shippingAddress = `${address.streetHouseNo}, ${address.city}, ${address.state.label} ${address.pincode}, ${address.country.label}`

    return (
        <>
            <h4 className="detail-title">Contact details</h4>
            <article className="shipping-details d-flex flex-column align-items-center">
                <div className="d-flex justify-between w-100 m-0">
                    <h6>Contact name:</h6>
                    <p className="shipping-data">{currentOrder.name}</p>
                </div>
                <div className="d-flex justify-between w-100 m-0">
                    <h6>E-mail address:</h6>
                    <p className="shipping-data email">{currentOrder.email}</p>
                </div>
                <div className="d-flex justify-between align-items-start w-100 m-0">
                    <h6>Shipping address:</h6>
                    <p className="shipping-data">{shippingAddress}</p>
                </div>
                <div className="d-flex justify-between w-100 m-0">
                    <h6>Phone number:</h6>
                    <p className="shipping-data">{currentOrder.address.phone}</p>
                </div>
            </article>
            <h4 className="detail-title">Ordered items</h4>
        </>
    )
}

export default ShippingDetails