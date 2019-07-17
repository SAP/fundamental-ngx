import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MenuKeyboardService } from '../../../../../../library/src/lib/menu/menu-keyboard.service';
import { MenuComponent } from '../../../../../../library/src/lib/menu/menu.component';

@Component({
    selector: 'fd-menu-keyboard-support-example',
    templateUrl: 'menu-keyboard-support-example.component.html',
    providers: [
        MenuKeyboardService
    ]
})
export class MenuKeyboardSupportExampleComponent implements AfterViewInit {

    @ViewChild(MenuComponent)
    menuComponent: MenuComponent;

    constructor (private menuKeyboardService: MenuKeyboardService) {}

    public focusFirst() {
        this.menuKeyboardService.focusFirst();
    }

    public escapeAfterListFunction = () => {
        alert('Escaped After list');
    };

    public onClick() {
        alert('Element clicked');
    }

    ngAfterViewInit(): void {
        this.menuKeyboardService.initialise(this.menuComponent);
        this.menuKeyboardService.focusEscapeAfterList = this.escapeAfterListFunction;
    }
}
