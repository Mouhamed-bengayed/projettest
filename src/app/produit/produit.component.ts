import { Component, OnInit, signal, effect } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProduitService } from './produit.service';

@Component({
  selector: 'app-product',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  products = signal<any[]>([]);
  productForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]]
  });
  produits: any;

  constructor(private produitService: ProduitService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadProduits();
    effect(() => console.log('Products updated:', this.produits()));
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe((data) => this.products.set(data));
  }

  addProduit(): void {
    if (this.productForm.valid) {
      this.produitService.addProduit(this.productForm.value).subscribe(() => {
        this.loadProduits();
        this.productForm.reset();
      });
    }
  }

  deleteProduit(id: number): void {
    this.produitService.deleteProduit(id).subscribe(() => this.loadProduits());
  }
}