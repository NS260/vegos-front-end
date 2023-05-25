import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ArticlesComponent} from "./components/articles/articles.component";
import {CreateArticleComponent} from "./components/articles/create-article/create-article.component";
import {UpdateArticleComponent} from "./components/articles/update-article/update-article.component";
import {ArticleDetailsComponent} from "./components/articles/article-details/article-details.component";

const routes: Routes = [
  {path: 'articles', component: ArticlesComponent},
  {path: 'create-article', component: CreateArticleComponent},
  {path: 'update-article/:id', component: UpdateArticleComponent},
  {path: 'article-details/:id', component: ArticleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
