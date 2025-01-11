import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ApiResponse, Order } from '../types/orders';
import mockData from '../mockData/data.json';

export default function GetRestaurantOrders(restaurantId: string | null) {
  const [restaurantOrders, setRestaurantOrders] = useState<Order[] | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const fetchRestaurantOrders = async () => {
      try {
        if (!restaurantId) {
          // Fallback to mock data for pending orders
          const pendingOrders = (mockData.data as Order[]).filter(order => order.status === 'pending');
          setRestaurantOrders(pendingOrders);
          return;
        }

        const response = await axios.get<ApiResponse>(
          `http://menyou-svc-gw.darkube.app/api/v1/restaurant-orders/restaurant/${restaurantId}/orders`,
          {
            withCredentials: true // ✅ Include credentials (cookies, authentication headers)
          }
        );

        // Filter only 'pending' orders
        const pendingOrders = response.data.data.filter(order => order.status === 'pending');
        setRestaurantOrders(pendingOrders);
      } catch (error) {
        console.error('Error fetching orders', error);
        // Fallback to mock data if API call fails
        const pendingOrders = (mockData.data as Order[]).filter(order => order.status === 'pending');
        setRestaurantOrders(pendingOrders);
      }
    };

    // Initial fetch
    fetchRestaurantOrders();

    // Set interval for polling
    intervalId = setInterval(fetchRestaurantOrders, 10000); // Poll every 10 seconds

    return () => {
      // Cleanup interval on unmount
      if (intervalId) clearInterval(intervalId);
    };
  }, [dispatch, restaurantId]);

  return { restaurantOrders };
}
