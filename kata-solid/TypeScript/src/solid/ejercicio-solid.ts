class Animal {

  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(animalType: string): string {
    switch (animalType) {
      case "cat":
        return "Meaw!";
      case "dog":
        return "Woof! Woof!";
      case "chicken":
        return "Cluck";
      case "duck":
        return "Quack";
      default:
        return "This is not an animal";
    }
  }

  flightDistance(animalType: string): number {
    switch (animalType) {
      case "cat":
        return 0;
      case "dog":
        return 0;
      case "chicken":
        return 0;
      case "duck":
        return 5000;
      default:
        return 0;
    }
  }

  getNumberOfTeeths(animalType: string): number {
    switch (animalType) {
      case "cat":
        return 24;
      case "dog":
        return 30;
      case "chicken":
        return 0;
      case "duck":
        return 0;
      default:
        return 0;
    }
  }

  getName(): string {
    return this.name;
  }
}

export function animalSound(animalName: string, type: string): void {
  const animal = new Animal(animalName);
  const sound = animal.makeSound(type);
  const name = animal.getName();

  console.log(`El sonido que hace ${name} es ${sound}`);
}

export function animalTeeths(animalName: string, type: string): void {
  const animal = new Animal(animalName);
  const totalTeeth = animal.getNumberOfTeeths(type);
  const name = animal.getName();

  console.log(`${name} tiene ${totalTeeth} dientes`);
}

export function animalflightDistance(animalName: string, type: string): void {
  const animal = new Animal(animalName);
  const flightMeters = animal.flightDistance(type);
  const name = animal.getName();

  console.log(`${name} puede volar ${flightMeters} metros`);
}
