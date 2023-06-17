import {Component, OnInit} from '@angular/core';
import {Class} from "../../../models/courses/Class";
import {CoursesService} from "../../../services/courses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Student} from "../../../models/Student";

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  group!: Class;
  id!: number;
  data: Student[] = [];
  displayedColumns: string[] = ['id', 'name', 'surname', 'role', 'status', 'language'];

  constructor(private service: CoursesService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getClassById(5, this.id).subscribe({
      next: val => {
        this.group = val;
      }
    });
    this.service.getAllStudentsByClass(5, this.id).subscribe({
      next: val => {
        this.data = val;
      }
    })
    this.router.navigate(['class-detauls', this.id])
  }
}
