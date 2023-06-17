import {Rate} from "./Rate";
import {Student} from "../../Student";

export class Review {
  id!: number
  text!: string
  rates!: Rate[]
  student!: Student
}
