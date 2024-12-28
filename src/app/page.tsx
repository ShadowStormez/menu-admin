'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { HomePageStyle } from "./page.style";
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantId } from './store/restaurantOrdersSlice';
import { RootState } from './store/store'; 
import { LinearProgress } from '@mui/material';
import GetRestaurantOrders from './utils/getOrders';
import Table from './components/Table/Table'; // Import the Table component
import { Order } from './types/orders';
import Header from './components/Header/Header';

function HomeSearch() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const restaurantId = searchParams.get('restaurantId');
    if (restaurantId) {
      dispatch(setRestaurantId(restaurantId));
    }
  }, [searchParams, dispatch]);

  return null;
}

export default function Home() {
  const restaurantId = useSelector((state: RootState) => state.restaurantOrders.restaurantId);
  const { restaurantOrders } = GetRestaurantOrders(restaurantId);
  const orders = restaurantOrders;

  // Group orders by table number
  const ordersByTable = orders?.reduce((acc: Record<number, Order[]>, order) => {
    acc[order.tableNumber] = acc[order.tableNumber] || [];
    acc[order.tableNumber].push(order);
    return acc;
  }, {});

  return (
    <Suspense fallback={<LinearProgress />}>
      <HomeSearch />
      <HomePageStyle>
        <Header />
        <div className="tables-wrapper">
          {ordersByTable ? (
            Object.entries(ordersByTable).map(([tableNumber, tableOrders]) => (
              <Table
                key={tableNumber}
                tableNumber={parseInt(tableNumber, 10)}
                orders={tableOrders as Order[]}
              />
            ))
          ) : (
            null
          )}
        </div>
      </HomePageStyle>
    </Suspense>
  );
}
