const fs = require("fs");
fs.writeFile(
  "./build/_redirects",
  "/* /index.html 200",
  () => {
      console.log('_redirects文件写入完成')
  }
);
