class Dungeon {
    static hasEnteredDungeon = false;

    static async fightMenu(player) {
        if (!Dungeon.hasEnteredDungeon) {
            Dungeon.showDungeonEntrance();
            Dungeon.hasEnteredDungeon = true;
        }
        const dungeonMenuBox = document.getElementById('dungeonMenuBox');
        dungeonMenuBox.style.display = 'block';

        // 플레이어 레벨 클리어 상태 가져오기
        const levelCompleted = player.getLevelsCompleted();

        // 버튼 가져오기
        const level1Btn = document.getElementById("level1Btn");
        const level2Btn = document.getElementById("level2Btn");
        const level3Btn = document.getElementById("level3Btn");
        const bossBtn = document.getElementById("bossBtn");

        // 잠금 상태 설정
        level1Btn.disabled = false;
        level2Btn.disabled = levelCompleted < 1;
        level3Btn.disabled = levelCompleted < 2;
        bossBtn.disabled = levelCompleted < 3;

        // 잠금 스타일 적용
        level2Btn.innerText = levelCompleted < 1 ? "Level 2 🔒" : "Level 2";
        level3Btn.innerText = levelCompleted < 2 ? "Level 3 🔒" : "Level 3";
        bossBtn.innerText = levelCompleted < 3 ? "Boss Battle 🔒" : "Boss Battle";

        const choice = await new Promise(resolve => {
            level1Btn.onclick = () => resolve('1');
            level2Btn.onclick = () => level2Btn.disabled ? null : resolve('2');
            level3Btn.onclick = () => level3Btn.disabled ? null : resolve('3');
            bossBtn.onclick = () => bossBtn.disabled ? null : resolve('4');
            document.getElementById("exitDungeonBtn").onclick = () => resolve('5');
        });

        dungeonMenuBox.style.display = 'none';

        switch (choice) {
            case '1': await Dungeon.levelOne(player); break;
            case '2': await Dungeon.levelTwo(player); break;
            case '3': await Dungeon.levelThree(player); break;
            case '4': await Dungeon.bossBattle(player); break;
            case '5': return;
            default: displayMessage("Invalid choice.");
        }
    }

    static showDungeonEntrance() {
        typeMessage(`
            WELCOME TO THE DUNGEON OF CHALLENGES
            Only the brave can conquer the monsters within!

            Each level will test your math skills and bravery.
            Get ready for a battle of wits and survival!
        `);
    }

    static async showLevelScreen(levelNumber, levelName) {
        displayMessage(`
            --------------------------------------

            --------------------------------------
            `);
        await typeMessage(`

            LEVEL ${levelNumber}: ${levelName}
            `, 50, 50, 28, 5);
        const message = [`
            
            
            
            A strange tension fills the forest...
        `,
        `
            
            
            
            The air crackles with rising energy... Something powerful approaches.
        `,
    `
            
            
            
            Shadows twist around you... The dungeon whispers your name.
        `,
    `
            
            
            
            👑 All goes silent... The Evil Bunny Lord awaits your challenge.
        `];
        await typeMessage(message[levelNumber - 1], 50, 50, 28, 10);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const ctx = GraphicsManager.bgCtx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawBackground("bg_lv" + levelNumber);
        displayMessage(`
            --------------------------------------
            LEVEL ${levelNumber}: ${levelName}
            --------------------------------------
        `);
        if (levelNumber == 1){
            ScreenVisuals.fightScreen1();
        }
        else if (levelNumber == 2){
            ScreenVisuals.fightScreen2();
        }
        else if (levelNumber == 3){
            ScreenVisuals.fightScreen3();
        }
        else if (levelNumber == 4){
            ScreenVisuals.fightScreenBoss();
        }
    }
    static replenishHealth(player) {
        player.setHealthBar(player.getMaxHealthBar());
    }

    static async levelOne(player) {
        await GraphicsManager.loadSprite("bg_lv1", "./assets/bg_lv1.png");
        await GraphicsManager.loadSprite("monster_lv1", "./assets/monster_lv1.png");
        await GraphicsManager.drawBackground("bg_lv1");
        await Dungeon.showLevelScreen("1", "Addition & Subtraction");
        Dungeon.replenishHealth(player);
        await Dungeon.fightLevel(player, 50, "level1");
    }

    static async levelTwo(player) {
        await GraphicsManager.loadSprite("bg_lv2", "./assets/bg_lv2.png");
        await GraphicsManager.loadSprite("monster_lv2", "./assets/monster_lv2.png");
        await GraphicsManager.drawBackground("bg_lv2");
        await Dungeon.showLevelScreen(2, "Multiplication");
        Dungeon.replenishHealth(player);
        await Dungeon.fightLevel(player, 100, "level2");
    }

    static async levelThree(player) {
        await GraphicsManager.loadSprite("bg_lv3", "./assets/bg_lv3.png");
        await GraphicsManager.loadSprite("monster_lv3", "./assets/monster_lv3.png");
        await GraphicsManager.drawBackground("bg_lv3");
        await Dungeon.showLevelScreen(3, "Exponents");
        Dungeon.replenishHealth(player);
        await Dungeon.fightLevel(player, 150, "level3");
        
    }

    static async bossBattle(player) {
        await GraphicsManager.loadSprite("bg_lv4", "./assets/bg_lv4.png");
        await GraphicsManager.loadSprite("monster_lv4", "./assets/monster_lv4.png");
        await GraphicsManager.drawBackground("bg_lv4");
        await Dungeon.showLevelScreen(4, "Boss Battle");
        Dungeon.replenishHealth(player);
        await Dungeon.fightLevel(player, 250, "boss");
    }
        /*let bossHealth = 300;
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

        displayMessage(`Your current budget: ${player.getBudget()}`);*/
    

    static async fightLevel(player, monsterHealth, level) {
        level = level.trim().toLowerCase();

        switch (level) {
            case "level1": ScreenVisuals.fightScreen1(); break;
            case "level2": ScreenVisuals.fightScreen2(); break;
            case "level3": ScreenVisuals.fightScreen3(); break;
            case "boss": ScreenVisuals.fightScreenBoss(); break;
        }

        while (player.getHealthBar() > 0 && monsterHealth > 0) {
            displayMessage(`
            -- Battle Status --
            Player HP: ${player.getHealthBar()}
            Monster HP: ${monsterHealth}
            -------------------
            `, 50, 150);
            const question = Game.generateQuestion(level);
            const raw = await getPlayerInputWithTimeout(
                `Question: ${question}\nEnter answer: `, 
                10000  // 10초 제한
            );
            let playerAnswer;
            
            if (raw === null) {
                // 타임아웃
                displayMessage("⏰ Time's up! You took damage.");
                // 원하는 대미지 이펙트 호출
                switch (level) {
                    case "level1": ScreenVisuals.takeDamage1(); break;
                    case "level2": ScreenVisuals.takeDamage2(); break;
                    case "level3": ScreenVisuals.takeDamage3(); break;
                    case "boss":  ScreenVisuals.takeDamageBoss();  break;
                }
                const damageTaken = Game.calculateDamage(level, player.getShieldProtection());
                player.setHealthBar(player.getHealthBar() - damageTaken);
            } 
            else {
                // 한 번 submit으로 바로 처리하도록 변경 // CHANGED
                const playerAnswer = parseInt(raw, 10); // CHANGED
                const correctAnswer = Game.evaluateQuestion(question); // unchanged
                if (playerAnswer === correctAnswer) {
                    displayMessage(`✅ Correct! You dealt ${player.getWeaponDamage()} damage!`); // unchanged
                    switch (level) {
                        case 'level1': ScreenVisuals.doesDamage1(); break;
                        case 'level2': ScreenVisuals.doesDamage2(); break;
                        case 'level3': ScreenVisuals.doesDamage3(); break;
                        case 'boss':  ScreenVisuals.doesDamageBoss();  break;
                    }
                    monsterHealth -= player.getWeaponDamage(); // unchanged
                } else {
                    displayMessage("❌ Wrong! You took damage."); // unchanged
                    switch (level) {
                        case 'level1': ScreenVisuals.takeDamage1(); break;
                        case 'level2': ScreenVisuals.takeDamage2(); break;
                        case 'level3': ScreenVisuals.takeDamage3(); break;
                        case 'boss':  ScreenVisuals.takeDamageBoss();  break;
                    }
                    const damageTaken = Game.calculateDamage(level, player.getShieldProtection()); // unchanged
                    player.setHealthBar(player.getHealthBar() - damageTaken); // unchanged
                }
            }
        }
        document.getElementById('game-input').style.display = 'none';
        document.getElementById('submit-button').style.display = 'none';
        document.getElementById('timer-container').style.display = 'none';
        if (player.getHealthBar() > 0 && monsterHealth <= 0) {
            if(parseInt(level.charAt(level.length - 1),10) - 1 == player.getLevelsCompleted()){
                player.incrementLevelsCompleted();
            }
            displayMessage("You defeated the monster!");
            console.log(player.getLevelsCompleted())
            player.setBudget(player.getBudget() + 50);
        } 
        else {
            displayMessage("You were defeated...");
            player.setBudget(player.getBudget() - 20);
        }
        // display next line
        displayMessage(`Your current budget: ${player.getBudget()}`, 50, 150);
    }
}