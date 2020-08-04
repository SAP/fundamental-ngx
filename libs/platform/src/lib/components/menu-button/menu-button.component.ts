import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewEncapsulation
} from '@angular/core';
import { ButtonType } from '@fundamental-ngx/core';
import { BaseComponent } from '../base';

@Component({
    selector: 'fdp-menu-button',
    templateUrl: './menu-button.component.html',
    styleUrls: ['./menu-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MenuButtonComponent extends BaseComponent {
    /** text for tooltip */
    @Input()
    title: string;

    /** The Sap-icon to include in the menu-button */
    @Input()
    icon: string;

    /** The type of the button. Types include 'standard', 'positive', 'negative', 'transparent', 'attention', 'emphasized', 'ghost'.
     * Leave empty for default.'*/
    @Input()
    type: ButtonType;

    /** Event sent when menu-button is clicked */
    @Output()
    buttonClicked: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    constructor(_cd: ChangeDetectorRef) {
        super(_cd);
    }

    /**
     *  Handles menu-button click
     */
    public onButtonClick($event: any): void {
        this.buttonClicked.emit($event);
    }
}
