import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FacetComponent, FacetContentComponent, FacetGroupComponent } from '@fundamental-ngx/core/facets';
import { ObjectNumberComponent } from '@fundamental-ngx/core/object-number';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { RatingIndicatorComponent } from '@fundamental-ngx/core/rating-indicator';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-facet-loading-example',
    templateUrl: './facet-loading-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        FacetComponent,
        FacetContentComponent,
        FacetGroupComponent,
        FormLabelComponent,
        TextComponent,
        AvatarComponent,
        ObjectStatusComponent,
        ObjectNumberComponent,
        SkeletonComponent,
        RatingIndicatorComponent
    ]
})
export class FacetLoadingExampleComponent {
    loading = true;
}
