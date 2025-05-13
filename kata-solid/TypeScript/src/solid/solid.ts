interface Animal {
    getName(): string;
    getSound(): string;
}

interface FlyingAnimal extends Animal {
    getFlightDistance(): number;
}

interface WithTeethAnimal extends Animal {
    getNumberOfTeeths(): number;
}

type SomeAnimal = Animal | FlyingAnimal | WithTeethAnimal;

export class Cat implements Animal, WithTeethAnimal {

    private name: string;
    private sound: string = "Meaw!";
    private numberOfTeeths: number = 24;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getSound(): string {
        return this.sound;
    }

    getNumberOfTeeths(): number {
        return this.numberOfTeeths;
    }
}

export class Dog implements Animal, WithTeethAnimal {

    private name: string;
    private sound: string = "Woof! Woof!";
    private numberOfTeeths: number = 30;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getSound(): string {
        return this.sound;
    }

    getNumberOfTeeths(): number {
        return this.numberOfTeeths;
    }
}

export class Chicken implements Animal {

    private name: string;
    private sound: string = "Cluck";

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getSound(): string {
        return this.sound;
    }
}

export class Duck implements Animal, FlyingAnimal {

    private name: string;
    private sound: string = "Quack";
    private flightDistance: number = 5000;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getSound(): string {
        return this.sound;
    }


    getFlightDistance(): number {
        return this.flightDistance;
    }
}

export function animalSound(animal: SomeAnimal): void {
    console.log(`${animal.getName()} says ${animal.getSound()}`);
}

export function animalTeeths(animal: WithTeethAnimal): void {
    console.log(`${animal.getName()} has ${animal.getNumberOfTeeths()} teeths`);
}

export function animalflightDistance(animal: FlyingAnimal): void {
    console.log(`${animal.getName()} can fly ${animal.getFlightDistance()} meters`);
}