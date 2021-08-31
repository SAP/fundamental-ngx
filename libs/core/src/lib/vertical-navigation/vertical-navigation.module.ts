import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalNavigationComponent } from './vertical-navigation.component';
import { VerticalNavigationMainNavigationComponent } from './vertical-navigation-main-navigation.compenent';

@NgModule({
    declarations: [VerticalNavigationComponent, VerticalNavigationMainNavigationComponent],
    imports: [CommonModule],
    exports: [VerticalNavigationComponent, VerticalNavigationMainNavigationComponent]
})
export class VerticalNavigationModule {}
