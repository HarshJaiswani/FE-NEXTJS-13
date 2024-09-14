import jwt from "jsonwebtoken";

const fetchUser = (handler) => (req, res) => {
  // use cookies to store and retrive jsonwebtoken
  // get the user from the jwt token and add id and name to req object
  const bearerToken = req.headers["Authorization"];
if (!bearerToken) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
  let token = null;

  // Finding token from header
  const match = bearerToken.match(/Bearer (.+)/);
  if (match) token = match[1];

  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    handler(req, res);
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

export default fetchUser;
