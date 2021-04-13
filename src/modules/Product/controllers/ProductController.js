import Product from '../schema/Product';
import AppError from '../../../shared/errors/AppError';
class ProductController {
  async index(req, res) {
    try {
      let { skip, limit, name, categoryId } = req.query;

      if (!skip) skip = 0;
      if (!limit) limit = 10;

      const where = {};

      if (name) {
        where.name = name;
      }

      if (categoryId) {
        where.categoryId = categoryId;
      }

      let products = await Product.find(where).populate('category').skip(parseInt(skip)).limit(parseInt(limit));
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const { title, description, price, categoryId } = req.body;

      if (!title || !description || !price || !categoryId) {
        throw new AppError('Required fields not sent!', 400);
      }

      let product = await Product.create(req.body);
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }


  async update(req, res, next) {
    try {
      const data = req.body;
      const { _id } = data;
      let product = await Product.findByIdAndUpdate(_id, data, { new: true });
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.query;

      if (!_id) {
        throw new AppError('Required fields not sent!', 400);
      }

      await Product.findByIdAndDelete(id);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
