import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

async function verifyJWT(req, res, next) {
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
  //const token = req.header('Authorization');
  console.log("request: ", req);
  console.log("path route", req.route.path);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized request md' });
  }
  // if(req.path == "./"){
  //   user.role ? "access":"debide"
  // }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //'your_secret_key'
    const user = await User.findById(decoded?._id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Invalid access token" })
    }

    req.user = user;
    //['Client','Service Provider','Admin']
    /*
    // Check role-based access control for each route
    if (req.path.startsWith('/api/users')) {
      // Assuming 'role' field exists in the user document
      if (user.role !== "client" && user.role !== "service provider") {
        return res.status(403).json({ error: 'Forbidden' });
      }
    }
    */
  //   const params = req.params
  //   console.log(params);
  //   console.log("user: ", user);
  //   console.log("userpath: ", req.path);
  //   if (req.path === "/" && ((user.role == "Service Provider") || (user.role == "Admin"))) {
  //     console.log("inside users/;userid");
  //     next();
  //   }
  //   else if (req.path == `/${params.userId}`) {
  //     const method = req.method;
  //     console.log(method);
  //     if (method === "PUT") {
  //       next()
  //     } else if (method === "DELETE" && ((user.role == "Service Provider") || (user.role == "Admin"))) {
  //       next()
  //     }
  //     else if (method === "GET" && (user.role == "Service Provider") || (user.role == "Admin")) {
  //       next();
  //     }
  //     else {
  //       // return res.status(401).json({ error: 'Access Denied' });
  //       next();
  //     }
  //   }

  //   else if (req.path == `/profile/${params.userId}` && ((user.role == "Service Provider") || (user.role == "Admin"))) {
  //     console.log("inside users/;userid", req.path, " : ", `/${params.userId}`);
  //     next();
  //   }
  //   else {// if(req.path === "/users/")
  //     console.log("access denied");
  //     return res.status(401).json({ error: 'Access Denied' });
  //   }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid access token' });
  }
}

const getTokenObject = (req)=> {
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded;
}
export { verifyJWT , getTokenObject};
