import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { TitleModule } from '@fundamental-ngx/core/title';
import { FacetContentComponent } from './content/facet-content.component';
import { FacetGroupComponent } from './facet-group.component';
import { FacetComponent } from './facet/facet.component';

@NgModule({
    declarations: [FacetComponent, FacetGroupComponent, FacetContentComponent],
    imports: [CommonModule, TitleModule, FormLabelComponent],
    exports: [FacetComponent, FacetGroupComponent, FacetContentComponent]
})
export class FacetModule {}
