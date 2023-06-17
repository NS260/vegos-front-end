import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navigation/navbar/navbar.component';
import {ArticlesComponent} from './components/articles/articles.component';
import {CoursesComponent} from './components/courses/courses.component';
import {MentorsComponent} from './components/mentors/mentors.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CreateArticleComponent} from './components/articles/create-article/create-article.component';
import {UpdateArticleComponent} from './components/articles/update-article/update-article.component';
import {AppRoutingModule} from "./app-routing.module";
import {ArticleDetailsComponent} from './components/articles/article-details/article-details.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatStepperModule} from "@angular/material/stepper";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {CreateCourseComponent} from './components/courses/create-course/create-course.component';
import {UpdateCourseComponent} from './components/courses/update-course/update-course.component';
import {CourseDetailsComponent} from './components/courses/course-details/course-details.component';
import {SignInComponent} from './components/options/sign-in/sign-in.component';
import {SignUpComponent} from './components/options/sign-up/sign-up.component';
import {HomeComponent} from './components/options/home/home.component';
import {MatTableModule} from "@angular/material/table";
import {ClassesComponent} from './components/classes/classes.component';
import {ClassDetailsComponent} from './components/classes/class-details/class-details.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArticlesComponent,
    CoursesComponent,
    MentorsComponent,
    CreateArticleComponent,
    UpdateArticleComponent,
    ArticleDetailsComponent,
    CreateCourseComponent,
    UpdateCourseComponent,
    CourseDetailsComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ClassesComponent,
    ClassDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatStepperModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
