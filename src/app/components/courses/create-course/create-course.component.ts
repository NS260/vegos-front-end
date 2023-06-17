import {Component} from '@angular/core';
import {Course} from "../../../models/courses/Course";
import {CoursesService} from "../../../services/courses.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {CourseDetails} from "../../../models/courses/details/CourseDetails";
import {CourseFeatures} from "../../../models/courses/details/CourseFeatures";
import {Mentor} from "../../../models/Mentor";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  course: Course = new Course();
  mentor: Mentor = new Mentor();

  courseInfoGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(10)]],
    category: ['', Validators.required],
    photoURL: new FormControl('', [Validators.required,
      Validators.pattern("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})")]),
    shortDesc: ['', [Validators.required, Validators.minLength(10)]],
    language: ['', Validators.required],
    ageGroup: ['', Validators.required],
    length: ['', [Validators.required, Validators.minLength(5)]],
  });
  courseDetailsGroup = this.fb.group({
    infoGroup: this.fb.group({
      desc: ['', [Validators.required, Validators.minLength(25)]],
      welcomeVideo: ['', [Validators.required, Validators.pattern("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})")]]
    }),
    optionsGroup: this.fb.group({
      hasDemoLesson: ['', Validators.required],
      hasGroupLesson: ['', Validators.required],
      hasIndividualLesson: ['', Validators.required],
      hasDayLesson: ['', Validators.required],
      hasNightLesson: ['', Validators.required],
      isActive: ['', Validators.required]
    })
  })

  constructor(private service: CoursesService, private router: Router, private fb: FormBuilder) {
  }

  onSubmit(): void {
    this.setValues();
    this.saveCourse();
  }

  saveCourse(): void {
    console.log(this.course)
    this.service.createCourse(this.course).subscribe({
      next: () => {
        this.redirectToCoursesPage();
      }, error: (err) => {
        console.error(err);
      }
    })
  }

  private redirectToCoursesPage() {
    this.router.navigate(['/courses']);
  }

  private setValues() {
    this.mentor.id = 17;
    this.course.mentor = this.mentor;
    this.course.rate = 1;
    this.course.name = this.courseInfoGroup.value.name;
    this.course.category = this.courseInfoGroup.value.category?.toUpperCase();
    this.course.length = this.courseInfoGroup.value.length;
    this.course.shortDescription = this.courseInfoGroup.value.shortDesc;
    this.course.image = this.courseInfoGroup.value.photoURL;
    this.course.language = this.courseInfoGroup.value.language;
    this.course.courseDetails = new CourseDetails();
    this.course.courseFeatures = new CourseFeatures();
    this.course.courseDetails.ageGroup = this.courseInfoGroup.value.ageGroup?.toUpperCase();
    this.course.courseDetails.description = this.courseDetailsGroup.value.infoGroup?.desc
    this.course.courseDetails.welcomeVideo = this.courseDetailsGroup.value.infoGroup?.welcomeVideo;
    this.course.courseFeatures.hasDayLesson = this.courseDetailsGroup.value.optionsGroup?.hasDayLesson;
    this.course.courseFeatures.hasDemoLesson = this.courseDetailsGroup.value.optionsGroup?.hasDemoLesson;
    this.course.courseFeatures.hasGroupLesson = this.courseDetailsGroup.value.optionsGroup?.hasGroupLesson;
    this.course.courseFeatures.hasNightLesson = this.courseDetailsGroup.value.optionsGroup?.hasNightLesson;
    this.course.courseFeatures.hasIndividualLesson = this.courseDetailsGroup.value.optionsGroup?.hasIndividualLesson;
    this.course.courseFeatures.locked = "true";
  }
}
