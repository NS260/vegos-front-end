import {Component, OnInit} from '@angular/core';
import {Course} from "../../../models/courses/Course";
import {Mentor} from "../../../models/Mentor";
import {PriceDetails} from "../../../models/courses/content/PriceDetails";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {CoursesService} from "../../../services/courses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseDetails} from "../../../models/courses/details/CourseDetails";
import {CourseFeatures} from "../../../models/courses/details/CourseFeatures";
import {Utils} from "../../../utils/Utils";
import {Class} from "../../../models/courses/Class";

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  id!: number;
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
    }),
    priceGroup: this.fb.group({
      prices: this.fb.array([])
    })
  })
  group = this.fb.group({
    classes: this.fb.array([])
  })

  constructor(private service: CoursesService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  onSubmit(): void {
    this.setValues();
    console.log(this.course);
    this.update();
  }

  update(): void {
    this.service.updateCourseById(this.id, this.course).subscribe({
      next: () => {
        this.redirectToCoursePage();
      }, error: (err) => {
        console.error(err);
      }
    })
  }

  private redirectToCoursePage() {
    this.router.navigate(['course-details/', this.id]);
  }

  private setValues() {
    this.course.id = this.id;
    this.mentor.id = 1;
    this.course.mentor = this.mentor;
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
    this.course.courseFeatures.hasDayLesson = Utils.changeOptionFeatureToBoolean(this.courseDetailsGroup.value.optionsGroup?.hasDayLesson);
    this.course.courseFeatures.hasDemoLesson = Utils.changeOptionFeatureToBoolean(this.courseDetailsGroup.value.optionsGroup?.hasDemoLesson);
    this.course.courseFeatures.hasGroupLesson = Utils.changeOptionFeatureToBoolean(this.courseDetailsGroup.value.optionsGroup?.hasGroupLesson);
    this.course.courseFeatures.hasNightLesson = Utils.changeOptionFeatureToBoolean(this.courseDetailsGroup.value.optionsGroup?.hasNightLesson);
    this.course.courseFeatures.hasIndividualLesson = Utils.changeOptionFeatureToBoolean(this.courseDetailsGroup.value.optionsGroup?.hasIndividualLesson);
    this.course.courseFeatures.locked = "true";
    for (const control of this.prices.controls) {
      this.course.priceDetails.push(new PriceDetails(control.get('classType')?.value, control.get('price')?.value))
    }
    console.log(this.course);
    for (const control of this.classes.controls) {
      this.course.courseDetails.classes.push(new Class(
        control.get('name')!.value,
        control.get('startDate')!.value,
        control.get('endDate')!.value,
        control.get('classType')!.value,
        control.get('size')!.value))
    }
  }

  get prices() {
    return this.courseDetailsGroup.controls["priceGroup"].controls["prices"] as FormArray;
  }

  addPrice() {
    this.prices.push(this.fb.group({
      classType: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    }));
  }

  deletePrice(id: number) {
    this.prices.removeAt(id);
  }

  get classes() {
    return this.group.controls["classes"] as FormArray;
  }

  addClass() {
    this.classes.push(this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      classType: ['', Validators.required],
      size: ['', Validators.required]
    }))
  }

  deleteClass(id: number) {
    this.classes.removeAt(id);
  }

  setArray() {
    const priceArray = this.courseDetailsGroup.controls["priceGroup"].get('prices') as FormArray;
    this.course.priceDetails.forEach(item => {
        priceArray.push(this.buildGroup(item))
      }
    );
  }

  private buildGroup(item: PriceDetails) {
    return this.fb.group({
      classType: item.classType,
      price: item.price
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getCourseById(this.id).subscribe({
      next: (val) => {
        this.course = val;
        this.courseInfoGroup.patchValue({name: val.name});
        this.courseInfoGroup.patchValue({category: Utils.mapStringToCorrectUserView(val.category)})
        this.courseInfoGroup.patchValue({photoURL: val.image})
        this.courseInfoGroup.patchValue({shortDesc: val.shortDescription})
        this.courseInfoGroup.patchValue({language: val.language})
        this.courseInfoGroup.patchValue({ageGroup: Utils.mapStringToCorrectUserView(val.courseDetails.ageGroup)})
        this.courseInfoGroup.patchValue({length: val.length})
        this.courseDetailsGroup.controls["infoGroup"].patchValue({desc: val.courseDetails.description})
        this.courseDetailsGroup.controls["infoGroup"].patchValue({welcomeVideo: val.courseDetails.welcomeVideo})
        this.courseDetailsGroup.controls["optionsGroup"].patchValue({hasDemoLesson: Utils.changeInputOptionFeature(val.courseFeatures.hasDemoLesson)})
        this.courseDetailsGroup.controls["optionsGroup"].patchValue({hasDayLesson: Utils.changeInputOptionFeature(val.courseFeatures.hasDayLesson)})
        this.courseDetailsGroup.controls["optionsGroup"].patchValue({hasNightLesson: Utils.changeInputOptionFeature(val.courseFeatures.hasNightLesson)})
        this.courseDetailsGroup.controls["optionsGroup"].patchValue({hasGroupLesson: Utils.changeInputOptionFeature(val.courseFeatures.hasGroupLesson)})
        this.courseDetailsGroup.controls["optionsGroup"].patchValue({hasIndividualLesson: Utils.changeInputOptionFeature(val.courseFeatures.hasIndividualLesson)})
        this.setArray();
      }
    })
  }
}
