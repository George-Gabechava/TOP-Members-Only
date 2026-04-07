"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("./pool"));
pool_1.default
    .query("SELECT current_database()")
    .then((res) => {
    console.log("Connected to database:", res.rows[0].current_database);
    return pool_1.default.query("SELECT * FROM users LIMIT 1");
})
    .then(console.log)
    .catch(console.error);
//# sourceMappingURL=testDB.js.map