import {Component, OnInit} from '@angular/core';
import {Article} from "../../../models/article";
import {ArticleService} from "../../../services/article.service";
import {User} from "../../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  article: Article = new Article();
  user: User = {
    age: undefined,
    email: undefined,
    imageUrl: undefined,
    info: undefined,
    jobTitle: undefined,
    language: undefined,
    mobilePhone: undefined,
    name: undefined,
    password: undefined,
    status: undefined,
    surname: undefined,
    userRole: undefined,
    id: undefined
  };

  constructor(private service: ArticleService, private router: Router) {
  }

  ngOnInit(): void {
  }

  setValues(): void {
    this.user.id = 1;
    this.article.articleType = 'USER_ARTICLE';
    this.article.rate = 1;
    this.article.user = this.user;
  }

  onSubmit() {
    this.setValues();
    console.log(this.article);
    this.saveArticle();
  }

  redirectToArticlesPage() {
    this.router.navigate(['/articles']);
  }

  saveArticle(): void {
    this.service.createArticle(this.article).subscribe({
      next: (val) => {
        console.log(val);
        this.redirectToArticlesPage();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
