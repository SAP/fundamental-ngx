import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    HostBinding,
    OnInit
} from '@angular/core';
import { ButtonType } from '@fundamental-ngx/core';
import { BaseComponent } from '../base';

@Component({
    selector: 'fdp-menu-button',
    templateUrl: './menu-button.component.html',
    styleUrls: ['./menu-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuButtonComponent extends BaseComponent implements OnInit {
    /** Label for menu button */
    @Input()
    label: string;

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

    /**
     * @hidden disabling fd-button does not disables menu button. because menu trigger is on menu-button; menu gets open.
     * to prevent this, need to apply is-disabled at menu-button level as well.
     */
    @HostBinding('class.is-disabled')
    menuButtonDisabled = false;

    // tabindex for button.
    tabindex = 0;

    constructor(_cd: ChangeDetectorRef) {
        super(_cd);
    }

    /** @hidden */
    ngOnInit(): void {
        this.menuButtonDisabled = this.disabled;
        this.tabindex = this.disabled ? -1 : 0;
    }

    /**
     *  Handles menu-button click
     */
    public onButtonClick($event: any): void {
        this.buttonClicked.emit($event);
    }
}
