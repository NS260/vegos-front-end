import {User} from "../../user";

export class Answer{
  id!: number
  text!: string
  mentor!: User
  answeredDate!: string
}
