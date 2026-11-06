import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FacetComponent, FacetGroupComponent } from '@fundamental-ngx/core/facets';
import { ObjectNumberComponent } from '@fundamental-ngx/core/object-number';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-facet-alignment-example',
    templateUrl: './facet-alignment-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FacetComponent, FacetGroupComponent, ObjectStatusComponent, ObjectNumberComponent]
})
export class FacetAlignmentExampleComponent {}
