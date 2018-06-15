import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbDirective } from './breadcrumb.directive';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [BreadcrumbDirective, BreadcrumbItemComponent],
    declarations: [BreadcrumbDirective, BreadcrumbItemComponent]
})
export class BreadcrumbModule {}
