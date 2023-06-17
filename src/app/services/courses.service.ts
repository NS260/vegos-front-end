import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../models/courses/Course";
import {environment} from "../../environments/environment";
import {PriceDetails} from "../models/courses/content/PriceDetails";
import {Student} from "../models/Student";
import {Class} from "../models/courses/Class";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private url = environment.apiUrl + '/courses';

  constructor(private http: HttpClient) {
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.url}`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.url}`, course);
  }

  updateCourseById(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${id}`, course);
  }

  deleteCourseById(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`);
  }

  getPrices(current: number): Observable<PriceDetails[]> {
    return this.http.get<PriceDetails[]>(`${this.url}/${current}/prices`);
  }

  getPriceById(current: number, id: number): Observable<PriceDetails> {
    return this.http.get<PriceDetails>(`${this.url}/${current}/prices/${id}`);
  }

  addPrice(current: number, price: PriceDetails): Observable<PriceDetails> {
    return this.http.post<PriceDetails>(`${this.url}/${current}/prices`, price);
  }

  updatePriceById(current: number, id: number, priceDetails: PriceDetails): Observable<PriceDetails> {
    return this.http.put<PriceDetails>(`${this.url}/${current}/prices/${id}`, priceDetails);
  }

  deletePriceById(current: number, id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${current}/prices/${id}`);
  }

  addClass(current: number, group: Class): Observable<Class> {
    return this.http.post<Class>(`${this.url}/${current}/classes`, group);
  }

  getClassById(current: number, id: number): Observable<Class> {
    return this.http.get<Class>(`${this.url}/${current}/classes/${id}`);
  }

  addStudentToClass(current: number, id: number, student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.url}/${current}/classes/${id}/students`, student);
  }

  getAllStudentsByClass(current: number, id: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.url}/${current}/classes/${id}/students`);
  }
}

