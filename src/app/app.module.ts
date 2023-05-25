import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navigation/navbar/navbar.component';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import {ArticlesComponent} from './components/articles/articles.component';
import {CoursesComponent} from './components/courses/courses.component';
import {MentorsComponent} from './components/mentors/mentors.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CreateArticleComponent} from './components/articles/create-article/create-article.component';
import {UpdateArticleComponent} from './components/articles/update-article/update-article.component';
import {AppRoutingModule} from "./app-routing.module";
import { ArticleDetailsComponent } from './components/articles/article-details/article-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ArticlesComponent,
    CoursesComponent,
    MentorsComponent,
    CreateArticleComponent,
    UpdateArticleComponent,
    ArticleDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
