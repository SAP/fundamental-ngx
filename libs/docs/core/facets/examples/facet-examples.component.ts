import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-facet-group-example',
    templateUrl: './facet-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FacetModule,
        FormLabelComponent,
        TextComponent,
        RatingIndicatorModule,
        AvatarComponent,
        ObjectStatusComponent,
        ObjectNumberModule
    ]
})
export class FacetGroupExampleComponent {}

@Component({
    selector: 'fd-form-facet-example',
    templateUrl: './form-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, FormLabelComponent, TextComponent]
})
export class FormFacetExampleComponent {}

@Component({
    selector: 'fd-form-link-facet-example',
    templateUrl: './form-link-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, IconComponent, LinkComponent]
})
export class FormLinkFacetExampleComponent {}

@Component({
    selector: 'fd-image-facet-example',
    templateUrl: './image-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, AvatarComponent]
})
export class ImageFacetExampleComponent {}

@Component({
    selector: 'fd-key-value-facet-example',
    templateUrl: './key-value-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, ObjectStatusComponent, ObjectNumberModule]
})
export class KeyValueFacetExampleComponent {}

@Component({
    selector: 'fd-key-value-facet-alignment-example',
    templateUrl: './key-value-facet-alignment-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, ObjectStatusComponent, ObjectNumberModule]
})
export class KeyValueFacetAlignmentExampleComponent {}

@Component({
    selector: 'fd-rating-indicator-facet-example',
    templateUrl: './rating-indicator-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, RatingIndicatorModule]
})
export class RatingIndicatorFacetExampleComponent {}

@Component({
    selector: 'fd-facet-loading-example',
    templateUrl: './facet-loading-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonComponent,
        NgIf,
        FacetModule,
        FormLabelComponent,
        TextComponent,
        RatingIndicatorModule,
        AvatarComponent,
        ObjectStatusComponent,
        ObjectNumberModule,
        SkeletonModule
    ]
})
export class FacetLoadingExampleComponent {
    loading = true;
}
