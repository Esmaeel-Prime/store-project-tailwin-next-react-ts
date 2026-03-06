import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    madeDate: {
      type: Date,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    option: {
      type: [],
    },
    color: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = models?.Product || model("Product", ProductSchema);
export default Product;

export type productServerType = {
  name: string;
  _id: string;
  image: string;
  companyName: string;
  madeDate: Date;
  price: string;
  description: string;
  option: string[];
  color: string;
  quantity: number;
};
