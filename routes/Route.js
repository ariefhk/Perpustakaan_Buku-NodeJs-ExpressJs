// Route.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const accountRoutes = require("./Account.js");
router.use(accountRoutes);
const dataPath = "./account.json";
var path = require("path");
const dataAcc = path.resolve(__dirname, "account.json");

// util function
const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataAcc, stringifyData);
};

const getAccountData = () => {
  // const data = path.resolve(
  //   "C:UsersArXDocumentsMyGithubPerpustakaan_Buku-NodeJs-ExpressJs\routesaccount.json"
  // );
  const dataAcc2 = path.resolve(__dirname, "account.json");
  const jsonData = fs.readFileSync(dataAcc2);
  return JSON.parse(jsonData);
};

console.log("====================================");

// console.log("Current directory:", __dirname, "account.json");
console.log(getAccountData());
console.log("====================================");

// Create an Account
accountRoutes.post("/account/addaccount", (req, res) => {
  let existAccount = getAccountData();
  //  Math.floor(Math.random() * (max - min + 1) + min);
  const newAccountId = Math.floor(1000 + Math.random() * 9000);

  existAccount[newAccountId] = req.body;
  saveAccountData(existAccount);
  res.send({ succes: true, msg: "account added succesfully" });
});

// Read all account form json file
accountRoutes.get("/account/list", (req, res) => {
  const account = getAccountData();
  res.send(account);
});

// Update - use put
accountRoutes.put("/account/:id", (req, res) => {
  var existAccounts = getAccountData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const accountId = req.params["id"];
      existAccounts[accountId] = req.body;
      saveAccountData(existAccounts);
      res.send(`account with id ${accountId} has been updated`);
    },
    true
  );
});

// delete
accountRoutes.delete("/account/delete/:id", (req, res) => {
  fs.readFile(
    dataPath,
    "utf-8",
    (err, data) => {
      var existAccounts = getAccountData();
      const userId = req.params["id"];
      delete existAccounts[userId];
      saveAccountData(existAccounts);
      res.send(`account with id ${userId} has been deleted`);
    },
    true
  );
});

module.exports = router;
