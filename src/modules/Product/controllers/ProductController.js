import Product from '../schema/Product';

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
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }

  async store(req, res) {
    try {
      const data = req.body;
      let product = await Product.create(data);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }

  async update(req, res) {
    try {
      const data = req.body;
      const { _id } = data;
      let product = await Product.findByIdAndUpdate(_id, data, { new: true });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.query;
      await Product.findByIdAndDelete(id);
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }
}

export default new ProductController();
