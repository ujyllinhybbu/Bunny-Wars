class Dungeon {
    static hasEnteredDungeon = false;

    static async fightMenu(player) {
        if (!Dungeon.hasEnteredDungeon) {
            Dungeon.showDungeonEntrance();
            Dungeon.hasEnteredDungeon = true;
        }

        let levels = ` Dungeon Levels:\n1) Level 1: Addition & Subtraction
        `;
        if (player.getLevelsCompleted() >= 1) {
            levels += `\n2) Level 2: Multiplication`;
        }
        if (player.getLevelsCompleted() >= 2) {
            levels += `\n3) Level 3: Exponents\n`;
        }
        if (player.getLevelsCompleted() >= 3) {
            levels += `4) Boss Battle\n`;
        }
        levels += `\n5) Exit Dungeon`;

        const choice = await getPlayerInput(levels + "\nChoose a level: ");
        if (choice == 5) return;

        switch (choice) {
            case '1': await Dungeon.levelOne(player); break;
            case '2': 
                if (player.getLevelsCompleted() >= 1) {
                    await Dungeon.levelTwo(player);
                } else {
                    displayMessage("You need to complete Level 1 first!");
                }
                break;
            case '3': 
                if (player.getLevelsCompleted() >= 2) {
                    await Dungeon.levelThree(player);
                } else {
                    displayMessage("You need to complete Level 2 first!");
                }
                break;
            case '4': 
                if (player.getLevelsCompleted() >= 3) {
                    await Dungeon.bossBattle(player);
                } else {
                    displayMessage("You need to complete Level 3 first!");
                }
                break;
            default: displayMessage("Invalid choice.");
        }
    }

    static showDungeonEntrance() {
        displayMessage(`
            ===================================================
            WELCOME TO THE DUNGEON OF CHALLENGES
            Only the brave can conquer the monsters within!
            ===================================================
            Each level will test your math skills and bravery.
            Get ready for a battle of wits and survival!
        `);
    }

    static showLevelScreen(levelNumber, levelName) {
        displayMessage(`
            ---------------------------------------------------
            LEVEL ${levelNumber}: ${levelName}
            ---------------------------------------------------
            Prepare yourself for the next challenge!
        `);
    }

    static replenishHealth(player) {
        displayMessage(">> Your health has been fully replenished for this level!");
        player.setHealthBar(player.getMaxHealthBar());
    }

    static async levelOne(player) {
        Dungeon.showLevelScreen(1, "Addition & Subtraction");
        Dungeon.replenishHealth(player);
        await Dungeon.fightLevel(player, 50, "level1");
        
    }

    static async levelTwo(player) {
        Dungeon.showLevelScreen(2, "Multiplication");
        Dungeon.replenishHealth(player);
        await Dungeon.fightLevel(player, 100, "level2");
        
    }

    static async levelThree(player) {
        Dungeon.showLevelScreen(3, "Exponents");
        Dungeon.replenishHealth(player);
        await Dungeon.fightLevel(player, 150, "level3");
        
    }

    static async bossBattle(player) {
        Dungeon.showLevelScreen(4, "Boss Battle");
        Dungeon.replenishHealth(player);

        let bossHealth = 300;
        ScreenVisuals.fightScreenBoss();

        while (player.getHealthBar() > 0 && bossHealth > 0) {
            const question = Game.generateQuestion("boss");
            const playerAnswer = parseInt(await getPlayerInput(`Question: ${question}\nEnter answer: `), 10);

            const correctAnswer = Game.evaluateQuestion(question);
            if (playerAnswer === correctAnswer) {
                displayMessage(`Correct! You dealt ${player.getWeaponDamage()} damage!`);
                ScreenVisuals.doesDamageBoss();
                bossHealth -= player.getWeaponDamage();
            } else {
                displayMessage("Wrong! You took damage.");
                ScreenVisuals.takeDamageBoss();
                const damageTaken = Game.calculateDamage("boss", player.getShieldProtection());
                player.setHealthBar(player.getHealthBar() - damageTaken);
            }

            displayMessage(`
                -- Battle Status --
                Player HP: ${player.getHealthBar()}
                Boss HP: ${bossHealth}
                -------------------
            `);
        }

        if (player.getHealthBar() > 0 && bossHealth <= 0) {
            console.log("level completed!")
            displayMessage("Congratulations! You defeated the Boss Bunny!");
            player.incrementLevelsCompleted();
            player.setBudget(player.getBudget() + 200);
            ScreenVisuals.winBossBattleScreen();
            displayMessage(`
                ===============================================
                THANK YOU FOR PLAYING BUNNY WAR!
                The land is now safe, thanks to you!
                ===============================================
            `);
            return;
        } else {
            console.log("level not completed!")
            displayMessage("You were defeated by the Boss Bunny...");
            player.setBudget(player.getBudget() - 50);
            ScreenVisuals.trainAndComeBackScreen();
        }

        displayMessage(`Your current budget: ${player.getBudget()}`);
    }

    static async fightLevel(player, monsterHealth, level) {
        level = level.trim().toLowerCase();

        switch (level) {
            case "level1": ScreenVisuals.fightScreen1(); break;
            case "level2": ScreenVisuals.fightScreen2(); break;
            case "level3": ScreenVisuals.fightScreen3(); break;
            case "boss": ScreenVisuals.fightScreenBoss(); break;
            default: throw new Error("Invalid level: " + level);
        }

        while (player.getHealthBar() > 0 && monsterHealth > 0) {
            const question = Game.generateQuestion(level);
            const playerAnswer = parseInt(await getPlayerInput(`Question: ${question}\nEnter answer: `), 10);

            const correctAnswer = Game.evaluateQuestion(question);
            if (playerAnswer === correctAnswer) {
                displayMessage(`Correct! You dealt ${player.getWeaponDamage()} damage!`);
                switch (level) {
                    case "level1": ScreenVisuals.doesDamage1(); break;
                    case "level2": ScreenVisuals.doesDamage2(); break;
                    case "level3": ScreenVisuals.doesDamage3(); break;
                    case "boss": ScreenVisuals.doesDamageBoss(); break;
                    default: throw new Error("Invalid level: " + level);
                }
                monsterHealth = monsterHealth - player.getWeaponDamage();
            } else {
                displayMessage("Wrong! You took damage.");
                switch (level) {
                    case "level1": ScreenVisuals.takeDamage1(); break;
                    case "level2": ScreenVisuals.takeDamage2(); break;
                    case "level3": ScreenVisuals.takeDamage3(); break;
                    case "boss": ScreenVisuals.takeDamageBoss(); break;
                    default: throw new Error("Invalid level: " + level);
                }
                const damageTaken = Game.calculateDamage(level, player.getShieldProtection());
                player.setHealthBar(player.getHealthBar() - damageTaken);
            }

            displayMessage(`
                -- Battle Status --
                Player HP: ${player.getHealthBar()}
                Monster HP: ${monsterHealth}
                -------------------
            `);
        }

        if (player.getHealthBar() > 0 && monsterHealth <= 0) {
            if(parseInt(level.charAt(level.length - 1),10) - 1 == player.getLevelsCompleted()){
                player.incrementLevelsCompleted();
            }
            displayMessage("You defeated the monster!");
            console.log(player.getLevelsCompleted())
            player.setBudget(player.getBudget() + 50);
        } else {
            displayMessage("You were defeated...");
            player.setBudget(player.getBudget() - 20);
        }

        displayMessage(`Your current budget: ${player.getBudget()}`);
    }
}