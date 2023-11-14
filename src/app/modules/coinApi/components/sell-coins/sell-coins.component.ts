import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Coin, CoinApi, User, Wallet } from 'src/app/core/Models';
import { WalletService } from 'src/app/modules/main/services/wallet.service';

@Component({
  selector: 'app-sell-coins',
  templateUrl: './sell-coins.component.html',
  styleUrls: ['./sell-coins.component.css']
})
export class SellCoinsComponent implements OnInit,OnChanges {

  @Input () coinToSell!: CoinApi;
  currentWallet!: Wallet;
  currentUser!: User;

  showForm = true;
  cantidadVenta!: number;
  cantidadParaVender!: number;
  USD!:number;
  gananciVenta! : number;


  constructor(private wallet: WalletService){
    

  }

  ngOnInit(): void {
    this.currentUser = new User(JSON.parse(sessionStorage.getItem('userLoged')!));
    this.getWallets();
    
  }
  ngOnChanges(changes: SimpleChanges): void{
    if (changes['coinToSell']) {
      this.cantidadParaVenta();
    }



  }
  

  public confirmarVenta (){
        let ventaOk: boolean = this.calcularVenta();
    if (ventaOk) {
      this.currentWallet.fondos += this.gananciVenta;
      this.ventaCripto();
      this.updateWallet(this.currentWallet);
    }


    console.log(this.currentWallet);
    console.log(this.currentUser);
    console.log(this.coinToSell);

  }
  toggleForm() {
    this.showForm = !this.showForm;
  }


  public existCoinInWallet(idCoin: string): boolean {
    const existe: Coin | undefined = this.currentWallet.coins.find((c) => c.id == idCoin);

    if (existe != undefined) {

      return true;
    }
    return false;
  }

  public async getWallets() {

    let allWallets: Array<Wallet> = [];

    try {
      allWallets = ((await this.wallet.getAllWalletFromService()).slice());
      console.log(allWallets);

      this.currentWallet = allWallets.find((w) => w.idUser == this.currentUser.id)!

    } catch (error) {
      console.error('Error al intentar obtener las wallets', error);
    }
    
  }

  public async updateWallet(wallet: Wallet) {
    try {
      await this.wallet.updateWalletFromService(wallet);
    }
    catch (error) {
      console.error('Error al intentar actualizar la wallet', error);
    }
  }

  cantidadParaVenta() {
    let idToSell = this.coinToSell.id.toUpperCase();
    this.currentWallet.coins.forEach(coin => {
      if(coin.id == idToSell ){
        this.cantidadVenta = coin.coinAmount;
        console.log('monto', this.cantidadVenta);
        

        console.log(coin);
      }else{
        this.cantidadVenta = 0;
        console.log('else',coin);
        console.log(this.coinToSell);
        

      }

    });
  }

  

 /*  calcularPrecio() {
    this.valorCompra = this.cantidad * this.coinSelected.current_price;
  } */

  calcularVenta(): boolean {
    if( this.cantidadParaVender <= this.cantidadVenta){
      this.gananciVenta = this.cantidadParaVender * this.coinToSell.current_price;

      return true;
    }else{
      alert('No cuenta con los fondos de ' + this.coinToSell.id + ' necesarios para esta transaccion');
      return false;
    }

  }

  ventaCripto(){
    let idToSell = this.coinToSell.id.toUpperCase();
    this.currentWallet.coins.forEach(coin => {
      if(coin.id == idToSell ){
        coin.coinAmount -= this.cantidadParaVender;
        console.log('monto', this.cantidadVenta);
        

        console.log(coin);
      }

    });

  }
  
  




}
  



