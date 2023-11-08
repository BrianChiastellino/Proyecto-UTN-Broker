import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SharedModule } from "../../shared/shared.module";
import { CoinApiModule } from '../coinApi/coin-api.module';




@NgModule({
    declarations: [
        MainPageComponent,
    ],
    imports: [
        CommonModule,
        CoinApiModule,
        SharedModule
    ]
})
export class MainModule { }
