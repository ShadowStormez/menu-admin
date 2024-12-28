import axios from 'axios';

export const markOrdersAsCompleted = async (orderIds: string[]): Promise<void> => {
  try {
    const updatePromises = orderIds.map((id) =>
      axios.patch(`http://menyou-svc-gw.darkube.app/api/v1/orders/${id}`, {
        status: 'completed',
      })
    );

    await Promise.all(updatePromises);
    console.log('All orders marked as completed!');
  } catch (error) {
    console.error('Error marking orders as completed:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};
