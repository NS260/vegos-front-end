import {Component} from '@angular/core';
import {Article} from "../../../models/article/article";
import {ArticleService} from "../../../services/article.service";
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import { FormBuilder, FormControl,Validators} from "@angular/forms";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {
  article: Article = new Article();
  user: User = {
    id: undefined
  };

  nameGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(10)]],
  });
  categoryGroup = this.fb.group({
    category: ['', Validators.required],
  });
  userCommentGroup = this.fb.group({
    userComment: new FormControl('', [Validators.required, Validators.minLength(10)])
  });
  photoGroup = this.fb.group({
    photoURL: new FormControl('', [Validators.required,
      Validators.pattern("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})")])
  });

  constructor(private service: ArticleService, private router: Router, private fb: FormBuilder) {
  }
  setValues(): void {
    this.user.id = 1;
    this.article.articleType = 'USER_ARTICLE';
    this.article.rate = 1;
    this.article.user = this.user;
    this.article.name = this.nameGroup.value.name;
    this.article.category = this.categoryGroup.value.category?.toUpperCase();
    this.article.userComment = this.userCommentGroup.value.userComment;
    this.article.photoUrl = this.photoGroup.value.photoURL;
  }

  onSubmit() {
    this.setValues();
    this.saveArticle();
  }

  redirectToArticlesPage() {
    this.router.navigate(['/articles']);
  }

  saveArticle(): void {
    this.service.createArticle(this.article).subscribe({
      next: () => {
        this.redirectToArticlesPage();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}

