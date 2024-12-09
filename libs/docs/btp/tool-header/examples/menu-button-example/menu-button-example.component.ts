import { Component } from '@angular/core';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import { ToolHeaderAutoModeDirective, ToolHeaderComponent } from '@fundamental-ngx/btp/tool-header';

@Component({
    selector: 'fdb-tool-header-menu-button-example',
    template: `
        <fdb-tool-header
            id="menuButtonToolHeader"
            productName="Fundamental-ngx"
            fdbToolHeaderAutoMode
            showMenuButton
            (menuCollapse)="lastAction = 'collapse'"
            (menuExpand)="lastAction = 'expand'"
            (menuClick)="lastAction = 'menu click'"
        >
            <fdb-search-field />
        </fdb-tool-header>
        <div [style.margin-top.rem]="2">Last action: {{ lastAction }}</div>
    `,
    imports: [SearchFieldComponent, ToolHeaderAutoModeDirective, ToolHeaderComponent]
})
export class MenuButtonExampleComponent {
    lastAction: string;
}
