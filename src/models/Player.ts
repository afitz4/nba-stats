import { Team } from "./Team";

export class Player {
    id!: number;
    firstName!: string;
    lastName!: string;
    position!: string;
    team!: Team;
    heightFeet: number | undefined;
    heightInches: number | undefined;
    weightPounds: number | undefined;

    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
}