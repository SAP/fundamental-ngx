import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { FacetComponent, FacetContentComponent, FacetGroupComponent } from '@fundamental-ngx/core/facets';
import { ObjectNumberComponent } from '@fundamental-ngx/core/object-number';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { RatingIndicatorComponent } from '@fundamental-ngx/core/rating-indicator';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-facet-group-example',
    templateUrl: './facet-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FacetComponent,
        FacetContentComponent,
        FacetGroupComponent,
        FormLabelComponent,
        TextComponent,
        AvatarComponent,
        ObjectStatusComponent,
        ObjectNumberComponent,
        RatingIndicatorComponent
    ]
})
export class FacetGroupExampleComponent {}
