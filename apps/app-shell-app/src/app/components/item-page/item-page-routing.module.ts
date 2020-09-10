import {ModuleWithProviders, NgModule} from '@angular/core';
import {ItemPageComponent} from './item-page.component';
import {RouterModule, Routes} from '@angular/router';

const APP_ROUTES: Routes = [
  {path: 'item-detail', component: ItemPageComponent}
];

export const itemPageRoute: ModuleWithProviders<RouterModule> = RouterModule.forChild(APP_ROUTES);

@NgModule({
  imports: [
    itemPageRoute
  ],
  exports: [
    RouterModule
  ],
})
export class ItemPageRoutingModule {
}
