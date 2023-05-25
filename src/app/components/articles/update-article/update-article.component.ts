import {Component, OnInit} from '@angular/core';
import {Article} from "../../../models/article";
import {ArticleService} from "../../../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  id!: number;
  article: Article = new Article();

  constructor(private service: ArticleService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getArticleById(this.id).subscribe({
      next: (val) => {
        this.article = val;
        console.log(this.article);
      },
      error: (err) => console.log(err)
    });
  }

  onSubmit() {
    this.service.updateArticleById(this.id, this.article).subscribe({
      next: (val) => {
        console.log(val);
        this.redirectToArticlesPage();

      }, error: (err) => console.error(err)
    });
  }

  redirectToArticlesPage() {
    this.router.navigate(['/articles']);
  }
}
