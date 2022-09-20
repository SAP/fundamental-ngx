import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacetGroupComponent } from './facet-group.component';
import { FacetContentComponent } from './content/facet-content.component';
import { FacetComponent } from './facet/facet.component';
import { TitleModule } from '@fundamental-ngx/core/title';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { RepeatModule } from '@fundamental-ngx/core/utils';

@NgModule({
    declarations: [FacetComponent, FacetGroupComponent, FacetContentComponent],
    imports: [CommonModule, TitleModule, FormLabelModule, SkeletonModule, RepeatModule],
    exports: [FacetComponent, FacetGroupComponent, FacetContentComponent]
})
export class FacetModule {}
