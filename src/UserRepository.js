import * as fs from 'fs';

let users = require('./store.json');

export function getUserById(id) {
  let user = users.find(user => user.id === id);

  if (user) {
    return user;
  }
  throw new Error(`No user with id ${id}`);
}

export function updateUser(userId, {balance, canWithdraw}) {
  return new Promise( (resolve, reject) => {
    let user = getUserById(userId);
    user.balance = balance;
    user.canWithdraw = canWithdraw;

    fs.writeFile(`${__dirname}/store.json`, JSON.stringify(users), function(err) {
      if (err) {
        reject(err.message);
      } else {
        resolve();
      }
    });
  });
}