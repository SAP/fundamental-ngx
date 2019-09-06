import { ElementRef, OnChanges, OnInit } from '@angular/core';
/** @hidden */
export declare abstract class AbstractFdNgxClass implements OnInit, OnChanges {
    private _elementRef;
    /** @hidden */
    class: any;
    /** @hidden */
    abstract _setProperties(): void;
    /** @hidden */
    _addClassToElement(className: string): void;
    /** @hidden */
    _addStyleToElement(attribute: any, value: any): void;
    /** @hidden */
    protected constructor(elementRef: ElementRef);
    /** @hidden */
    ngOnChanges(): void;
    /** @hidden */
    ngOnInit(): void;
}
