import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppShellModule } from '@fundamental-ngx/app-shell';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { PrListModule } from './components/pr-list/pr-list.module';
import { YourFavoritesModule } from './components/your-favorites/your-favorites.module';
import { ItemPageModule } from './components/item-page/item-page.module';
import {
    IconModule,
    LayoutGridModule,
    LayoutPanelModule,
    LinkModule
} from '@fundamental-ngx/core';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppShellModule,
        PrListModule,
        YourFavoritesModule,
        ItemPageModule,
        IconModule,
        LinkModule,
        LayoutGridModule,
        LayoutPanelModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
