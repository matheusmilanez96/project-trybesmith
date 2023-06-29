import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productService from '../../../src/services/products.service';
import productController from '../../../src/controllers/products.controller';
import productMock from '../../../tests/mocks/product.mock';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('#list', function () {
    it('deve retornar a lista de produtos', async function () {
      // Arrange
      req.body = productMock.productList
      sinon.stub(productService, 'list').resolves({
        status: 'SUCCESSFUL',
        data: req.body
      });

      // Act
      await productController.list(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(productMock.productList)
    });
    it('se houver algum erro', async function () {
      // Arrange
      sinon.stub(productService, 'list').resolves({
        status: 'NOT_FOUND',
        data: { message: 'not found' }
      });

      // Act
      await productController.list(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(404)
    });
  });

  describe('#create', function () {
    it('deve salvar ao enviar dados válidos', async function () {
      // Arrange
      req.body = productMock.validProduct
      sinon.stub(productService, 'create').resolves({
        status: 'SUCCESSFUL',
        data: productMock.validProductFromDB
      });

      // Act
      await productController.create(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(201)
      expect(res.json).to.have.been.calledWith(productMock.validProductFromDB)
    });

    it('deve retornar um erro se enviar um nome inválido', async function () {
      // Arrange
      req.body = productMock.emptyNameProduct
      sinon.stub(productService, 'create').resolves({
        status: 'INVALID_DATA',
        data: { message: 'Name is required'}
      });

      // Act
      await productController.create(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(400)
      expect(res.json).to.have.been.calledWith({ message: 'Name is required' })
    });
  });
});
