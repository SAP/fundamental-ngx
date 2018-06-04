import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BreadcrumbDirective, BreadcrumbItemComponent } from './breadcrumb.directive';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [BreadcrumbDirective, BreadcrumbItemComponent],
    declarations: [BreadcrumbDirective, BreadcrumbItemComponent]
})
export class BreadcrumbModule {}
