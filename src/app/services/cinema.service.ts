import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  api_base = environment.api_base;

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: align
  // tslint:disable-next-line: typedef
  public getVilles(){
    return this.http.get(this.api_base + '/villes');

  }
  // tslint:disable-next-line: typedef
  public getCinemas(v){
    return this.http.get(v._links.cinemas.href);
  }
  // tslint:disable-next-line: typedef
  getSalles(c) {
    return this.http.get(c._links.salles.href);

  }
  // tslint:disable-next-line: typedef
  getProjections(salle) {
    // tslint:disable-next-line: whitespace
    const url = salle._links.projections.href.replace('{?projection}','');

    // tslint:disable-next-line: quotemark
    return this.http.get(url + "?projection=p1");

  }
  // tslint:disable-next-line: typedef
  getTicketsPlaces(p: any) {
    // tslint:disable-next-line: quotemark
    const url = p._links.tickets.href.replace('{?projection}', '');

    // tslint:disable-next-line: quotemark
    return this.http.get(url + "?projection=ticketProj");

}
// tslint:disable-next-line: typedef
payerTickets(dataForm: any) {
  return this.http.post(this.api_base + '/payerTickets', dataForm);
}




}
