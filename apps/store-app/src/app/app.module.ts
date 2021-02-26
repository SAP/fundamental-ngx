import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import 'reflect-metadata';
import { FundamentalStoreModule } from '@fundamental-ngx/store';

import { AppComponent } from './app.component';
import { storeConfig } from './store.config';

const routes: Routes = [{
    path: 'home',
    loadChildren: () =>
        import('./page/home/home.module').then((m) => m.HomeModule)
}, {
    path: 'catalog',
    loadChildren: () =>
        import('./page/catalog/catalog.module').then((m) => m.CatalogModule)
}, {
    path: '**',
    redirectTo: '/home'
}];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
        FundamentalStoreModule.forRoot(storeConfig),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
