import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'fdp-select',
    templateUrl: './select-platform.component.html',
    styleUrls: ['./select-platform.component.scss']
   })
export class SelectPlatformComponent implements OnInit {
    @Input()
    selectType: string = '';

    @Input()
    gylph: string = '';

    @Input()
    list: any[] = [];

    @Input()
    compact: boolean = false;

    @Input()
    value: any;

    @Input()
    placeholder: string = '';

    /**
    * The template with which to display the individual listed items.
    * Use it by passing an ng-template with implicit content. See examples for more info.
    */
    @Input()
    itemTemplate: TemplateRef<any>;

    @Input()
    displayFn: Function = this.defaultDisplay;


    constructor() { }

    ngOnInit() {
    }

    private defaultDisplay(str: any): string {
         return str;
    }

}
