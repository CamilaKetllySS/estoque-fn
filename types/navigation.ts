export type AppStackParamList = {
  ProductList: undefined;
  EditProduct: {
    product: {
      _id: string;
      name: string;
      description: string;
      quantity: number;
      price: number;
      image: string;
    };
  };
  CreateProduct: undefined;
};