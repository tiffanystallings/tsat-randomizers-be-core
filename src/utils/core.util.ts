export class CoreUtils {
    constructor() {}

    rollDice (min: number, max: number, quantity: number): number[] {
        let rolls: number[] = [];

        const minRoll = Math.ceil(min);
        const maxRoll = Math.floor(max);

        for (let i: number = 0; i < quantity; i++) {
            // Randomize a roll
            let roll: number = Math.floor((Math.random() * maxRoll) + minRoll);

            // Re-roll duplicates
            while (rolls.length > 0 && rolls.indexOf(roll) !== -1) {
                roll = Math.floor((Math.random() * maxRoll) + minRoll);
            }

            rolls.push(roll);
        }

        return rolls;
    }
}