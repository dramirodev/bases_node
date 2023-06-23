const isAdmin = (req, res, next) => {
  const user = req.user;

  if(!user){
    return res.status(500).json({
      msg: 'Error en el usuario'
    })
  }

  if (user.role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: 'Not allowed'
    });
  }

  next();

};

module.exports = {isAdmin};
