class Game {
    static getRandomNumber1to9() {
        return Math.floor(Math.random() * 9) + 1;
    }

    static getRandomNumber1to5() {
        return Math.floor(Math.random() * 5) + 1;
    }

    static getRandomNumber1to2() {
        return Math.floor(Math.random() * 2) + 1;
    }

    static getRandomNumber1to3() {
        return Math.floor(Math.random() * 3) + 1;
    }

    static introduction() {
        displayMessage(`
            Welcome to Bunny Wars!

            (\\__/)
            (. ,, .)
            (0      0)
            O------O

            You are on an adventure as the solo Bunny Hero! Solve six challenging math levels to defeat the Evil Bunny Master's minions and face off against the ultimate EVIL BUNNY BOSS to save the world!
            NOTICE: You may purchase new unique weapons and gear from the shop to increase offensive and defensive stats.
        `);
    }

    static async menu() {
        const choice = await getPlayerInput(`
            (\\__/)
            Main Menu Options
            ------------------------
            | 1) Fight             |
            |                      |
            | 2) Shop              |
            |                      |
            | 3) Exit Game         |
            ------------------------
            Please enter your choice:
        `);
        return parseInt(choice, 10); // Convert the input to a number
    }

    static generateQuestion(level) {
        const a = Game.getRandomNumber1to9();
        const b = Game.getRandomNumber1to9();
        const c = Game.getRandomNumber1to3();

        switch (level) {
            case "level1":
                const choice1 = Game.getRandomNumber1to5();
                switch (choice1) {
                    case 1: return `${a} + ${b}`;
                    case 2: return `${a} - ${b}`;
                    case 3: return `${a} - ${b} - ${c}`;
                    case 4: return `${a} - ${b} + ${c}`;
                    default: return `${a} + ${b} + ${c}`;
                }
            case "level2":
                const choice2 = Game.getRandomNumber1to2();
                switch (choice2) {
                    case 1: return `${a} * ${b}`;
                    case 2: return `${a} * ${b} * ${c}`;
                    default: throw new Error("Invalid operation in Level 2");
                }
            case "level3":
                const exponent = Game.getRandomNumber1to3();
                return `${a}^${exponent}`;
            case "boss":
                const choiceBoss = Game.getRandomNumber1to3();
                let tempA = a, tempB = b;
                if (tempA < tempB) [tempA, tempB] = [tempB, tempA];
                switch (choiceBoss) {
                    case 1: return `(${tempA} + ${tempB}) ^ ${c}`;
                    case 2: return `(${tempA} * ${tempB}) - ${c} + ${tempA}`;
                    case 3: return `(${tempA} - ${tempB}) ^ ${c}`;
                    default: throw new Error("Invalid operation in Boss Level");
                }
            default: throw new Error("Invalid level: " + level);
        }
    }

    static evaluateQuestion(question) {
        question = question.replaceAll("\\s+", "");
        if (question.includes("(")) {
            while (question.includes("(")) {
                const startIdx = question.lastIndexOf("(");
                const endIdx = question.indexOf(")", startIdx);
                const subExpression = question.substring(startIdx + 1, endIdx);
                const subResult = Game.evaluateSubExpression(subExpression);
                question = question.substring(0, startIdx) + subResult + question.substring(endIdx + 1);
            }
        }
        return Game.evaluateSubExpression(question);
    }

    static evaluateSubExpression(expression) {
        const parts = expression.split(/(?=[-+*/^])|(?<=[-+*/^])/);
        let result = parseInt(parts[0], 10);
        for (let i = 1; i < parts.length; i += 2) {
            const operator = parts[i];
            const nextTerm = parseInt(parts[i + 1], 10);
            switch (operator) {
                case "+": result += nextTerm; break;
                case "-": result -= nextTerm; break;
                case "^": result = Math.pow(result, nextTerm); break;
                case "*": result *= nextTerm; break; 
                default: throw new Error("Invalid operator: " + operator);
            }
        }
        return result;
    }

    static calculateDamage(level, shieldProtection) {
        const baseDamage = {
            "level1": 30,
            "level2": 30,
            "level3": 30,
            "boss": 50
        }[level] || 0;
        return Math.max(baseDamage - shieldProtection, 0);
    }
}