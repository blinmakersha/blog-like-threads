const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.cookies.access_token;
      if (!token) {
        res.redirect("/auth");
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      const { roles: userRoles } = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        res.redirect("/auth");
        return res.status(403).json({ message: "У вас нет доступа" });
      }
      next();
    } catch (e) {
      console.log(e);
      res.redirect("/auth");
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
};
