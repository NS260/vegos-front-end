import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/article";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];

  constructor(private service: ArticleService, private router: Router) {
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.service.getArticles().subscribe({
      next: (val: any) => this.articles = val._embedded?.articleDTOes
    });
  }

  updateArticle(id: number) {
    this.router.navigate(['update-article', id]);
  }


  deleteArticle(id: number) {
    this.service.deleteArticleById(id).subscribe({
      next: (val) => {
        console.log(val);
        this.getArticles();
      }
    });
  }

  viewArticle(id: number) {
    this.router.navigate(['article-details', id]);
  }
}
