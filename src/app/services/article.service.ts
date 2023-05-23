import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://localhost:8080/api/v1/articles';

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(this.url + `/${id}`);
  }

  addArticle(context: any) {
    return this.http.post(this.url, JSON.stringify(context));
  }

  updateArticleById(id: number | string) {
    return this.http.put(this.url,
      {test: 1})
  }

  deleteArticleById(id: number | string) {
    return this.http.delete(this.url, {
      params: new HttpParams()
        .set('id', id)
    });
  }
}
