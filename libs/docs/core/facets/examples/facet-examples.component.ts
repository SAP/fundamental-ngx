import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { NgIf } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { TextComponent } from '@fundamental-ngx/core/text';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FacetModule } from '@fundamental-ngx/core/facets';

@Component({
    selector: 'fd-facet-group-example',
    templateUrl: './facet-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FacetModule,
        FormLabelModule,
        TextComponent,
        RatingIndicatorModule,
        AvatarModule,
        ObjectStatusModule,
        ObjectNumberModule
    ]
})
export class FacetGroupExampleComponent {}

@Component({
    selector: 'fd-form-facet-example',
    templateUrl: './form-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, FormLabelModule, TextComponent]
})
export class FormFacetExampleComponent {}

@Component({
    selector: 'fd-form-link-facet-example',
    templateUrl: './form-link-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, IconModule, LinkComponent]
})
export class FormLinkFacetExampleComponent {}

@Component({
    selector: 'fd-image-facet-example',
    templateUrl: './image-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, AvatarModule]
})
export class ImageFacetExampleComponent {}

@Component({
    selector: 'fd-key-value-facet-example',
    templateUrl: './key-value-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, ObjectStatusModule, ObjectNumberModule]
})
export class KeyValueFacetExampleComponent {}

@Component({
    selector: 'fd-key-value-facet-alignment-example',
    templateUrl: './key-value-facet-alignment-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FacetModule, ObjectStatusModule, ObjectNumberModule]
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
        ButtonModule,
        NgIf,
        FacetModule,
        FormLabelModule,
        TextComponent,
        RatingIndicatorModule,
        AvatarModule,
        ObjectStatusModule,
        ObjectNumberModule,
        SkeletonModule
    ]
})
export class FacetLoadingExampleComponent {
    loading = true;
}
