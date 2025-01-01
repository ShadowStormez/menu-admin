import React from 'react';
import { Order as OrderType } from '../../types/orders';
import { OrderStyle } from './Order.style';
import { markOrdersAsCompleted } from '../../utils/patchOrders';

interface OrderProps {
  order: OrderType;
  onOrderComplete: (orderId: string) => void; // Callback to notify parent
}

const Order: React.FC<OrderProps> = ({ order, onOrderComplete }) => {
  const handleCompleteOrder = async () => {
    try {
      await markOrdersAsCompleted([order.id]); // Mark order as completed
      onOrderComplete(order.id); // Notify parent to remove order
    } catch (error) {
      console.error('Failed to complete order:', error);
    }
  };

  // Aggregate items within the order to handle duplicate IDs
  const aggregateItems = () => {
    const itemMap: { [key: string]: { name: string; count: number } } = {};

    order.items.forEach((item) => {
      if (itemMap[item.id]) {
        itemMap[item.id].count += 1;
      } else {
        itemMap[item.id] = { name: item.name, count: 1 };
      }
    });

    return Object.values(itemMap); // Convert map to array for rendering
  };

  const aggregatedItems = aggregateItems();

  return (
    <OrderStyle>
      <div className="order-container">
        <div className="order-details">
          <p><strong>سفارش‌ها: </strong></p>
          <ul>
            {aggregatedItems.map((item, index) => (
              <li key={index}>
                {item.name} <span style={{fontWeight:'bold'}}>{item.count}{'x'}</span>
              </li>
            ))}
          </ul>
          <p><strong>مجموع:</strong> {`${order.totalAmount.toFixed(2)} تومان`}</p>
          <p><strong>توضیحات:</strong> {order.specialRequests || 'ندارد'}</p>
        </div>
        <button
          className="complete-order-button"
          onClick={handleCompleteOrder}
        >
          تکمیل سفارش
        </button>
      </div>
    </OrderStyle>
  );
};

export default Order;
