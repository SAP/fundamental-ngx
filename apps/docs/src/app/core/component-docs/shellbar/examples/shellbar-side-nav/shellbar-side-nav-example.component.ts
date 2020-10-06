import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-shellbar-side-nav-example',
    templateUrl: './shellbar-side-nav-example.component.html',
    styleUrls: ['./shellbar-side-nav-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShellbarSideNavExampleComponent {
    condensed = false;
}
