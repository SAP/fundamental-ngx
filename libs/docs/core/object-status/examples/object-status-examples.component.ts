import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ColorAccent } from '@fundamental-ngx/cdk/utils';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-object-status-text-example',
    templateUrl: './object-status-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusComponent]
})
export class ObjectStatusTextExampleComponent {}

@Component({
    selector: 'fd-object-status-generic-text-example',
    templateUrl: './object-status-generic-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [NgFor, ObjectStatusComponent]
})
export class ObjectStatusGenericExampleComponent {
    indicators: ColorAccent[] = new Array(8).fill(null).map((_, index) => (index + 1) as ColorAccent);
}

@Component({
    selector: 'fd-object-status-numeric-icon-example',
    templateUrl: './object-status-icon-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusComponent]
})
export class ObjectStatusTextIconExampleComponent {}

@Component({
    selector: 'fd-object-status-clickable-and-icon-example',
    templateUrl: './object-status-clickable-and-icon-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusComponent, NgFor]
})
export class ObjectStatusClickableAndIconExampleComponent {
    indicators: ColorAccent[] = new Array(8).fill(null).map((_, index) => (index + 1) as ColorAccent);
    showAlert(): void {
        alert('you clicked the clickable ObjectStatus');
    }
}

@Component({
    selector: 'fd-object-status-inverted-example',
    templateUrl: './object-status-inverted-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusComponent]
})
export class ObjectStatusInvertedTextExampleComponent {}

@Component({
    selector: 'fd-object-status-inverted-generic-text-example',
    templateUrl: './object-status-inverted-generic-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [NgFor, ObjectStatusComponent]
})
export class ObjectStatusInvertedGenericTextExampleComponent {
    indicators: ColorAccent[] = new Array(10).fill(null).map((_, index) => (index + 1) as ColorAccent);
}

@Component({
    selector: 'fd-object-status-object-status-large-example',
    templateUrl: './object-status-large-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusComponent]
})
export class ObjectStatusLargeExampleComponent {
    showAlert(index): void {
        alert('clicked alert large at index:- ' + index);
    }
}
