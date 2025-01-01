import React, { useState } from 'react';
import { Order } from '../../types/orders';
import { TableStyle, OverlayStyle } from './Table.style';
import OrderComponent from '../Order/Order';
import { markOrdersAsCompleted } from '../../utils/patchOrders';
import { Item } from '../../types/orders';

interface TableProps {
  tableNumber: number;
  orders: Order[];
}

const Table: React.FC<TableProps> = ({ tableNumber, orders }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [activeOrders, setActiveOrders] = useState(orders);

  const handleOverlayToggle = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleCompleteOrders = async () => {
    try {
      const pendingOrderIds = activeOrders
        .filter((order) => order.status === 'pending')
        .map((order) => order.id);

      await markOrdersAsCompleted(pendingOrderIds);
      setIsVisible(false);
    } catch (error) {
      console.error('Failed to complete orders:', error);
    }
  };

  const handleOrderComplete = (orderId: string) => {
    setActiveOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  // Aggregate duplicate items within each order
  const aggregateItemsInOrder = (items: Item[]) => {
    const itemMap: { [key: string]: { name: string; count: number } } = {};

    items.forEach((item) => {
      if (itemMap[item.id]) {
        itemMap[item.id].count += 1;
      } else {
        itemMap[item.id] = { name: item.name, count: 1 };
      }
    });

    return Object.values(itemMap); // Convert map to array for rendering
  };

  // Flatten aggregated items from all orders
  const aggregatedItems = activeOrders.flatMap((order) =>
    aggregateItemsInOrder(order.items)
  );

  const totalAmount = activeOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  if (!isVisible) return null;

  return (
    <TableStyle>
      <div className="table">
        <div className="table-number-container">
          <div className="table-number">{tableNumber}</div>
        </div>
        <div className="orders">
          <div className="orders-grid">
            {activeOrders.map((order) => (
              <OrderComponent
                key={order.id}
                order={order}
                onOrderComplete={handleOrderComplete}
              />
            ))}
          </div>
          <button className="show-overlay-button" onClick={handleOverlayToggle}>
            نمایش خلاصه سفارش
          </button>
          {isOverlayVisible && (
            <OverlayStyle className="overlay">
              <h1 style={{ color: '#fff' }}>{`خلاصه سفارش های میز ${tableNumber}`}</h1>
              <div className="overlay-content">
                <div className="overlay-orders">
                  <p><strong>سفارش‌ها: </strong></p>
                  <ul>
                    {aggregatedItems.map((item, index) => (
                      <li key={index}>
                      {item.name} <span style={{fontWeight:'bold'}}>{item.count}{'x'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p><strong>جمع کل: </strong>{`${totalAmount.toFixed(2)} تومان`}</p>
              </div>
              <div className="overlay-buttons">
                <button
                  className="close-overlay-button"
                  onClick={handleOverlayToggle}
                >
                  بستن
                </button>
                <button
                  className="complete-button"
                  onClick={handleCompleteOrders}
                >
                  تکمیل همه
                </button>
              </div>
            </OverlayStyle>
          )}
        </div>
      </div>
    </TableStyle>
  );
};

export default Table;
