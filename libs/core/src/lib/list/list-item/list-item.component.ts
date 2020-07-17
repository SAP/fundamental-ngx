import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { CheckboxComponent } from '../../checkbox/checkbox/checkbox.component';
import { DefaultMenuItem } from '../../menu/default-menu-item.class';
import { RadioButtonComponent } from '../../radio/radio-button/radio-button.component';

/**
 * The component that represents a list item.
 * The list item can contain plain text, links or actions.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fdListItem] ,[fd-list-item]',
    templateUrl: './list-item.component.html',
    host: {
        class: 'fd-list__item',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ListItemComponent implements DefaultMenuItem {
    /** Whether list is selected */
    @Input()
    @HostBinding('attr.aria-selected')
    @HostBinding('class.is-selected')
    selected = false;

    /** Whether list is selected */
    @Input()
    @HostBinding('class.fd-list__item--link')
    link = false;

    /** tab index attribute */
    @Input()
    @HostBinding('attr.tabindex')
    tabIndex = 0;

    /** Whether there is no data inside list item */
    @Input()
    @HostBinding('class.fd-list__item--no-data')
    noData = false;

    /** Whether there is item performs some action */
    @Input()
    @HostBinding('class.fd-list__item--action')
    action = false;

    /** Keydown Event emitter */
    @Output()
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    @ContentChild(CheckboxComponent)
    checkbox: CheckboxComponent;

    /** @hidden */
    @ContentChild(RadioButtonComponent)
    radio: RadioButtonComponent;

    constructor(
        public elementRef: ElementRef,
        private _changeDet: ChangeDetectorRef
    ) {}

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        if (this.checkbox) {
            this.checkbox.nextValue();
        }
        if (this.radio) {
            this.radio.labelClicked();
        }
    }

    /** @hidden */
    click(): void {
        this.elementRef.nativeElement.click();
    }

    /** @hidden */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
