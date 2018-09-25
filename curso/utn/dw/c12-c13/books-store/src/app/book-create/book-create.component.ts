import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {

  book = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveBook() {
    this.http.post('/book', this.book)
    .subscribe(res => {
      this.router.navigate(['/books']);
    }, (err) => {
      console.log(err);
    });
  }
}
