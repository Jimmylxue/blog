// const fs = require("fs");
// const path = require("");

import { getMsg } from "./test";

console.log(getMsg()[0]);

export default {
  "/": getMsg(),
};

// const getDir = () => {
//   return new Promise((resolve, reject) => {
//     fs.readdir();
//   });
// };
