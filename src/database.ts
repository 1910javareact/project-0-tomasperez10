import { User } from './models/user';
import { Reimbursement } from './models/reimbursement';

export let users: User[] = [{
    userId: 1,
    username: 'jbezos1',
    password: 'moneytalks$1',
    firstName: 'Jeffrey',
    lastName: 'Bezos',
    email: 'jeff.bezos@amazon.net',
    roles: [{
        roleId: 1,
        role: 'Admin',
    }]
},
{
    userId: 2,
    username: 'msakurai2',
    password: 'lorddedede',
    firstName: 'Masahiro',
    lastName: 'Sakurai',
    email: 'sakurai.sama@nintendo.net',
    roles: [{
        roleId: 2,
        role: 'Finance Manager',
    }]
},
{
    userId: 3,
    username: 'tomasperez10',
    password: 'password',
    firstName: 'Tomas',
    lastName: 'Perez',
    email: 'tomas.perez@revature.net',
    roles: [{
        roleId: 3,
        role: 'User',
    }]
}];

export let reimbursements: Reimbursement[] = [{
    reimbursementId: 1,
    author: 1,
    amount: 250.00,
    dateSubmitted: 24,
    dateResolved: 25,
    description: 'Relocation',
    resolver: 1,
    status: 1,
    type: 1
},
{
    reimbursementId: 2,
    author: 2,
    amount: 325.00,
    dateSubmitted: 24,
    dateResolved: 25,
    description: 'No reason, I just want free money',
    resolver: 1,
    status: 2,
    type: 2
},
{
    reimbursementId: 3,
    author: 3,
    amount: 33.45,
    dateSubmitted: 24,
    dateResolved: 25,
    description: 'Office Party',
    resolver: 1,
    status: 1,
    type: 3
}];