import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/article";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];

  constructor(private service: ArticleService) {
  }

  getArticles(): void {
    this.service.getArticles()
      .subscribe((articles) => {
        console.log(articles);
        this.articles = articles;
      });
    console.log(this.articles);
  }

  getArticleById(id: number): void {
    this.service.getArticleById(id)
      .subscribe((value) => this.articles.push(value));
    console.log(this.articles);
  }

  ngOnInit(): void {
    this.getArticles();
  }
}
