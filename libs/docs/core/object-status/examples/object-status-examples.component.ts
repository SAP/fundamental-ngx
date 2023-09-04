import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-object-status-text-example',
    templateUrl: './object-status-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusModule]
})
export class ObjectStatusTextExampleComponent {}

@Component({
    selector: 'fd-object-status-generic-text-example',
    templateUrl: './object-status-generic-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [NgFor, ObjectStatusModule]
})
export class ObjectStatusGenericExampleComponent {}

@Component({
    selector: 'fd-object-status-numeric-icon-example',
    templateUrl: './object-status-icon-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusModule]
})
export class ObjectStatusTextIconExampleComponent {}

@Component({
    selector: 'fd-object-status-clickable-and-icon-example',
    templateUrl: './object-status-clickable-and-icon-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusModule, NgFor]
})
export class ObjectStatusClickableAndIconExampleComponent {
    showAlert(): void {
        alert('you clicked the clickable ObjectStatus');
    }
}

@Component({
    selector: 'fd-object-status-inverted-example',
    templateUrl: './object-status-inverted-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusModule]
})
export class ObjectStatusInvertedTextExampleComponent {}

@Component({
    selector: 'fd-object-status-inverted-generic-text-example',
    templateUrl: './object-status-inverted-generic-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [NgFor, ObjectStatusModule]
})
export class ObjectStatusInvertedGenericTextExampleComponent {}

@Component({
    selector: 'fd-object-status-object-status-large-example',
    templateUrl: './object-status-large-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusModule]
})
export class ObjectStatusLargeExampleComponent {
    showAlert(index): void {
        alert('clicked alert large at index:- ' + index);
    }
}
