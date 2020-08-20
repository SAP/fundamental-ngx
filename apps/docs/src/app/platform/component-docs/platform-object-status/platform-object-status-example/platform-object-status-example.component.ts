import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-object-status-example',
    templateUrl: './platform-object-status-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusExampleComponent {}

@Component({
    selector: 'fdp-object-status-text-example',
    templateUrl: './platform-object-status-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusTextExampleComponent {}

@Component({
    selector: 'fdp-object-status-generic-text-example',
    templateUrl: './platform-object-status-generic-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusGenericExampleComponent {}

@Component({
    selector: 'fdp-object-status-numeric-icon-example',
    templateUrl: './platform-object-status-icon-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusTextIconExampleComponent {}

@Component({
    selector: 'fdp-object-status-clickable-and-icon-example',
    templateUrl: './platform-object-status-clickable-and-icon-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusClickableAndIconExampleComponent {
    showAlert(index: number): void {
        alert('you clicked the clickable ObjectStatus' + index);
    }
    showObjectStatus(): void {
        alert('you clicked the clickable ObjectStatus');
    }
}

@Component({
    selector: 'fdp-object-status-inverted-example',
    templateUrl: './platform-object-status-inverted-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusInvertedTextExampleComponent {}

@Component({
    selector: 'fdp-object-status-inverted-generic-text-example',
    templateUrl: './platform-object-status-inverted-generic-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusInvertedGenericTextExampleComponent {}

@Component({
    selector: 'fdp-object-status-object-status-large-example',
    templateUrl: './platform-object-status-large-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusLargeExampleComponent {
    showAlert(): void {
        alert('clicked alert large');
    }
}
