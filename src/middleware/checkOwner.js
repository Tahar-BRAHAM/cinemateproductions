// // middleware/checkOwner.js
// require('dotenv').config();

// const checkOwner = (req, res, next) => {
//     const ownerKey = req.headers['x-owner-key'];
//     if (ownerKey && ownerKey === process.env.OWNER_SECRET_KEY) {
//         next();
//     } else {
//         res.status(403).json({ message: 'Forbidden' });
//     }
// };

// module.exports = checkOwner;
