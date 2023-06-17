import {Student} from "../Student";

export class Class {
  constructor(name: string | null, startDate: string | null, endDate: string | null, classType: string | null, size: number) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.classType = classType;
    this.size = size;
  }

  id!: number;
  name!: string | null;
  startDate!: string | null;
  endDate!: string | null;
  users!: Student[];
  classType!: string | null
  size!: number
}
