const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { create, getUserById, getUsers, updateUser, deleteUser, getUserByUsername } = require("./user.service");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        
        if (req.body.password) {
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
        }

        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(500).json({
                    success: 0,
                    message: "Unable to update"
                });
            }
            if (results.changedRows < 1) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    },
    login: (req, res)=>{
        const body = req.body;
        getUserByUsername(body.username, (err, results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.status(401).json({
                    success: 0,
                    message: "Invalid Matric Number (or Email)"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result){
                results.password = undefined;
                const jsontoken = sign({result: results}, process.env.JWT_KEY,{
                    expiresIn: "1h"
                }); 
                return res.status(200).json({
                    sucess: 1,
                    message: "Login successful",
                    token: jsontoken
                });
            }
            else{ 
                return res.status(401).json({
                    sucess: 0,
                    message: "Wrong Password"
                });

            }
        });
    },

}