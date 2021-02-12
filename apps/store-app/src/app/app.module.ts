import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { EntityStoreModule } from '@fundamental-ngx/store';
import { storeConfig } from './store.config';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], { initialNavigation: 'enabled' }),
        EntityStoreModule.forRoot({ storeConfig: storeConfig }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
