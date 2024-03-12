import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Transaccion } from 'src/app/core/Models';
import { JsonTransaccionService } from 'src/app/core/services/json-transaccion.service';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {


  constructor(public transaccion: JsonTransaccionService) { }


  public async getTransaccionFromService() {

    try {
      let response = this.transaccion.getAllTransacciones();

      const data = await lastValueFrom(response);
      return data.map((t: any) => new Transaccion(t));

    } catch (error) {
      console.error('Error al querer obtener toadas las transacciones', error);
      return [];
    }
  }

  public addTransaccionFromService(transaccion: Transaccion): void {
    this.transaccion.addTransaccion(transaccion).subscribe({
      next: () => {
        console.log("La transaccion se agrego correctamente");
      },
      error: () => {
        console.error("Erro al ingresar la transaccion");
      }
    })
  }
}
