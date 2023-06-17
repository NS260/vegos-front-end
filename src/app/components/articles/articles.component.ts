import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/article/article";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Utils} from "../../utils/Utils";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  constructor(private service: ArticleService, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('edit-article', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit-icon.svg'));
    iconRegistry.addSvgIcon('delete-article', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/remove-icon.svg'));
    iconRegistry.addSvgIcon('view-article', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/view-icon.svg'));
    iconRegistry.addSvgIcon('rate-star', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/star-icon.svg'));
  }
  ngOnInit(): void {
    this.getArticles();
  }
  getArticles(): void {
    this.service.getArticles().subscribe({
      next: (val: any) => {
        this.articles = val._embedded?.articleDTOes
        this.articles.forEach(val => val.category = Utils.mapStringToCorrectUserView(val.category))
      }
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
  navigateToCreate() {
    this.router.navigate(['create-article']);
  }
}
