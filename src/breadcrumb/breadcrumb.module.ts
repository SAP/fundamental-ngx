import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Breadcrumb, BreadcrumbItem } from './breadcrumb';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [Breadcrumb, BreadcrumbItem],
    declarations: [Breadcrumb, BreadcrumbItem]
})
export class BreadcrumbModule {}
