import { NgModule } from '@angular/core';
import { IconTabBarDocsComponent } from './icon-tab-bar-docs.component';
import { IconTabBarHeaderComponent } from './icon-tab-bar-header/icon-tab-bar-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { IconTabbarExampleComponent } from './examples/icon-tab-bar-example.component';



@NgModule({
    declarations: [
        IconTabBarDocsComponent,
        IconTabBarHeaderComponent,
        IconTabbarExampleComponent,
    ],
    imports: [
        SharedDocumentationPageModule
    ]
})
export class IconTabBarDocsModule {
}
