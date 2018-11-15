import { Component } from '@angular/core';

@Component({
    selector: 'fd-input-group-button-example',
    templateUrl: './input-group-button-example.component.html'
})
export class InputGroupButtonExampleComponent {}

@Component({
    selector: 'fd-input-group-icon-example',
    templateUrl: './input-group-icon-example.component.html'
})
export class InputGroupIconExampleComponent {}

@Component({
    selector: 'fd-input-group-number-example',
    templateUrl: './input-group-number-example.component.html'
})
export class InputGroupNumberExampleComponent {

    numberValue = '123';

}

@Component({
    selector: 'fd-input-group-search-example',
    templateUrl: './input-group-search-example.component.html'
})
export class InputGroupSearchExampleComponent {

    searchTerm = 'Search Term';

}

@Component({
    selector: 'fd-input-group-text-example',
    templateUrl: './input-group-text-example.component.html'
})
export class InputGroupTextExampleComponent {}
