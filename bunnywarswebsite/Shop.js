class Shop {
    static async shopMenu(player) {
        while (true) {
            const choice = await getPlayerInput(`
                (\\__/)
                Bunny Shop Menu
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                | 1) Buy Weapons           |
                |                          |
                | 2) Buy Shields           |
                |                          |
                | 3) Exit Shop             |
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                Please enter your choice:
            `);

            if (choice == 3) {
                displayMessage("Thank you for visiting the Bunny Shop! Come back soon!");
                break;
            }

            switch (choice) {
                case '1': await Shop.buyWeapon(player); break;
                case '2': await Shop.buyShield(player); break;
                default: displayMessage("Oops! That wasn't a valid choice. Please try again!");
            }
        }
    }

    static async buyWeapon(player) {
        const choice = await getPlayerInput(`
            (\\__/)
            Choose Your Weapon
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            | 1) Carved Bun Katana - 100 coins (+10 damage) |
            | 2) Carrot Slicer - 200 coins (+20 damage)     |
            | 3) Teeth Splitter - 300 coins (+30 damage)    |
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Which weapon will you choose?
        `);

        let cost = 0;
        let damageIncrease = 0;

        switch (choice) {
            case '1': cost = 100; damageIncrease = 10; break;
            case '2': cost = 200; damageIncrease = 20; break;
            case '3': cost = 300; damageIncrease = 30; break;
            default: displayMessage("Sorry, that weapon is not available. Please choose again!"); return;
        }

        if (player.getBudget() >= cost) {
            player.setBudget(player.getBudget() - cost);
            player.setWeaponDamage(player.getWeaponDamage() + damageIncrease);
            displayMessage("You purchased a new weapon! Go fight with bravery!");
        } else {
            displayMessage("Oops! You don't have enough coins! Maybe try saving up!");
        }
    }

    static async buyShield(player) {
        const choice = await getPlayerInput(`
            (\\__/)
            Choose Your Shield
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            | 1) Baneful Bun - 100 coins (+10 protection)     |
            | 2) Wall of Carrots - 200 coins (+20 protection) |
            | 3) Eternal Rabbit - 300 coins (+30 protection)  |
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Which shield will protect you?
        `);

        let cost = 0;
        let protectionIncrease = 0;

        switch (choice) {
            case '1': cost = 100; protectionIncrease = 10; break;
            case '2': cost = 200; protectionIncrease = 20; break;
            case '3': cost = 300; protectionIncrease = 30; break;
            default: displayMessage("Oops, that shield isn't available! Try again!"); return;
        }

        if (player.getBudget() >= cost) {
            player.setBudget(player.getBudget() - cost);
            player.setShieldProtection(player.getShieldProtection() + protectionIncrease);
            displayMessage("You now have a powerful shield to protect you!");
        } else {
            displayMessage("Not enough coins! Maybe next time!");
        }
    }
}