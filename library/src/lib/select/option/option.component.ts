import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OptionComponent implements OnInit {

    /** Value of the option. Similar to how a native select operates. */
    @Input()
    value: any;

    /** Whether to disable this option specifically. */
    @Input()
    disabled: boolean = false;

    /** Override for the view value of the option. If none is provided, the text content is used. */
    @Input()
    viewValue: string;

    /** Emitted when the selected state changes. */
    @Output()
    readonly selectedChange: EventEmitter<OptionComponent>
        = new EventEmitter<OptionComponent>();

    private selected: boolean = false;

    constructor(private elRef: ElementRef) {}

    ngOnInit() {
    }

    get viewValueText(): string {
        return this.viewValue ? this.viewValue :
            ((this.elRef.nativeElement as HTMLElement).textContent || '').trim();
    }

    setSelected(value: boolean): void {
        this.selected = value;
        this.selectedChange.emit(this);
    }

}
