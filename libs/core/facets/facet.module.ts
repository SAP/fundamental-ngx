import { NgModule } from '@angular/core';
import { FacetContentComponent } from './content/facet-content.component';
import { FacetGroupComponent } from './facet-group.component';
import { FacetComponent } from './facet/facet.component';

const components = [FacetComponent, FacetGroupComponent, FacetContentComponent];
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class FacetModule {}
