import { CinemaService } from './../services/cinema.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  api_base = environment.api_base;

public villes;
public cinemas;
public currentCinema;
public currentVille;
private currentProjection: any;
public   salles: any;
public selectedTickets: any;
  // tslint:disable-next-line: typedef-whitespace
  constructor(public cinemaService: CinemaService) { }

  ngOnInit(): void {
  this.cinemaService.getVilles()
  .subscribe(data => {
       this.villes = data;
    }, err => {
    console.log(err);
  });
}

// tslint:disable-next-line: typedef
onGetCinemas(v){
  this.currentVille = v;
  this.salles = undefined;
  this.currentProjection = undefined;
  this.cinemaService.getCinemas(v)
  .subscribe(data => {
    this.cinemas = data;
 }, err => {
 console.log(err);
});
}
// tslint:disable-next-line: typedef
onGetSalles(c){
  this.currentCinema = c;
  this.currentProjection = undefined;

  this.cinemaService.getSalles(c)
  .subscribe(data => {
    this.salles = data;
    this.salles._embedded.salles.forEach(salle => {
      this.cinemaService.getProjections(salle)
        // tslint:disable-next-line: no-shadowed-variable
        .subscribe(data => {
        salle.projections = data;
     }, err => {
     console.log(err);
    });

    });
 }, err => {
 console.log(err);
});
}
// tslint:disable-next-line: typedef
onGetTicketsPlaces(p){
  this.currentProjection = p;
  this.cinemaService.getTicketsPlaces(p)

  .subscribe(data => {
    this.currentProjection.tickets = data;
    console.log(' errrrr ' + this.currentProjection.tickets);
    this.selectedTickets = [];
 }, err => {
 console.log(err);
});

}
// tslint:disable-next-line: typedef
onSelectTicket(t){
  if (!t.selected) {
    t.selected = true;
    this.selectedTickets.push(t);
  }else{
    t.selected = false;
    this.selectedTickets.splice(this.selectedTickets.indexOf(t), 1);

  }
  console.log(this.selectedTickets);


}
// tslint:disable-next-line: typedef
getTicketClass(t){

  // tslint:disable-next-line: quotemark
  let  str = "btn margin";

  // tslint:disable-next-line: triple-equals
  if (t.reservee == true) {
      // tslint:disable-next-line: whitespace
      str +='  btn-danger';
  }
  else if (t.selected) {
    str += '  btn-warning';

  } else {
    str += '  btn-success';

  }
  return str;

}
// tslint:disable-next-line: typedef
onPayerTickets(dataForm){
  // tslint:disable-next-line: prefer-const
  let tickets  = [];
  this.selectedTickets.forEach(t => {
       tickets.push(t.id);
  });
  dataForm.tickets = tickets;
  this.cinemaService.payerTickets(dataForm)
  .subscribe(data => {
    alert('Tickets Reserves avec Success');
    this.onGetTicketsPlaces(this.currentProjection);
 }, err => {
 console.log(err);
});
}



}




