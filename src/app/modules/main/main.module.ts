import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SharedModule } from "../../shared/shared.module";
import { CoinApiModule } from '../coinApi/coin-api.module';
import { WalletComponent } from './components/wallet/wallet.component';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
    declarations: [
        MainPageComponent,
        WalletComponent,

    ],
    imports: [
        CommonModule,
        CoinApiModule,
        SharedModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class MainModule { }
