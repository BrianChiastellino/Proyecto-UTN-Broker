import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private informacionSubject = new BehaviorSubject<number>(-1);
  informacion$ = this.informacionSubject.asObservable();

  enviarInformacion(informacion: number) {
    this.informacionSubject.next(informacion);
  }
  constructor() { }
}
