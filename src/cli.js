import {getUserById} from './UserRepository';
import { billUser } from './bill';

export function cli(args) {
  const operation = parseArguments(args);
  const store = require('./store.json')

  if (operation.type === 'bill') {
    const currentUser = getUserById(operation.userId)
    billUser(currentUser, operation.amount);
  }
}

function parseArguments(args) {
  args.splice(0, 2);
  const operation = {
    type: args[0]
  }

  args.forEach(arg => {
    if (arg.includes('--id')) {
      const userId = Number(args[args.indexOf(arg) + 1]);
      if (Number.isNaN(userId)) {
        throw new Error('Item after `id` must be a number');
      }
      operation.userId = userId;
    }
    if (arg.includes('--amount')) {
      const amount = Number(args[args.indexOf(arg) + 1]);
      if (Number.isNaN(amount)) {
        throw new Error('Item after `amount` must be a number');
      }
      operation.amount = amount;
    }
  });
  if (!(operation.hasOwnProperty('userId') && operation.hasOwnProperty('amount'))) {
    throw new Error('Must specify userId and amount via --id `id` and --amount `amount`')
  }
  return operation
}