import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrListComponent} from './pr-list.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: PrListComponent,
    outlet: 'pr-list'
  }
];

export const prList: ModuleWithProviders<RouterModule> = RouterModule.forChild(APP_ROUTES);

@NgModule({
  imports: [
    prList
  ],
  exports: [
    RouterModule
  ],
})
export class PrListRoutingModule {
}
