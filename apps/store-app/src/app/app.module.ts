import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FundamentalStoreModule } from '@fundamental-ngx/store';

import { AppComponent } from './app.component';
import { storeConfig } from './store.config';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        RouterModule.forRoot([], { initialNavigation: 'enabled' }),

        FundamentalStoreModule.forRoot(storeConfig),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
