import {Photo} from "../content/Photo";
import {Review} from "../review/Review";
import {Question} from "../question/Question";
import {CourseStructure} from "../structure/CourseStructure";
import {Class} from "../Class";

export class CourseDetails{
  welcomeVideo: any
  ageGroup!: string | null | undefined
  description: any
  photos!: Photo[]
  reviews!: Review[]
  question!: Question[]
  courseStructure!: CourseStructure
  classes!: Class[];
}
