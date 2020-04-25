import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { MenuItemDirective, MenuKeyboardService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-menu-keyboard-support-example',
    templateUrl: 'menu-keyboard-support-example.component.html',
    providers: [MenuKeyboardService]
})
export class MenuKeyboardSupportExampleComponent implements AfterViewInit {
    @ViewChildren(MenuItemDirective)
    menuItems: QueryList<MenuItemDirective>;

    constructor(private menuKeyboardService: MenuKeyboardService) {}

    public focusFirst() {
        this.menuItems.first.focus();
    }

    public escapeAfterListFunction = () => {
        alert('Escaped After list');
    };

    public onClick() {
        alert('Element clicked');
    }

    public handleKeyDown(event: KeyboardEvent, index: number): void {
        this.menuKeyboardService.keyDownHandler(event, index, this.menuItems.toArray());
    }

    ngAfterViewInit(): void {
        this.menuKeyboardService.focusEscapeAfterList = this.escapeAfterListFunction;
    }
}
