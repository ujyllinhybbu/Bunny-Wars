class ScreenVisuals {
    static fightScreen1() {
        drawSprite("bunny_default", 200, 400, 100, 100);
        drawSprite("monster_lv1", 1000, 400, 100, 100);
    }

    static doesDamage1() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv1"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv1", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static takeDamage1() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv1"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv1", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static fightScreen2() {
        drawSprite("bunny_default", 200, 400, 100, 100);
        drawSprite("monster_lv2", 1000, 400, 100, 100);
    }

    static doesDamage2() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv2"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv2", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static takeDamage2() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv2"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv2", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static fightScreen3() {
        displayMessage(`
            |-----------------------------------------------------------------------------------|
            |                                                                                   |
            |                           Welcome to the Dungeon.                 (ROAR! )        |
            |                                                                      \\            |
            |   (\\__/)                                                          (\\__(\\          |
            |  (. ,, .) |                                                       (X == X)        |
            | (0      )0+                                                      -(      )-       |
            |  O------O                                                         O------O        |
            |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
            |-----------------------------------------------------------------------------------|
        `);
    }

    static doesDamage3() {
        displayMessage(`
            |-----------------------------------------------------------------------------------|
            |                                                                                   |
            |    (BOW BOW bow!)                                                 (AHHHH!)        |
            |       /                                                               \\           |
            |   (\\__/)                                                          (\\__(\\          |
            |  (. ,, .) |                                                       (X == X)        |
            | (0      )0+                                                      -(      )-       |
            |  O------O                                                         O------O        |
            |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
            |-----------------------------------------------------------------------------------|
        `);
    }

    static takeDamage3() {
        displayMessage(`
            |-----------------------------------------------------------------------------------|
            |                                                                                   |
            |      (ouch!)                                                          (muahahaha) |
            |        /                                                                \\         |
            |   (\\__/)                                                          (\\__(\\          |
            |  (- ,, -) |                                                       (X ,, X)        |
            | (0      )0+                                                       (O    O)        |
            |  O------O                                                         O------O        |
            |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
            |-----------------------------------------------------------------------------------|
        `);
    }

    static fightScreenBoss() {
        displayMessage(`
            |-----------------------------------------------------------------------------------|
            |                                                                                   |
            |                           Welcome to the THE BOSS.                (grrr..)        |
            |                                                                  |   \\            |
            |   (\\__/)                                                        | (\\__(\\          |
            |  (. ,, .) |                                                      |(X ,, X)        |
            | (0      )0+                                                      +(O    O)        |
            |  O------O                                                         O------O        |
            |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
            |-----------------------------------------------------------------------------------|
        `);
    }

    static doesDamageBoss() {
        displayMessage(`
            |-----------------------------------------------------------------------------------|
            |                                                                                   |
            |    (BOW BOW BOW!)                                                 (YOOOW!)        |
            |       /                                                          |    \\           |
            |   (\\__/)                                                        | (\\__(\\          |
            |  (. ,, .) |                                                      |(X ,, X)        |
            | (0      )0+                                                      +(O    O)        |
            |  O------O                                                         O------O        |
            |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
            |-----------------------------------------------------------------------------------|
        `);
    }

    static takeDamageBoss() {
        displayMessage(`
            |-----------------------------------------------------------------------------------|
            |                                                                                   |
            |      (ouch!)                                                          (heh..)     |
            |        /                                                         |      \\         |
            |   (\\__/)                                                        | (\\__(\\          |
            |  (- ,, -) |                                                      |(X ,, X)        |
            | (0      )0+                                                      +(O    O)        |
            |  O------O                                                         O------O        |
            |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
            |-----------------------------------------------------------------------------------|
        `);
    }

    static winBossBattleScreen() {
        displayMessage(`
            |-----------------------------------------------------------------------------------|
            |                                                                                   |
            |                          YOU HAVE DEFEATED THE BOSS BUNNY!                        |
            |                      The dungeon falls silent... for now.                         |
            |                                                                                   |
            |   (\\__/)                                                       |   (x_x)          |
            |  (^ ,, ^)               "Victory is ours!"                   | (   X   )          |
            | (  -   - )                                                   +0(       O)         |
            |  O------O                                                     O------O            |
            |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
            |-----------------------------------------------------------------------------------|
        `);
    }

    static trainAndComeBackScreen() {
        displayMessage(`
            |-----------------------------------------------------------------------------------|
            |                                                                                   |
            |                        The Boss Bunny was too strong...                           |
            |                     Time to train and try again!                                  |
            |                                                                                   |
            |   (\\__/)                                                           (\\__(\\         |
            |  (- ,, -) |              "I’ll be back!"                          | (X ,, X)      |
            | (0      )0                                                    +0   (O    O)       |
            |  O------O                                                      O    O------O      |
            |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
            |-----------------------------------------------------------------------------------|
        `);
    }
}