import { Component } from '@angular/core';

@Component({
    selector: 'fd-shellbar-collapsible-example',
    templateUrl: './shellbar-collapsible-example.component.html'
})
export class ShellbarCollapsibleExampleComponent {

    applicationList = [
        {name: 'Application A'},
        {name: 'Application B'},
        {name: 'Application C'},
        {name: 'Application D'}
    ];

    collapsedItems = [
        {name: 'Notifications'},
        {name: 'Pool'},
        {name: 'Product Switcher'}
    ];

    productSwitcherList = [
        {name: 'Fiori Home', imagePath: './assets/01.png'},
        {name: 'S/4 HANA Cloud', imagePath: './assets/02.png'},
        {name: 'Analytics Cloud', imagePath: './assets/03.png'},
        {name: 'Ariba', imagePath: './assets/04.png'},
        {name: 'SuccessFactors', imagePath: './assets/05.png'},
        {name: 'Commerce Cloud', imagePath: './assets/06.png'},
        {name: 'Gigya', imagePath: './assets/07.png'},
        {name: 'Callidus Cloud', imagePath: './assets/08.png'},
        {name: 'Fieldglass', imagePath: './assets/09.png'},
        {name: 'Concur', imagePath: './assets/10.png'},
        {name: 'Cloud for Customer', imagePath: './assets/11.png'},
        {name: 'Cloud Portal', imagePath: './assets/12.png'},
    ];

}
