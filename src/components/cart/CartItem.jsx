const CartItem = ({ value, price, title, img, name, increment, decrement, confirmOrder }) => {
    return (
        <div className="cartItem">
            <div className="cartItem__title">
                <h4>{title}</h4>
                <img src={img} alt="Item" />
            </div>
            <div>
                {
                    !confirmOrder ?
                        <>
                            <button onClick={decrement}>-</button>
                            <input name={name} type="number" readOnly value={value} />
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