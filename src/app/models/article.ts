import {User} from "./user";
import {Part} from "./part";

export class Article {
  id!: number
  articleType!: string
  category?: string
  name?: string | null
  publishedDate?: string
  userComment!: string | null | undefined
  photoUrl!: string | null | undefined
  rate!: number
  user!: User
  parts!: Part[];
}
