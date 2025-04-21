class Game {
    static async introduction() {
        try {
            // 배경 로드 후 그리기
            await GraphicsManager.loadSprite('bg_intro', './assets/bg_intro.png');
            GraphicsManager.drawBackground('bg_intro'); // 배경 그리기

            // 스프라이트 로드 후 그리기
            await GraphicsManager.loadSprite('bunny_default', './assets/bunny_default.png');
            GraphicsManager.drawSprite('bunny_default', 50, 50, 100, 100); // 스프라이트 그리기

            // 텍스트 출력
            await typeMessage(`
                Welcome to Bunny Wars!

                You are on an adventure as the solo Bunny Hero!
                Solve six challenging math levels to defeat
                the Evil Bunny Master's minions and face off
                against the ultimate EVIL BUNNY BOSS to save the world!

                NOTICE: You may purchase new unique weapons
                and gear from the shop to increase offensive
                and defensive stats.

                Press Enter to continue...
            `);
            // 키 입력 대기
            await Game.waitForEnter();
        } catch (error) {
            console.error(error); // 로드 실패 시 에러 처리
        }
    }

    static waitForEnter() {
        return new Promise((resolve) => {
            const handleKeyPress = (event) => {
                if (event.key === "Enter") {
                    document.removeEventListener("keydown", handleKeyPress);
                    resolve();
                }
            };
            document.addEventListener("keydown", handleKeyPress);
        });
    }

    static async menu() {
        clearCanvas(); // 캔버스 초기화
        GraphicsManager.drawBackground('bg_intro'); // 메뉴 배경 그리기
        const menuBox = document.getElementById('menuBox');
        menuBox.style.display = 'block'; // 메뉴 박스 보이기
        
        // 버튼 클릭을 기다리는 Promise 반환
        const choice = await new Promise(resolve => {
            document.getElementById("startBtn").onclick = () => resolve(1);
            document.getElementById("shopBtn").onclick = () => resolve(2);
            document.getElementById("exitBtn").onclick = () => resolve(3);
        });

        menuBox.style.display = 'none';
        return choice;
    }

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
