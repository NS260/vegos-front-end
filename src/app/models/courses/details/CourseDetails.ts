import {Photo} from "../content/Photo";
import {Review} from "../review/Review";
import {Question} from "../question/Question";
import {CourseStructure} from "../structure/CourseStructure";

export class CourseDetails{
  welcomeVideo!: string
  ageGroup!: string
  descriptio!: string
  photos!: Photo[]
  reviews!: Review[]
  question!: Question[]
  courseStructure!: CourseStructure
}
