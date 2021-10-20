import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'fn-tab',
    templateUrl: './tab.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
    /** The value of the tab. */
    @Input()
    title: string;

    /** Whether the tab is active or not. */
    @Input()
    active = false;

    /** Disabled state for tab item */
    @Input()
    @HostBinding('attr.aria-disabled')
    @HostBinding('class.is-disabled')
    disabled = false;

    /** @hidden */
    constructor(private _cd: ChangeDetectorRef) {}

    /** A function that sets the active state of the tab. */
    setActive(value: boolean): void {
        this.active = value;
        this._cd.detectChanges();
    }
}
