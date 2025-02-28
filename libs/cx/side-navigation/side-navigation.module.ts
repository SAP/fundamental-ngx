import { NgModule } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { I18nModule } from '@fundamental-ngx/i18n';
import { SideNavigationButtonDirective } from './side-navigation-button.directive';
import { SideNavigationMainComponent } from './side-navigation-main.component';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';
import { SideNavigationComponent } from './side-navigation.component';

@NgModule({
    imports: [
        ButtonComponent,
        ScrollbarModule,
        I18nModule,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective,
        SideNavigationButtonDirective,
        SideNavigationComponent
    ],
    exports: [SideNavigationComponent]
})
export class CxSideNavigationModule {}
