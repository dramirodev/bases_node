const {Category} = require('../models');

const CategoryExists = async (req, res, next) => {
  const {id} = req.params;

  if(!id){
    return res.status(500).json({
      msg: 'Error en el usuario'
    })
  }


  const category = await Category.findById(id).populate('user', 'name');

  if (!category) {
    return res.status(401).json({
      msg: 'Not allowed'
    });
  }

  next();
}


module.exports = {CategoryExists};
