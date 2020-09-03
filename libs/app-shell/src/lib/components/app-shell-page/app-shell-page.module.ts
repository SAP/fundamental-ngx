import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AvatarModule,
    ButtonModule,
    MenuModule,
    ShellbarModule
} from '@fundamental-ngx/core';
import { AppShellPageComponent } from './app-shell-page.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppShellHeaderComponent } from './app-header/app-header.component';
import { AppShellContentComponent } from './app-content/app-content.component';
import { AppShellFooterComponent } from './app-footer/app-footer.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        ScrollingModule,
        ShellbarModule,
        AvatarModule,
        MenuModule
    ],
    declarations: [
        AppShellPageComponent,
        AppShellHeaderComponent,
        AppShellContentComponent,
        AppShellFooterComponent
    ],
    exports: [
        AppShellPageComponent,
        AppShellHeaderComponent,
        AppShellContentComponent,
        AppShellFooterComponent
    ]
})
export class AppShellPageModule {
}
