type UserType = {
  _id: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updateAt?: Date;
  bookmarks?: string[];
  orders?: orderType[];
};

type actionsResponse = {
  ok: boolean;
  message: string;
  user?: { email?: string; id?: string };
};

type orderType = {
  userId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: string;
  isPaid?: boolean;
  createdAt?: string;
};

type productType = {
  name: string;
  _id: string;
  image: string;
  companyName: string;
  madeDate: Date | string;
  price: string;
  description: string;
  option: string[];
  color: string;
  quantity: number;
};

type PrivateMessageType = {
  _id?: string;
  text: string;
  seen: boolean;
  createdAt?: any;
  from: string;
};

type SenderPrivateMessagesType = {
  senderId: string;
  destinationId: string;
  sentPrivateMessages: PrivateMessageType[];
};
