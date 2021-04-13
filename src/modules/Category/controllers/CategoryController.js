import Category from '../schema/Category';
import AppError from '../../../shared/Errors/AppError';
class CategoriesController {
  async index(req, res) {
    try {
      let categories = await Category.find();
      return res.status(200).json(categories);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async store(req, res) {
    try {
      const { title } = req.body;

      if (!title) {
        throw new AppError('Required fields not sent!');
      }

      let category = await Category.create(req.body);
      return res.status(200).json(category);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async update(req, res) {
    try {
      const data = req.body;
      const { _id } = data;
      let category = await Product.findByIdAndUpdate(_id, data, { new: true });
      return res.status(200).json(category);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.query;
      let category = await Category.findByIdAndDelete(id);
      return res.status(200).json(category);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default new CategoriesController();
