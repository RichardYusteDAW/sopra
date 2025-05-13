import { Cat, Dog, Chicken, Duck, animalSound, animalTeeths, animalflightDistance } from "./solid/solid";


const salem = new Cat("Salem");
const sami = new Dog("Sami");
const little = new Chicken("Little");
const donald = new Duck("Donald");

animalSound(salem);
animalTeeths(sami);
//animalflightDistance(little);
animalflightDistance(donald);