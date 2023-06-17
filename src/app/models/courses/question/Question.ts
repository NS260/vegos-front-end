import {Answer} from "./Answer";
import {Student} from "../../Student";

export class Question{
  id!: number
  text!: string
  askedDate!: string
  answer!: Answer
  student!: Student
}
