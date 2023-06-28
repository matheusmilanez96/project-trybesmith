import { expect } from 'chai';
import sinon from 'sinon';

import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import productsService from '../../../src/services/products.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('#create', function () {
    it('deve ser possível cadastrar um produto com sucesso', async function () {
      // Arrange
      const mockCreateReturn = ProductModel.build(productMock.validProductFromDB);
      sinon.stub(ProductModel, 'create')
        .resolves(mockCreateReturn);

      // Act
      const serviceResponse = await productsService.create(productMock.validProductFromDB);

      // Assert
      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.eq(productMock.validProductFromDB);

    });

    it('deve retornar um erro quando um nome não é enviado', async function () {
      // Arrange

      // Act
      const serviceResponse = await productsService.create(productMock.emptyNameProduct);

      // Assert
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "Name is required"});

    });
    it('deve retornar um erro quando um preço não é enviado', async function () {
      // Arrange

      // Act
      const serviceResponse = await productsService.create(productMock.emptyPriceProduct);

      // Assert
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "Price is required"});

    });
    it('deve retornar um erro quando um orderId é inválido', async function () {
      // Arrange

      // Act
      const serviceResponse = await productsService.create(productMock.invalidOrderIdProduct);

      // Assert
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "orderId is required"});

    });
  });
});
