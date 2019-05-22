import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OptionComponent implements OnInit {

    @Input()
    value: any;

    @Input()
    selected: boolean = false;

    @Output()
    readonly selectedChange: EventEmitter<OptionComponent>
        = new EventEmitter<OptionComponent>();

    constructor() {
    }

    ngOnInit() {
    }

}
