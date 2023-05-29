import {User} from "../user";
import {CourseDetails} from "./details/CourseDetails";
import {CourseFeatures} from "./details/CourseFeatures";
import {PriceDetails} from "./content/PriceDetails";

export class Course{
  id!: number
  name!: string
  courseDetails!: CourseDetails
  courseFeatures!: CourseFeatures
  user!: User
  category!: string
  priceDetails!: PriceDetails[]
  shortDescription!: string
  length!: string
  rate!: number
  image!: string
  createDate: any
  language!: string
}
