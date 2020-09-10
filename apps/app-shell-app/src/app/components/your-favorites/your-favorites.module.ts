import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YourFavoritesComponent} from './your-favorites.component';
import {ButtonModule} from '@fundamental-ngx/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  declarations: [YourFavoritesComponent],
  exports: [YourFavoritesComponent],
})
export class YourFavoritesModule {
}
