import Category from '../schema/Category';

class CategoriesController {
  async index(res, req) {
    try {
      let categories = await Category.find();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }

  async store(res, req) {
    try {
      const data = req.body;
      let category = await Category.create(data);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }

  async update(res, req) {
    try {
      const data = req.body;
      let category = await Category.findByIdAndUpdate(data);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }

  async delete(res, req) {
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
