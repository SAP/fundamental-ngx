import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BreadcrumbComponent, BreadcrumbItem } from './breadcrumb.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [BreadcrumbComponent, BreadcrumbItem],
    declarations: [BreadcrumbComponent, BreadcrumbItem]
})
export class BreadcrumbModule {}
