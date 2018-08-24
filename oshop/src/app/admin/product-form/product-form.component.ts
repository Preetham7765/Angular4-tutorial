import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProductById(this.id).take(1).subscribe( p => {
        this.product = p;
      });
    }
  }

  save(product) {
    if (this.id) {
      this.productService.updateProductById(this.id, product);
    } else {
      console.log(product);
      this.productService.create(product);
    }
    this.router.navigateByUrl('/admin/products');
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product')) {
        return;
    }
    this.productService.removeProductById(this.id);
    this.router.navigateByUrl('/admin/products');

  }
  ngOnInit() {
  }

}
