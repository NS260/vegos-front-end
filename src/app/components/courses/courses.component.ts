import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/courses/Course";
import {CoursesService} from "../../services/courses.service";
import {Router} from "@angular/router";
import {Utils} from "../../utils/Utils";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private service: CoursesService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.service.getCourses().subscribe({
      next: (value: any) => {
        this.courses = value._embedded?.courseDTOes;
        this.courses.forEach((val) => {
          return val.category = Utils.mapStringToCorrectUserView(val.category);
        })
      }
    })
  }

  updateCourse(id: number) {
    this.router.navigate(['update-course', id]);
  }

  deleteCourse(id: number) {
    this.service.deleteCourseById(id).subscribe({
      next: () => this.getCourses()
    })
  }

  viewArticle(id: number) {
    this.router.navigate(['course-details',id]);
  }

  navigateToCreate() {
    this.router.navigate(['create-course']);
  }
}
