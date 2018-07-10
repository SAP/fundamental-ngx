import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar-docs.component.html'
})
export class NavbarDocsComponent {
    navbarHtml = `<fd-navbar>
    <div fd-navbar-group [position]="'left'">
        <div class="fd-global-nav__side-menu">
            <button class=" fd-button--secondary fd-button--l sap-icon--menu2 fd-global-nav__btn" aria-label="BUTTON_LABEL"></button>
        </div>
        <div class="fd-global-nav__logo fd-has-margin-left-none"></div>
        <div class="fd-global-nav__product-name">
            Product Name
        </div>
    </div>

    <div fd-navbar-group [hasLaunchpad]="true">
        <button class=" fd-button--secondary fd-button--l" aria-haspopup="true" aria-controls="launchpad">Suite Name</button>
    </div>

    <div fd-navbar-group [position]="'right'">
        <div fd-navbar-context-menu>
        <fd-dropdown fd-dropdown-control-no-border>
            Context Switcher
            <fd-dropdown-item>Option 1</fd-dropdown-item>
            <fd-dropdown-item>Option 2</fd-dropdown-item>
            <fd-dropdown-item>Option 3</fd-dropdown-item>
            <fd-dropdown-group>
                <fd-dropdown-header>Group Header</fd-dropdown-header>
                <fd-dropdown-item>Option 4</fd-dropdown-item>
                <fd-dropdown-item>Option 5</fd-dropdown-item>
                <fd-dropdown-item>Option 6</fd-dropdown-item>
            </fd-dropdown-group>
        </fd-dropdown>
        </div>

        <div fd-navbar-actions>
        <div class="fd-global-nav__search">
            <button class=" fd-button--secondary fd-button--m sap-icon--search fd-global-nav__btn" aria-label="BUTTON_LABEL" aria-controls="3Ac1t348"
            aria-haspopup="true" aria-expanded="false"></button>
            <input type="text" class="fd-form__control" id="3Ac1t348" aria-hidden="true" placeholder="Search... ">
        </div>
        <button class=" fd-button--secondary fd-button--m sap-icon--action-settings fd-global-nav__btn" aria-label="BUTTON_LABEL"></button>
        <button class=" fd-button--secondary fd-button--m fd-global-nav__btn" aria-label="BUTTON_LABEL">
            <span class=" fd-identifier--s fd-identifier--circle">WW</span>
        </button>
        </div>
    </div>
</fd-navbar>`;
}
