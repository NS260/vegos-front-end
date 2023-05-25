import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../models/article";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = environment.apiUrl + '/articles';

  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}`);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.url}` + `/${id}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.url}`, article);
  }

  updateArticleById(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.url}/${id}`, article);
  }

  deleteArticleById(id:number): Observable<unknown>{
    return this.http.delete(`${this.url}/${id}`);
  }
}
