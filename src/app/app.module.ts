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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ArticlesComponent,
    CoursesComponent,
    MentorsComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterLink
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
