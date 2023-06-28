import { Product } from '../../src/types/Product';

const emptyNameProduct: Product = {
  id: 6,
  name: "",
  price: "30 peças de ouro",
  orderId: 4,
}

const emptyPriceProduct: Product = {
  id: 6,
  name: "Martelo de Thor",
  price: "",
  orderId: 4,
}

const invalidOrderIdProduct: Product = {
  id: 6,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  orderId: -1,
}


const validProductFromDB: Product = {
  id: 6,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  orderId: 4,
}

export default {
  emptyNameProduct,
  emptyPriceProduct,
  invalidOrderIdProduct,
  validProductFromDB,
}