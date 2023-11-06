import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsModule } from '../Coins/coins.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        MainPageComponent,
    ],
    imports: [
        CommonModule,
        CoinsModule,
        SharedModule
    ]
})
export class MainModule { }
