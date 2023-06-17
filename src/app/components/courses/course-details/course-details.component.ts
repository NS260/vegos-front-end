import {Component, OnInit} from '@angular/core';
import {Course} from "../../../models/courses/Course";
import {CoursesService} from "../../../services/courses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Utils} from "../../../utils/Utils";
import {Student} from "../../../models/Student";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: Course = new Course();
  isClickedDown = false;
  isClickedUp = false;
  oldRate!: number;
  id!: number;

  constructor(private service: CoursesService, private router: Router, private route: ActivatedRoute) {
  }

  up() {
    this.course.rate += 1;
    this.setOnClick();
    console.log(this.course);
    this.service.updateCourseById(this.id, this.course).subscribe({
      next: (val) => {
        this.click();
        this.setUserViews(val);
        this.router.navigate(['course-details', this.id]);
      }
    })
  }

  down() {
    this.course.rate -= 1;
    this.setOnClick();
    console.log(this.course);
    this.service.updateCourseById(this.id, this.course).subscribe({
      next: (val) => {
        this.click();
        this.setUserViews(val);
        this.router.navigate(['course-details', this.id]);
      }
    })
  }

  click() {
    let current = this.course.rate;
    if (this.oldRate === current) {
      this.isClickedUp = false;
      this.isClickedDown = false;
    } else if (this.oldRate < current) {
      this.isClickedUp = true;
    } else if (this.oldRate > current) {
      this.isClickedDown = true;
    }
  }

  setOnClick(): void {
    this.course.category = this.course.category?.toUpperCase();
    this.course.courseDetails.ageGroup = this.course.courseDetails.ageGroup?.toUpperCase();
    this.course.courseFeatures.hasIndividualLesson = Utils.changeOptionFeatureToBoolean(this.course.courseFeatures.hasIndividualLesson);
    this.course.courseFeatures.hasGroupLesson = Utils.changeOptionFeatureToBoolean(this.course.courseFeatures.hasGroupLesson);
    this.course.courseFeatures.hasNightLesson = Utils.changeOptionFeatureToBoolean(this.course.courseFeatures.hasNightLesson);
    this.course.courseFeatures.hasDayLesson = Utils.changeOptionFeatureToBoolean(this.course.courseFeatures.hasDayLesson);
    this.course.courseFeatures.hasDemoLesson = Utils.changeOptionFeatureToBoolean(this.course.courseFeatures.hasDemoLesson);
    this.course.priceDetails.forEach(val => val.classType = val.classType?.toUpperCase());
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getCourseById(this.id).subscribe({
      next: val => {
        this.course = val;
        this.oldRate = val.rate;
        this.setUserViews(val);
      }
    });
  }

  setUserViews(val: Course): void {
    this.course.category = Utils.mapStringToCorrectUserView(val.category);
    this.course.courseDetails.ageGroup = Utils.mapStringToCorrectUserView(val.courseDetails.ageGroup);
    this.course.priceDetails.forEach(v => v.classType = Utils.mapStringToCorrectUserView(v.classType));
    this.course.courseFeatures.hasDayLesson = Utils.changeOutputOptionFeature(val.courseFeatures.hasDayLesson);
    this.course.courseFeatures.hasIndividualLesson = Utils.changeOutputOptionFeature(val.courseFeatures.hasIndividualLesson);
    this.course.courseFeatures.hasDemoLesson = Utils.changeOutputOptionFeature(val.courseFeatures.hasDemoLesson);
    this.course.courseFeatures.hasGroupLesson = Utils.changeOutputOptionFeature(val.courseFeatures.hasGroupLesson);
    this.course.courseFeatures.hasNightLesson = Utils.changeOutputOptionFeature(val.courseFeatures.hasNightLesson);
  }

  isPricesEmpty(): boolean {
    return this.course.priceDetails.length !== 0;
  }

  isStructureEmpty(): boolean {
    return this.course.courseDetails.courseStructure.structureThemes.length !== 0;
  }

  isClassesEmpty(): boolean {
    return this.course.courseDetails.classes.length !== 0;
  }

  enrollToGroup(id: number) {
    const student: Student = new Student();
    student.id = 20;
    this.service.addStudentToClass(this.id, id, student).subscribe({
      next: value => {
        console.log(value)
      }
    });
    this.router.navigate(['class-details', id])
  }

  openQuestionForm() {
  }

  openReviewForm() {
  }

  showGroup(id: number) {
    this.router.navigate(['class-details', id]);
  }
}
