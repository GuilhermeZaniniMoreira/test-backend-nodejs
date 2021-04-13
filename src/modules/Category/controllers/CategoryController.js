import Category from '../schema/Category';

class CategoriesController {
  async index(req, res) {
    try {
      let categories = await Category.find();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }

  async store(req, res) {
    try {
      const data = req.body;
      console.log(data);
      let category = await Category.create(data);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }

  async update(req, res) {
    try {
      const data = req.body;
      const { _id } = data;
      let product = await Product.findByIdAndUpdate(_id, data, { new: true });
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.query;
      let category = await Category.findByIdAndDelete(id);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }
}

export default new CategoriesController();
