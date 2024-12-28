export interface Item {
    id: string;
    name: string;
  }
  
  export interface User {
    id: string;
  }
  
  export interface Order {
    user: User;
    tableNumber: number;
    totalAmount: number;
    items: Item[];
    status: string;
    paymentStatus?: string; // optional because it is not always present
    specialRequests: string;
    id: string;
  }
  
  export interface ApiResponse {
    status: boolean;
    data: Order[];
  }
  