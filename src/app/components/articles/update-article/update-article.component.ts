import {Component, OnInit} from '@angular/core';
import {Article} from "../../../models/article";
import {ArticleService} from "../../../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Part} from "../../../models/part";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Utils} from "../../../utils/Utils";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  id!: number;
  article: Article = new Article();
  partsList: Part[] = [];

  nameGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(10)]],
  });
  categoryGroup = this.fb.group({
    category: ['',
      Validators.required],
  });
  userCommentGroup = this.fb.group({
    userComment: new FormControl('', [
      Validators.required,
      Validators.minLength(10)])
  });
  photoGroup = this.fb.group({
    photoURL: new FormControl('', [
      Validators.required,
      Validators.pattern("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})")])
  });
  partsGroup = this.fb.group({
    parts: this.fb.array([])
  })

  constructor(private service: ArticleService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('delete-part', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete-icon.svg'));
    iconRegistry.addSvgIcon('add-part', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add-icon.svg'));
  }

  get parts() {
    return this.partsGroup.controls["parts"] as FormArray;
  }

  addPart() {
    const partGroup = this.fb.group({
      header: ['', [Validators.required, Validators.minLength(5)]],
      text: ['', [Validators.required, Validators.minLength(15)]]
    });
    this.parts.push(partGroup);
    console.log(this.parts);
  }

  deletePart(id: number) {
    this.parts.removeAt(id);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getArticleById(this.id).subscribe({
      next: (val) => {
        this.article = val;
        this.nameGroup.patchValue({name: val.name});
        this.categoryGroup.patchValue({category: Utils.mapString(val.category)});
        this.photoGroup.patchValue({photoURL: val.photoUrl});
        this.userCommentGroup.patchValue({userComment: val.userComment});
        this.article.category = Utils.mapString(val.category);
        this.setArray();
      },
      error: (err) => console.log(err)
    });
  }

  setArray() {
    const partsArray = this.partsGroup.get('parts') as FormArray;
    this.article.parts.forEach(item => {
      partsArray.push(this.buildGroup(item));
    })
    this.article.parts.forEach(el => {
      this.service.removePart(this.id, el.id).subscribe({
        next: (value) => console.log(value)
      })
    })
  }

  buildGroup(item: Part): FormGroup {
    return this.fb.group({
      header: item.header,
      text: item.text
    })
  }

  onSubmit() {
    this.submit();
    this.service.updateArticleById(this.id, this.article).subscribe({
      next: (val) => {
        this.partsList.forEach(part => {
          this.service.addPart(this.id, part).subscribe({
            error: err => console.error(err)
          })
        })
        this.redirectToArticlesPage();
      }, error: (err) => console.error(err)
    });
  }

  submit() {
    this.article.category = this.categoryGroup.value.category?.toUpperCase();
    this.article.name = this.nameGroup.value.name;
    this.article.userComment = this.userCommentGroup.value.userComment;
    this.article.photoUrl = this.photoGroup.value.photoURL;
    for (const control of this.parts.controls) {
      this.partsList.push(new Part(control.get('header')?.value, control.get('text')?.value));
    }

  }

  redirectToArticlesPage() {
    this.router.navigate(['/articles']);
  }
}
