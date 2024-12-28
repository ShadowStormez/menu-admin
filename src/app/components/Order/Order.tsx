import React from 'react';
import { Order as OrderType } from '../../types/orders';
import { OrderStyle } from './Order.style';

interface OrderProps {
  order: OrderType;
}

const Order: React.FC<OrderProps> = ({ order }) => {
  return (
    <OrderStyle>
    <div key={order.id} className='order-container'>
      <p><strong>سفارش ها : </strong></p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
      <p><strong>مجموع :</strong> {`${order.totalAmount.toFixed(2)} تومان`}</p>
      <p><strong>توضیحات :</strong> {order.specialRequests || ''}</p>
    </div>
    </OrderStyle>
  );
};

export default Order;
