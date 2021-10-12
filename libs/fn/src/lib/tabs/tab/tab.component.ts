import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fn-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {
    @Input()
    title: string;

    @Input()
    active = false;

    /** Disabled state for tab item */
    @Input()
    @HostBinding('attr.aria-disabled')
    @HostBinding('class.is-disabled')
    disabled = false;

    expanded = false;

    constructor(
        private _cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {}

    setActive(value: boolean) {
        this.active = value;
        this._cd.detectChanges();
    }
}
