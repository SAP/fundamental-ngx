import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellPageModule } from './components/app-shell-page/app-shell-page.module';

@NgModule({
    imports: [
        CommonModule,
        AppShellPageModule
    ],
    exports: [
        AppShellPageModule
    ]
})
export class AppShellModule {
}
