import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from './book-create/book-create.component';

const appRoutes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    data: { title: 'Lista de libros'}
  },
  {
    path: 'book-create',
    component: BookCreateComponent,
    data: { title: 'Agregar libro'}
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true} // <-- para ver el log y debuggear.
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
