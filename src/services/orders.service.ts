import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { OrderReturn } from '../types/OrderReturn';

async function list(): Promise<ServiceResponse<OrderReturn[]>> {
  const orders = await OrderModel.findAll({
    include: {
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    },
  });

  const adjustedOrders = orders.map((order) => ({
    id: order.dataValues.id,
    userId: order.dataValues.userId,
    productIds: order.dataValues.productIds?.map((product) => product.id),
  }));
  
  return { status: 'SUCCESSFUL', data: adjustedOrders };
}
  
export default {
  list,
};