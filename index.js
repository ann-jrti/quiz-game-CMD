#!usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const waitTitle = (ms = 2200) => new Promise((r) => setTimeout(r, ms))
const checkingAnswer = (ms = 1000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('WELCOME TO THE FIVE UNNECESSARY\nBUT COOL KNOWLEDGE QUESTIONS QUIZ\n');
    await waitTitle();
    rainbowTitle.stop();
    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer.
    If you get any question wrong you loose and I will be ${chalk.bgRed('killed')}
    So you better get all the questions right!
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'How should I call you?',
        default() {
            return 'Player'
        },
    })
    if (answers.player_name.toLowerCase() === 'dani') playerName = 'love'
    else playerName = answers.player_name;
    console.log(`
    Hi ${playerName},
    let's start the game!`)
}

async function handleAnswer(correctAnswer) {
    const spinner = createSpinner('Checking answer...').start();
    await checkingAnswer();

    if (correctAnswer) {
        spinner.success({ text: `YES ${chalk.bgCyan(playerName)}! That's correct.\nLet's continue.` });
    } else {
        spinner.error({
            text: `💀 Game over ${playerName}.
        You loose, I die.` });
        process.exit(1);
    }
}

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !\n You win,\n I live :D`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        process.exit(0);
    });
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: `\n${chalk.bgBlue('QUESTION 1')}. What is the rarest M&M color?\n`,
        choices: [
            'Brown',
            'Yellow',
            'White',
        ],
    });

    return handleAnswer(answers.question_1 === 'Brown');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: `\n.${chalk.bgBlue('QUESTION 2')}. What is the softest mineral in the world?\n`,
        choices: ['Calcite', 'Gypsum', 'Talc', 'Fluorite'],
    });
    return handleAnswer(answers.question_2 === 'Talc');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `\n${chalk.bgBlue('QUESTION 3')}. What color is a polar bear’s skin?\n`,
        choices: ['Light grey', 'Black', 'Pink', 'White'],
    });

    return handleAnswer(answers.question_3 === 'Black');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: `\n${chalk.bgBlue('QUESTION 4')}. Who invented scissors?\n`,
        choices: [
            'Tim Burton',
            'Leonardo Da Vinci',
            'James Nasmyth',
        ],
    });
    return handleAnswer(answers.question_4 === 'Leonardo Da Vinci');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message:
            `\n${chalk.bgBlue('LAST QUESTION')}\nWhich fruit floats because 25% of its volume is air?`,
        choices: ['Apple', 'Coconut', 'Watermelon', 'Blueberry'],
    });

    return handleAnswer(answers.question_5 === 'Apple');
}


console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();

