import {User} from "./user";
import {Part} from "./part";

export class Article {
  id!: number
  articleType!: string
  category!: string
  name!: string
  publishedDate?: string
  userComment!: string
  photoUrl!: string
  rate!: number
  user!: User
  parts!: Part[];
}
