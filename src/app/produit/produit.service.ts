import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProduitService {
  private apiUrlget = 'http://localhost:8080/get/produit';
  private apiUrladd = 'http://localhost:8080/add/produit';
  private apiUrldelete = 'http://localhost:8080/delete/produit/{id}';


  constructor(private http: HttpClient) {}

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlget);
  }

  addProduit(produit: any): Observable<any> {
    return this.http.post(this.apiUrladd, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(${this.apiUrldelete}/${id});
  }
}