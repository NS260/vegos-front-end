import {Component, OnInit} from '@angular/core';
import {Article} from "../../../models/article/article";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../../services/article.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Utils} from "../../../utils/Utils";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  id!: number;
  article: Article = new Article();

  isClickedDown = false
  isClickedUp = false
  oldRate!: number

  constructor(private route: ActivatedRoute, private service: ArticleService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router) {
    iconRegistry.addSvgIcon('rate-star', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/star-icon.svg'));
    iconRegistry.addSvgIcon('plus-star', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus-rate-icon.svg'));
    iconRegistry.addSvgIcon('minus-star', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/minus-rate-icon.svg'));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getArticleById(this.id).subscribe({
      next: val => {
        this.article = val;
        this.oldRate = val.rate;
        this.article.category = Utils.mapStringToCorrectUserView(val.category);
      }
    });
  }

  deletePart(id: number) {
    this.service.removePart(this.id, id).subscribe({
      next: () => {
        this.router.navigate(['article-details', this.id]);
      },
      error: err => console.log(err)
    })
  }

  up() {
    this.article.rate += 1;
    this.service.updateArticleById(this.id, this.article).subscribe({
      next: () => {
        this.click();
        this.router.navigate(['article-details', this.id]);
      }
    })
  }

  down() {
    this.article.rate -= 1;
    this.service.updateArticleById(this.id, this.article).subscribe({
      next: () => {
        this.click();
        this.router.navigate(['article-details', this.id]);
      }
    })
  }

  click() {
    let current = this.article.rate;
    if (this.oldRate === current) {
      this.isClickedUp = false;
      this.isClickedDown = false;
    } else if (this.oldRate < current) {
      this.isClickedUp = true;
    } else if (this.oldRate > current) {
      this.isClickedDown = true;
    }
  }
}
