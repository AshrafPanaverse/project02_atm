#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
let myBalanace = 500000;
let sleep = (value, status) => {
    return new Promise((res) => {
        setTimeout(res, value);
    });
};
let logOut = async () => {
    const rainbowTitle = chalkAnimation.rainbow(`
                Logging out       
        `);
    await sleep(1000, true);
    rainbowTitle.stop();
    console.log(chalk.whiteBright.bold('          Thank you for using our services'));
};
async function welcome() {
    const waitingTitle = chalkAnimation.rainbow(` 
                            Preparing 
                         Please wait ....     
                         
                         








        `);
    await sleep(5000, false);
    waitingTitle.stop();
    const rainbowTitle = chalkAnimation.rainbow(`
                        Welcome to the ATM \n       
        `);
    await sleep(500, true);
    rainbowTitle.stop();
    console.log(chalk.hex('#FFA500').bold(`
    Please follow the instrctions to unlock our atm machine features like\n
    fund transfers, fund withdrawals, fund deposits and pay utility-bills \n
    Demo Credentials:\n User Id: 123123 \n Password: 1010
    `));
}
let showBalance = async () => {
    console.log(`Your current Balance Rs. ${myBalanace}`);
};
let withdrawAmount = async () => {
    let amount = await inquirer.prompt([
        {
            name: 'rs',
            type: 'number',
            message: 'Enter amount:'
        }
    ]);
    if ((amount.rs >= 500 && amount.rs <= 50000) && (amount.rs % 500 == 0)) {
        if (myBalanace > amount.rs) {
            console.log(`Take your money of Rs. ${amount.rs}`);
            myBalanace = myBalanace - amount.rs;
        }
        else {
            console.log(`Sorry! insufficient balance.`);
        }
        console.log(`Available balance Rs. ${myBalanace}`);
    }
    else {
        console.log(`Please enter amount between 500 to 50000 and should be multiple of 500`);
    }
};
let fastCash = async () => {
    let amount = await inquirer.prompt([
        {
            name: "rs",
            type: 'list',
            choices: [5000, 20000, 30000, 50000, 'Other Amount'],
            message: chalk.hex('#FFA500').bold(`\nPlease Choose transaction`)
        }
    ]);
    if (amount.rs != 'Other Amount') {
        if ((amount.rs >= 500 && amount.rs <= 50000) && (amount.rs % 500 == 0)) {
            if (myBalanace > amount.rs) {
                console.log(`Take your money of Rs. ${amount.rs}`);
                myBalanace = myBalanace - amount.rs;
            }
            else {
                console.log(`Sorry! insufficient balance.`);
            }
            console.log(`Available balance Rs. ${myBalanace}`);
        }
        else {
            console.log(`Please enter amount between 500 to 50000 and should be multiple of 500`);
        }
    }
    else
        (await withdrawAmount());
};
let services = async () => {
    let transaction = await inquirer.prompt([
        {
            name: "type",
            type: 'list',
            choices: [chalk.green.bold("Balance Inquiry"), chalk.blue.bold("Cash Withdrawal"), chalk.yellow.bold("Fast Cash"), chalk.red.bold("Exit")],
            message: chalk.hex('#FFA500').bold(`\nPlease Choose transaction`)
        }
    ]);
    switch (transaction.type) {
        case chalk.green.bold("Balance Inquiry"): {
            await showBalance();
            break;
        }
        case chalk.blue.bold("Cash Withdrawal"): {
            await withdrawAmount();
            break;
        }
        case chalk.yellow.bold("Fast Cash"): {
            await fastCash();
            break;
        }
        case chalk.red.bold("Exit"): {
            await logOut();
            break;
        }
        default: {
            //statements; 
            break;
        }
    }
    if (transaction.type != chalk.red.bold("Exit")) {
        let repeat = await inquirer.prompt([
            {
                name: "confirm",
                type: 'confirm',
                message: chalk.hex('#FFA500').bold(`\nDo you want another transaction? `)
            }
        ]);
        if (repeat.confirm) {
            await services();
        }
        else {
            await logOut();
        }
    }
};
//for transactions
let transaction = async () => {
    let account = await inquirer.prompt([
        {
            name: "type",
            type: 'list',
            choices: [chalk.green.bold("Current Account"), chalk.blue.bold("Saving Account"), chalk.red.bold("Exit")],
            message: chalk.hex('#FFA500').bold(`\nSelect your account type`)
        }
    ]);
    if (account.type === chalk.green.bold("Current Account") || account.type === chalk.blue.bold("Saving Account")) {
        await services();
    }
    else {
        await logOut();
    }
};
//function for user indentification
let logIn = async () => {
    let user = await inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter Your ID:"
        },
        {
            name: 'pin',
            type: 'password',
            mask: true,
            message: "Enter 4 Digit PIN:"
        }
    ]);
    if (user.id == "123123" && user.pin == "1010") {
        await transaction();
    }
    else {
        console.log("Invalid credentials!");
    }
};
await welcome();
await logIn();
