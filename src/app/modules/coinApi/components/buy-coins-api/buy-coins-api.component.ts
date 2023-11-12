import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coin, CoinApi, User, Wallet } from 'src/app/core/Models';
import { WalletService } from 'src/app/modules/main/services/wallet.service';

@Component({
  selector: 'app-buy-coins-api',
  templateUrl: './buy-coins-api.component.html',
  styleUrls: ['./buy-coins-api.component.css']
})
export class BuyCoinsApiComponent implements OnChanges, OnInit{

  coinCompra!: CoinApi;
  @Input() coinSelected!: CoinApi;
  @Input() walledLogue!: Wallet;
  showForm = true;

  userLoged!: User;
  walletLog!: Wallet;

  cantidad : number = 0;
  pesos! : number;
  valorCompra : number = 0;
  valorCompraPesos : number = 0;

  constructor(private wallet : WalletService){

  }
  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));




  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Desde buy',this.coinSelected);
    this.coinCompra = this.coinSelected;
    console.log('Desde el this', this.coinCompra);
    this.checkWallet();
    console.log('los pesos pa',this.pesos);
    console.log('ngOninit',this.userLoged);
    this.pesos = this.walletLog.fondos;

    

    
    


  }



  toggleForm() {


      this.showForm = !this.showForm;

  }

  calcularPrecio() {

  
    this.valorCompra = this.cantidad * this.coinSelected.current_price;
    this.checkWallet();

  }

  calcularCompra() {

      this.cantidad = this.pesos / this.coinSelected.current_price;

      this.valorCompraPesos = this.cantidad * this.coinSelected.current_price;


  }

  public async checkWallet() {
    try {
      console.log('check',this.userLoged);
      const check = await this.wallet.getWalletByIdUser(this.userLoged.id!);
      console.log('desde check el check',check);
      
  
      if (check) {
        this.walletLog = check;
        console.log('Wallet encontrada:', this.walletLog);
        console.log('Fondos check',this.walletLog.fondos);
  

        
      } else {
        console.log('No se encontró la wallet para el usuario con ID:', this.userLoged.id);
      }
    } catch (error) {
      console.error('Error al buscar la wallet:', error);
    }
  }

  async cargaWallet(){
    await this.checkWallet();
    console.log('carga wall', this.walletLog);
    this.pesos = this.walletLog.fondos;
    await this.checkWallet();
    console.log('carga wall fondo', this.walletLog.fondos);
    

    console.log('pesos carga', this.pesos);
    

  }
  
  
  
  



  //todo: hacer la logica desde la compra de la moenda con un pop-up










}
/* esto es con SessionsStorage

import { Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coin, CoinApi, User, Wallet } from 'src/app/core/Models';
import { WalletService } from 'src/app/modules/main/services/wallet.service';

@Component({
  selector: 'app-buy-coins-api',
  templateUrl: './buy-coins-api.component.html',
  styleUrls: ['./buy-coins-api.component.css']
})
export class BuyCoinsApiComponent implements OnChanges, OnInit{

  coinCompra!: CoinApi;
  @Input() coinSelected!: CoinApi;
  showForm = true;

  userLoged!: User;
  walletLog!: Wallet;

  cantidad : number = 0;
  pesos! : number;
  valorCompra : number = 0;
  valorCompraPesos : number = 0;

  constructor(){

  }
  ngOnInit(): void {
    this.userLoged = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
   
    // Obtener la billetera desde el sessionStorage
    const walletString = sessionStorage.getItem('wallet');
    
    if (walletString) {
      this.walletLog = JSON.parse(walletString);
      console.log('Wallet cargada desde sessionStorage en otro componente:', this.walletLog);


      
      // Usa la billetera como sea necesario
    } else {
      console.log('No hay información de billetera en el sessionStorage en otro componente.');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Desde buy',this.coinSelected);
    this.coinCompra = this.coinSelected;
    console.log('Desde el this', this.coinCompra);

    console.log('los pesos pa',this.pesos);
    console.log('ngOninit',this.userLoged);
    this.pesos = this.walletLog.fondos;

    

    
    


  }



  toggleForm() {


      this.showForm = !this.showForm;

  }

  calcularPrecio() {

  
    this.valorCompra = this.cantidad * this.coinSelected.current_price;


  }

  calcularCompra() {

      this.cantidad = this.pesos / this.coinSelected.current_price;

      this.valorCompraPesos = this.cantidad * this.coinSelected.current_price;


  }


 cargaWallet(){
    console.log('carga wall', this.walletLog);
    this.pesos = this.walletLog.fondos;
    

    console.log('pesos carga', this.pesos);
    

 }

  



  //todo: hacer la logica desde la compra de la moenda con un pop-up




}


 */

