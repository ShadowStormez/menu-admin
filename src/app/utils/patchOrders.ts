import axios from 'axios';

export const markOrdersAsCompleted = async (orderIds: string[]): Promise<void> => {
  try {
    const updatePromises = orderIds.map((id) =>
      axios.patch(
        `http://menyou-svc-gw.darkube.app/api/v1/orders/${id}/status`,
        {
          id: id, // ✅ Include the order ID in the request body
          status: "completed", // ✅ Updated to 'delivered' instead of 'completed'
          __meta: {} // ✅ Include meta data (empty object for now)
        },
        {
          withCredentials: true // ✅ Ensure credentials (cookies, tokens) are sent with the request
        }
      )
    );

    await Promise.all(updatePromises);
    console.log('All orders marked as delivered!');
  } catch (error) {
    console.error('Error marking orders as delivered:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};
