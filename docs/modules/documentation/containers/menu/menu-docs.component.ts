import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
})
export class MenuDocsComponent implements OnInit {
    menuHtml = `<fd-menu>
    <fd-menu-list>
        <fd-menu-item [url]="'#'">
            Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
            Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
            Option 3
        </fd-menu-item>
    </fd-menu-list>
</fd-menu>`;

    menuGroupHtml = `<fd-menu>
    <fd-menu-list>
        <fd-menu-item [url]="'#'">
            Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
            Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
            Option 3
        </fd-menu-item>
    </fd-menu-list>
    <fd-menu-group>
        <fd-menu-title>
            Group header
        </fd-menu-title>
            <fd-menu-list>
                <fd-menu-item [routerLink]="'#'">
                    Option 4
                </fd-menu-item>
                <fd-menu-item [routerLink]="'#'">
                    Option 5
                </fd-menu-item>
                <fd-menu-item [routerLink]="'#'">
                    Option 6
                </fd-menu-item>
            </fd-menu-list>
    </fd-menu-group>
</fd-menu>`;

    constructor() {}

    ngOnInit() {}
}
