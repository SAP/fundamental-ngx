import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'reflect-metadata';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
// import { EntityStoreModule } from '@fundamental-ngx/store';
import { Requisition } from './store.config';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], { initialNavigation: 'enabled' }),
        // EntityStoreModule.forRoot({ storeConfig: storeConfig }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        console.log(Reflect.getOwnMetadata('design:paramtypes', Requisition));
    }
}
