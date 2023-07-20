const CartItem = ({ value, price, title, img, increment, decrement, confirmOrder }) => {
    return (
        <div className="cartItem">
            <div>
                <h4>{title}</h4>
                <img src={img} alt="Item" />
            </div>
            <div>
                {
                    !confirmOrder ?
                        <>
                            <button onClick={decrement}>-</button>
                            <input type="number" readOnly value={value} />
                            <button onClick={increment}>+</button>
                        </>
                        :
                        <div className="fs-5">{value} x ₹{price}</div>
                }
            </div>
        </div>
    )
}

export default CartItem