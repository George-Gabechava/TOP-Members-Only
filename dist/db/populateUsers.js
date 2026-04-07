"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pool_1 = __importDefault(require("./pool"));
const somePeople = [
    {
        first_name: "John",
        last_name: "Doe",
        username: "johndoe",
        password: "password123",
        membership_status: true,
        admin_status: false,
    },
    {
        first_name: "Jane",
        last_name: "Smith",
        username: "janesmith",
        password: "securepass",
        membership_status: false,
        admin_status: false,
    },
];
async function populateUsers() {
    try {
        for (const item of somePeople) {
            await pool_1.default.query("INSERT INTO users (first_name, last_name, username, password, membership_status, admin_status) VALUES ($1, $2, $3, $4, $5, $6)", [
                item.first_name,
                item.last_name,
                item.username,
                item.password,
                item.membership_status,
                item.admin_status,
            ]);
        }
        console.log("users Database populated!");
    }
    catch (err) {
        console.error("Error populating:", err);
    }
    finally {
        pool_1.default.end();
    }
}
populateUsers();
//# sourceMappingURL=populateUsers.js.map