export type ItemType = {
  name: string;
  quantity: number;
  price: number;
};

export type DataType = {
  user: string;
  is_paid: boolean;
  items: ItemType[];
};

export  type ReceiptDataType = {
  title: string;
  manager_id: number;
  data: DataType[];
};