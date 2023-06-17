import {CourseDetails} from "./details/CourseDetails";
import {CourseFeatures} from "./details/CourseFeatures";
import {PriceDetails} from "./content/PriceDetails";
import {Mentor} from "../Mentor";

export class Course{
  id!: number
  name!: string | undefined | null
  courseDetails!: CourseDetails
  courseFeatures!: CourseFeatures
  mentor!: Mentor
  category!: string | null | undefined
  priceDetails!: PriceDetails[]
  shortDescription!: string | undefined | null
  length!: string | undefined | null
  rate!: number
  image!: string | undefined | null
  createDate: any
  language!: string | undefined | null
}
