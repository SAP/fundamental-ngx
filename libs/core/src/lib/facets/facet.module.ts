import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacetGroupComponent } from './facet-group.component';
import { FacetContentComponent } from './content/facet-content.component';
import { FacetComponent } from './facet/facet.component';
import { TitleModule } from '../title/title.module';
import { FormLabelModule } from '../form/form-label/form-label.module';

@NgModule({
    declarations: [FacetComponent, FacetGroupComponent, FacetContentComponent],
    imports: [CommonModule, TitleModule, FormLabelModule],
    exports: [FacetComponent, FacetGroupComponent, FacetContentComponent]
})
export class FacetModule {}
