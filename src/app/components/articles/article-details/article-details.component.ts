import {Component, OnInit} from '@angular/core';
import {Article} from "../../../models/article";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../services/article.service";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  id!: number;
  article: Article = new Article();

  constructor(private route: ActivatedRoute, private service: ArticleService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getArticleById(this.id).subscribe({
      next: val => this.article = val
    });
  }
}
