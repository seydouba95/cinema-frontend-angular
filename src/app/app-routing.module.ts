import { CinemaComponent } from './cinema/cinema.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    // tslint:disable-next-line: quotemark
    path:  "cinema",
    component: CinemaComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
