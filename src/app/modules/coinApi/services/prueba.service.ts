import { Injectable } from '@angular/core';
import { JsonApiService } from 'src/app/core/services/json-api.service';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private jsonService: JsonApiService) { }

  
}
