import { Component } from '@angular/core';

@Component({
    selector: 'fd-side-navigation-programmatically-example',
    templateUrl: './side-navigation-programmatically-example.component.html'
})
export class SideNavigationProgrammaticallyExampleComponent {

    open: boolean = true;

    selected: boolean = true;
    selectedParent: boolean = false;
}
