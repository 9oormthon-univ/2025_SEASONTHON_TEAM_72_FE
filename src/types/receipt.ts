export type ItemType = {
  name: string;
  quantity: number;
  price: number;
};

export type DataType = {
  user: string;
  user_id: number;
  paid: boolean;
  items: ItemType[];
};

export type ReceiptDataType = {
  title: string;
  owner_id: number;
  settlement_id: number;
  data: DataType[];
};
