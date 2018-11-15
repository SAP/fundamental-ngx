import { Component } from '@angular/core';

import * as navbarSrc from '!raw-loader!./examples/navbar-example.component.html';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar-docs.component.html'
})
export class NavbarDocsComponent {
    navbarHtml = navbarSrc;
}
