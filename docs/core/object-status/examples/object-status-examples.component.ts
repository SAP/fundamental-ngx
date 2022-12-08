import { Component } from '@angular/core';

@Component({
    selector: 'fd-object-status-text-example',
    templateUrl: './object-status-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss']
})
export class ObjectStatusTextExampleComponent {}

@Component({
    selector: 'fd-object-status-generic-text-example',
    templateUrl: './object-status-generic-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss']
})
export class ObjectStatusGenericExampleComponent {}

@Component({
    selector: 'fd-object-status-numeric-icon-example',
    templateUrl: './object-status-icon-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss']
})
export class ObjectStatusTextIconExampleComponent {}

@Component({
    selector: 'fd-object-status-clickable-and-icon-example',
    templateUrl: './object-status-clickable-and-icon-example.component.html',
    styleUrls: ['./object-status-examples.component.scss']
})
export class ObjectStatusClickableAndIconExampleComponent {
    showAlert(): void {
        alert('you clicked the clickable ObjectStatus');
    }
}

@Component({
    selector: 'fd-object-status-inverted-example',
    templateUrl: './object-status-inverted-example.component.html',
    styleUrls: ['./object-status-examples.component.scss']
})
export class ObjectStatusInvertedTextExampleComponent {}

@Component({
    selector: 'fd-object-status-inverted-generic-text-example',
    templateUrl: './object-status-inverted-generic-text-example.component.html',
    styleUrls: ['./object-status-examples.component.scss']
})
export class ObjectStatusInvertedGenericTextExampleComponent {}

@Component({
    selector: 'fd-object-status-object-status-large-example',
    templateUrl: './object-status-large-example.component.html',
    styleUrls: ['./object-status-examples.component.scss']
})
export class ObjectStatusLargeExampleComponent {
    showAlert(index): void {
        alert('clicked alert large at index:- ' + index);
    }
}
