import "../../styles/shippingdetails.scss";

const ShippingDetails = () => {
    return (
        <>
            <h4 className="detail-title">Contact details</h4>
            <article className="shipping-details d-flex flex-column align-items-center p-2 mx-4">
                <div className="d-flex justify-between w-100 m-0">
                    <h6>Contact name:</h6>
                    <p>Mészöly Márton</p>
                </div>
                <div className="d-flex justify-between w-100 m-0">
                    <h6>E-mail address:</h6>
                    <p>meszoly.marton@gmail.com</p>
                </div>
                <div className="d-flex justify-between w-100 m-0">
                    <h6>Shipping address:</h6>
                    <p>2084, Pilisszentiván, Erdő u. 6.</p>
                </div>
                <div className="d-flex justify-between w-100 m-0">
                    <h6>Phone number:</h6>
                    <p>0036333222322</p>
                </div>
            </article>
            <h4 className="detail-title">Ordered items</h4>
        </>
    )
}

export default ShippingDetails