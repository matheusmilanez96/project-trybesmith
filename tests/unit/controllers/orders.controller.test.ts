import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderService from '../../../src/services/orders.service';
import orderController from '../../../src/controllers/orders.controller';
import orderMock from '../../../tests/mocks/order.mock';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('#list', function () {
    it('deve retornar a lista de pedidos', async function () {
      // Arrange
      req.body = orderMock.orderList
      sinon.stub(orderService, 'list').resolves({
        status: 'SUCCESSFUL',
        data: req.body
      });

      // Act
      await orderController.list(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(orderMock.orderList)
    });
    it('se houver algum erro', async function () {
      // Arrange
      sinon.stub(orderService, 'list').resolves({
        status: 'NOT_FOUND',
        data: { message: 'not found' }
      });

      // Act
      await orderController.list(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(404)
    });
  });
});
