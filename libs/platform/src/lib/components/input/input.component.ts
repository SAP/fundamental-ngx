import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';



type Size = 'cozy' | 'compact';
type State = 'warning' | 'valid' | 'invalid' | 'information';
type errorMsgType= 'success' | 'warning' | 'error' | 'information';
type InputType= 'text' | 'number' | 'email';

@Component({
     selector: 'fdp-input',
     templateUrl: './input.component.html',
     styleUrls: ['./input.component.scss'],
     encapsulation: ViewEncapsulation.None,
     changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPlatformComponent implements OnInit {

    @Input()
    inputType: InputType = 'text';

    @Input()
    state: State;
    
    @Input()
    size: Size;

    @Input()
    placeholder: String;

    @Input()
    errorMsgType: errorMsgType;

    @Input()
    errorMessage: String;

    @Input()
    compact: boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
