import ProductCard from "@/components/products/ProductCard";
import connectDB from "@/database/connectDB";
import Product, { productServerType } from "@/models/Product";

const page = async () => {
  await connectDB();
  const products: productType[] = await Product.find({})
    .lean()
    .then((items) => items as productType[]);

  if (products.length < 1) {
    return <p className="m-20 text-center">محصولی وجود ندارد...</p>;
  }

  return (
    <section className="flex w-full min-h-[500px] max-h-fit flex-wrap justify-center gap-x-5 gap-y-5 mt-40 p-5">
      {products.map((item: productType) => {
        return (
          <ProductCard
            key={item._id}
            product={{
              ...item,
              madeDate: new Date(item.madeDate).getFullYear().toString(),
              _id: item._id!.toString(),
            }}
          />
        );
      })}
    </section>
  );
};

export default page;
