import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/slices/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) return <p className="px-8 py-10">Loading...</p>;
  if (error) return <p className="px-8 py-10">Failed to load orders.</p>;

  if (orders.length === 0) {
    return (
      <div className="px-8 py-16 text-center">
        <p className="font-serif text-2xl text-primary mb-4">No orders yet</p>
        <Link to="/" className="text-accent hover:underline text-sm">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="px-8 py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-3xl text-primary mb-8">Your Orders</h1>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order._id} className="border border-primary/10 p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-sans text-xs text-primary/60">Order #{order._id.slice(-8)}</p>
                <p className="font-sans text-xs text-primary/60">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <span className="font-sans text-xs px-3 py-1 bg-secondary border border-primary/20 uppercase">
                {order.status}
              </span>
            </div>

            <div className="flex flex-col gap-2 border-t border-primary/10 pt-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm text-primary">
                  <span>{item.name} ({item.size}) × {item.quantity}</span>
                  <span>${(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-semibold text-primary mt-3 pt-3 border-t border-primary/10">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;