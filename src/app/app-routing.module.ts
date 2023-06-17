import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ArticlesComponent} from "./components/articles/articles.component";
import {CreateArticleComponent} from "./components/articles/create-article/create-article.component";
import {UpdateArticleComponent} from "./components/articles/update-article/update-article.component";
import {ArticleDetailsComponent} from "./components/articles/article-details/article-details.component";
import {CoursesComponent} from "./components/courses/courses.component";
import {CreateCourseComponent} from "./components/courses/create-course/create-course.component";
import {UpdateCourseComponent} from "./components/courses/update-course/update-course.component";
import {CourseDetailsComponent} from "./components/courses/course-details/course-details.component";
import {SignInComponent} from "./components/options/sign-in/sign-in.component";
import {SignUpComponent} from "./components/options/sign-up/sign-up.component";
import {HomeComponent} from "./components/options/home/home.component";
import {ClassDetailsComponent} from "./components/classes/class-details/class-details.component";
import {MentorsComponent} from "./components/mentors/mentors.component";

const routes: Routes = [
  {path: 'articles', component: ArticlesComponent},
  {path: 'create-article', component: CreateArticleComponent},
  {path: 'update-article/:id', component: UpdateArticleComponent},
  {path: 'article-details/:id', component: ArticleDetailsComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'create-course', component: CreateCourseComponent},
  {path: 'update-course/:id', component: UpdateCourseComponent},
  {path: 'course-details/:id', component: CourseDetailsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up',component: SignUpComponent},
  {path: 'home',component: HomeComponent},
  {path: '',component: HomeComponent},
  {path: 'class-details/:id', component:ClassDetailsComponent},
  {path: 'mentors', component: MentorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
