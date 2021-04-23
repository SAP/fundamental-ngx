import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-facet-group-example',
    templateUrl: './facet-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetGroupExampleComponent {
}

@Component({
  selector: 'fd-form-facet-example',
  templateUrl: './form-facet-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFacetExampleComponent {
}

@Component({
  selector: 'fd-form-link-facet-example',
  templateUrl: './form-link-facet-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLinkFacetExampleComponent {
}

@Component({
  selector: 'fd-image-facet-example',
  templateUrl: './image-facet-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageFacetExampleComponent {
}

@Component({
  selector: 'fd-key-value-facet-example',
  templateUrl: './key-value-facet-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyValueFacetExampleComponent {
}

@Component({
  selector: 'fd-key-value-facet-alignment-example',
  templateUrl: './key-value-facet-alignment-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyValueFacetAlignmentExampleComponent {
}

@Component({
  selector: 'fd-rating-indicator-facet-example',
  templateUrl: './rating-indicator-facet-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingIndicatorFacetExampleComponent {
}
