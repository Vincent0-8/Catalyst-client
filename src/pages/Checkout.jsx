import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createOrder } from "../redux/slices/orderSlice"
import { clearCart } from "../redux/slices/cartSlice"
import { toast } from "react-toastify"

const Checkout = () => {
    const { items } = useSelector((state) => state.cart)
    const { loading, error } = useSelector((state) => state.orders)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        phone: ''
    })

    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    const handleChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value
        })
    }

    const handlePhoneChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9+]/g, '');
        setShippingInfo({ ...shippingInfo, phone: numericValue });
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      items: items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      })),
      shippingInfo,
    };

    const result = await dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(result)) {
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      navigate('/orders');
    }
  };

  if (items.length === 0) {
    return <p className="px-8 py-16 text-center text-primary/60">Your cart is empty</p>
  }

  return(
    <div className="px-8 py-10 max-w-2xl mx-auto">
      <h1 className="font-serif text-3xl text-primary mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
            <h2 className="font-sans text-sm font-semibold text-primary mb-3">Shipping Information</h2>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="flex items-center justify-start block text-xs text-primary mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={shippingInfo.fullName}
                        onChange={handleChange}
                        className="w-full border border-primary/20 px-4 py-2 font-sans text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center justify-start block text-xs text-primary mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Example Road, No. 123"
                        value={shippingInfo.address}
                        onChange={handleChange}
                        className="w-full border border-primary/20 px-4 py-2 font-sans text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center justify-start block text-xs text-primary mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="08123456789"
                        value={shippingInfo.phone}
                        onChange={handlePhoneChange}
                        pattern="[0-9+]{8,15}"
                        title="Phone number must be 8-15 digits"
                        className="w-full border border-primary/20 px-4 py-2 font-sans text-sm"
                        required
                    />
                </div>
            </div>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold text-primary mb-3">Order Summary</h2>
          <div className="flex flex-col gap-2 border-t border-primary/10 pt-3">
            {items.map((item) => (
              <div key={`${item.product._id}-${item.size}`} className="flex justify-between text-sm text-primary">
                <span>{item.product.name} ({item.size}) × {item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold text-primary mt-3 pt-3 border-t border-primary/10">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {error && <p className="text-accent text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-secondary py-3 font-sans text-sm hover:bg-accent transition-colors cursor-pointer"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
    
  )
}

export default Checkout;