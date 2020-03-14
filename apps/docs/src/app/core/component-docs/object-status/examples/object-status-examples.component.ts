import { Component } from '@angular/core';

@Component({
    selector: 'fd-object-status-default-example',
    templateUrl: './object-status-default-example.component.html'
})
export class ObjectStatusDefaultExampleComponent { }

@Component({
    selector: 'fd-object-status-text-example',
    templateUrl: './object-status-text-example.component.html'
})
export class ObjectStatusTextExampleComponent { }

@Component({
    selector: 'fd-object-status-generic-text-example',
    templateUrl: './object-status-generic-text-example.component.html'
})
export class ObjectStatusGenericExampleComponent { }

@Component({
    selector: 'fd-object-status-numeric-icon-example',
    templateUrl: './object-status-icon-text-example.component.html'
})
export class ObjectStatusTextIconExampleComponent { }

@Component({
    selector: 'fd-object-status-clickable-and-icon-example',
    templateUrl: './object-status-clickable-and-icon-example.component.html'
})
export class ObjectStatusClickableAndIconExampleComponent { 
    showAlert() {
        alert('you clicked the clickable ObjectStatus');
    }
}

@Component({
    selector: 'fd-object-status-inverted-example',
    templateUrl: './object-status-inverted-example.component.html'
})
export class ObjectStatusInvertedTextExampleComponent { }

@Component({
    selector: 'fd-object-status-inverted-generic-text-example',
    templateUrl: './object-status-inverted-generic-text-example.component.html'
})
export class ObjectStatusInvertedGenericTextExampleComponent { }

@Component({
    selector: 'fd-object-status-inverted-icon-and-text-example',
    templateUrl: './object-status-inverted-icon-and-text-example.component.html'
})
export class ObjectStatusInvertedGenericIconAndTextExampleComponent { }

@Component({
    selector: 'fd-object-status-object-status-large-example',
    templateUrl: './object-status-large-example.component.html'
})
export class ObjectStatusLargeExampleComponent { 

    showAlert(index) {
        alert('clicked alert large at index:- ' + index);
    }

}
