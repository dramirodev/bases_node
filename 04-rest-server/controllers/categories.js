const {Category} = require("../models");


const categoriesGet = async (req, res) => {

  const {limit = 5, from = 0} = req.query;

  const dbQuery = {state: true};

  const [total, categories] = await Promise.all([
    Category.countDocuments(dbQuery),
    Category.find(dbQuery).limit(Number(limit)).skip(Number(from)).populate('user', 'name'),
  ]);


  res.json({
    pagination: {
      limit,
      from,
      total,
    },
    categories
  });
};

const categoriesGetId = async (req, res) => {
  const {id} = req.params;
  const category = await Category.findById(id).populate('user', 'name');

  res.status(200).json({
    category
  });
};

const categoriesPost = async (req, res) => {
  const name = req.body.name.toUpperCase();
  const categorieDb = Category.findOne({name});
  if (categorieDb) {
    res.status(400).json({
      msg: `The category ${name} already exists`
    });
  }

  try {
    const data = {
      name,
      user: req.user._id
    };

    const category = new Category(data);
    await category.save();
    res.status(201).json(category);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: 'Error'
    });
  }
};

const categoriesPut = async (req, res) => {
  const {id} = req.params;
  const {state, user, ...data} = req.body;
  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const categoryUpdated = Category.findByIdAndUpdate(id, data);

  res.status(200).json({
    category: categoryUpdated
  });


};

const categoriesDelete = async (req, res) => {
  const id = req.params.id;

  const category = await Category.findByIdAndUpdate(id, {state: false});

  res.status(200).json({
    category
  });
};

module.exports = {
  categoriesGet,
  categoriesGetId,
  categoriesPost,
  categoriesPut,
  categoriesDelete
};
