import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const totalPrice = items.reduce((sum,item) => sum + item.product.price * item.quantity, 0)

    const handleQuantityChange = (productId, size, currentQty, newQty, stock) => {
        if (newQty < 1) return;
        if (newQty > stock) {
            toast.warn(`Maximum available stock reached (${stock} items)`);
            return;
        }
        dispatch(updateQuantity({ productId, size, quantity: newQty }))
    }

    const handleRemove = (productId, size) => {
        dispatch(removeFromCart({ productId, size }))
    }

    if (items.length === 0) {
        return (
            <div className="px-8 py-26 text-center">
                <p className="font-serif text-2xl text-primary mb-4">Your Cart is Empty</p>
                <Link to="/" className="text-accent hover:underline text-sm">Continue Shopping</Link>
            </div>
        )
    }

    return (
        <div className="px-8 py-10 max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl text-primary mb-8">Your Cart</h1>

            <div className="flex flex-col gap-6">
                
                {items.map((item) => (
                    <div key={`${item.product._id}-${item.size}`} className="flex gap-4 border-b border-primary/10 pb-6">
                        <div className="w-20 sm:w-24 aspect-3/4 bg-secondary shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-2">
                            <div>
                                <p className="font-sans text-sm text-primary font-medium">{item.product.name}</p>
                                <p className="font-sans text-xs text-primary/60 mt-1">Size: {item.size}</p>
                                <p className="font-sans text-sm text-primary mt-1">${item.product.price}</p>

                                <div className="flex items-center gap-3 mt-3">
                                    <div className="flex items-center border border-primary/20">
                                        <button
                                        onClick={() => handleQuantityChange(item.product._id, item.size, item.quantity, item.quantity - 1, item.product.stock)}
                                        className="px-3 py-1 cursor-pointer"
                                        >
                                        -
                                        </button>

                                        <span className="px-4 text-sm">{item.quantity}</span>

                                        <button
                                        onClick={() => handleQuantityChange(item.product._id, item.size, item.quantity, item.quantity + 1, item.product.stock)}
                                        disabled={item.quantity >= item.product.stock}
                                        className="px-3 py-1 cursor-pointer disabled:opacity-30"
                                        >
                                        +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item.product._id, item.size)}
                                        className="text-accent text-xs hover:underline cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </div>
                                {item.quantity >= item.product.stock && (
                                    <p className="text-[11px] text-accent mt-1">Max stock reached ({item.product.stock})</p>
                                )}
                            </div>

                            <p className="font-sans text-sm font-semibold text-primary sm:text-right">
                                Total: ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

            <div className="mt-8 flex justify-between items-center font-sans text-lg text-primary">
                <span>Total</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="mt-6 block text-center bg-primary text-secondary py-3 font-sans text-sm hover:bg-accent transition-colors">
            Proceed to Checkout
            </Link>
        </div>
    )
}

export default Cart;