

export class Frame {

    total: number = 0;
    rolls: [number, number] = [0, 0];
    pins: number = 10;
    strike: boolean = false;
    tries = 0;

    roll(pins: number): void {

        console.log("type: " + typeof pins);

        if(typeof pins === "string") {
            pins = parseInt(pins);
        } 

        this.rolls[this.tries++] = pins;
        this.pins -= pins;

        if(this.tries === 1 && pins === 10) {
            this.strike = true;
            this.tries = 2;   // bc strike, only allowed once try
        }
        console.log(JSON.stringify(this));
    }

    setTotal(score: number) {
        this.total = score;
    }

    getFrameTotalScore() {
        return this.total;
    }

    getRollTotalScore(): number {
        return this.rolls[0] + this.rolls[1];
    }

    isComplete(): boolean {
        return this.tries === 2;
    }

    isSpare(): boolean {
        return this.tries === 2 && this.pins === 0 && !this.strike;
    }

    isStrike(): boolean {
        return this.tries === 2 && this.pins === 0 && this.strike;
    }

}
