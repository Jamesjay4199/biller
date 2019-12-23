import {updateUser} from './UserRepository';
import chalk from 'chalk';

export function billUser(user, amount) {
  if (canBillUser(user, amount)) {
    let balance = user.balance - amount

    updateUser(user.id, {
      balance: balance,
      canWithdraw: !(balance === 0)
    }).then(res => {
      console.log();
      console.log(chalk.greenBright(`Successfully billed ${user.name} ${amount}`));
      console.log(chalk.greenBright(`Amount left: ${balance}`));
    }).catch(err => {
      console.log(chalk.redBright(err));
    });
  } else {
    throw new Error(`Unable to bill ${currentUser.name}`)
  }
}

export function canBillUser(user, amount) {
  return (user.canWithdraw && user.balance >= amount);
}