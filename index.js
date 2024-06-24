#! usr/bin/env node
import inquirer from "inquirer";
// Game Variables
let enemies = ["Skeleton", "Zombie", "Warrior"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
// Player Variables
let health = 100;
let attackDamage = 50;
let healthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; // percent
let running = true;
console.log("-".repeat(50));
console.log("\tWELCOME TO THE DUNGEON!");
GAME: while (running) {
    console.log("-".repeat(50));
    // select enemy randomly from enemies array
    let enemy = enemies[getRandom(enemies.length)];
    // enemy health is randomly selected between 20 and 75
    let enemyHealth = getRandom(maxEnemyHealth) + 20;
    console.log(`\t# ${enemy} appeared! #\n`);
    while (enemyHealth > 0) {
        console.log(`\tYour HP : ${health}`);
        console.log(`\t${enemy}'s HP : ${enemyHealth}`);
        let answer = await inquirer.prompt([
            {
                type: "list",
                name: "option",
                choices: [`1. Attack`, `2. Drink Health Potion`, `3. Run!`],
                message: `\nWhat would you like to do?`,
            },
        ]);
        switch (answer.option) {
            case `1. Attack`:
                let damageDealt = getRandom(attackDamage);
                let damageTaken = getRandom(enemyAttackDamage);
                health -= damageTaken;
                enemyHealth -= damageDealt;
                console.log(`\n\t> You strike the ${enemy} for ${damageDealt} damage`);
                console.log(`\t> You recieve ${damageTaken} in retaliation!`);
                if (health < 1) {
                    console.log("\t> You have taken too much damage, you are too weak to go on!");
                    break;
                }
                break;
            case `2. Drink Health Potion`:
                if (healthPotions > 0) {
                    health += healthPotionHealAmount;
                    healthPotions--;
                    console.log(`\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}. \n\tYou now have ${health} HP. \n\tYou have ${healthPotions} health potions left.`);
                }
                else {
                    console.log(`\tYou have no health potions left. Defeat enemies for a chance to get one!`);
                }
                break;
            case `3. Run!`:
                console.log(`\tYou run away from ${enemy}!`);
                continue GAME;
        }
        if (health < 1) {
            console.log("\nYou limp out of the dungeon, weak from battle.\n");
            break GAME;
        }
    }
    console.log("-".repeat(50));
    console.log(` # ${enemy} was defeated! # `);
    console.log(` # You have ${health} HP left. #`);
    if (getRandom(100) < healthPotionDropChance) {
        healthPotions++;
        console.log(` # The ${enemy} dropped a health potion! # `);
        console.log(` # You now have ${healthPotions} health potion(s) left. # `);
    }
    console.log("-".repeat(50));
    let answer = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            choices: ["1. Continue Fighting", "2. Exit Dungeon"],
            message: "What would you like to do now? ",
        },
    ]);
    if (answer.option === "1. Continue Fighting") {
        console.log("You continue on your adventure!");
    }
    else {
        console.log("You exit the dungeon, successful from your adventures!\n");
        break;
    }
}
console.log("#".repeat(50));
console.log("\t# THANKS FOR PLAYING #");
console.log("#".repeat(50));
// get a random number
function getRandom(num) {
    return Math.floor(Math.random() * num);
}
