import React, { useState } from 'react';
import { Order } from '../../types/orders';
import { TableStyle, OverlayStyle } from './Table.style';
import OrderComponent from '../Order/Order';
import { markOrdersAsCompleted } from '../../utils/patchOrders'; // Import the utility function

interface TableProps {
  tableNumber: number;
  orders: Order[];
}

const Table: React.FC<TableProps> = ({ tableNumber, orders }) => {
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const allItems = orders.flatMap((order) => order.items.map((item) => item));

  const handleCompleteOrders = async () => {
    try {
      // Get IDs of all pending orders
      const pendingOrderIds = orders
        .filter((order) => order.status === 'pending')
        .map((order) => order.id);

      // Call the utility function
      await markOrdersAsCompleted(pendingOrderIds);

      // If successful, hide the table
      setIsVisible(false);
    } catch (error) {
      console.error('Failed to complete orders:', error);
    }
  };

  if (!isVisible) return null; // Dismount component if not visible

  return (
    <TableStyle>
      <div className="table">
        <div className="table-number-container">
          <div className="table-number">{tableNumber}</div>
        </div>
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderComponent key={order.id} order={order} />
          ))}
          <OverlayStyle className="overlay">
            <h1 style={{ color: '#fff' }}>{`خلاصه سفارش های میز ${tableNumber}`}</h1>
            <div className="overlay-content">
              <div className="overlay-orders">
                <p><strong>سفارش ها : </strong></p>
                <ul>
                  {allItems.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </div>
              <p><strong>جمع کل : </strong>{`${totalAmount.toFixed(2)} تومان`}</p>
            </div>
            <button
              className="complete-button"
              onClick={handleCompleteOrders}
            >
              تکمیل سفارش
            </button>
          </OverlayStyle>
        </div>
      </div>
    </TableStyle>
  );
};

export default Table;
