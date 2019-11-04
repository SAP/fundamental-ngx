import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'fdp-select',
    templateUrl: './select-platform.component.html',
    styleUrls: ['./select-platform.component.scss']
})
export class SelectPlatformComponent implements OnInit {

    /** variable used to inject the value from platform to core compomnent to select the type of button. */
    @Input()
    selectType: string = '';

    /** this variable is to input the icon in the select component. */
    @Input()
    gylph: string = '';

    /** variable to input any type of object. */
    @Input()
    list: any[] = [];

    /** variable to allow the compact sizing of the select component. */
    @Input()
    compact: boolean = false;

    /** variable to allow the accessing of the selcted value. */
    @Input()
    value: any;

    /** placeholder value for the selcect component. */
    @Input()
    placeholder: string = '';

    /** overriding methord for the allowing to handle complex object. */
    @Input()
    displayFn: Function = this.defaultDisplay;


    constructor() { }

    ngOnInit() {
    }

    private defaultDisplay(str: any): string {
         return str;
    }

}
