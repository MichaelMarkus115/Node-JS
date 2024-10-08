"use strict";

const fs = require("fs");
const httpStatus = require("http-status-codes");
const contentTypes = require("./contentTypes");

module.exports = {
    getFile: (file, res) => {
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);//500
                res.end("There was an error serving content!");
            }
            res.end(data);
        });
    }
};
