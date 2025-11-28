exports.protect = (req, res, next) => {
  // TODO: Add JWT verification
  next();
};

exports.admin = (req, res, next) => {
  // TODO: Check if user is admin
  next();
};
