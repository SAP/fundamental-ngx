import { ElementRef, OnChanges, OnInit, Input } from '@angular/core';

export abstract class CustomClassBaseComponent implements OnInit, OnChanges {
    private _elementRef: ElementRef;

    @Input() class; // user's custom classes

    abstract _setProperties(): void;

    _addClassToElement(className: string) {
        (this._elementRef.nativeElement as HTMLElement).classList.add(className);
    }

    protected constructor(elementRef: ElementRef) {
        this._elementRef = elementRef;
        this._setProperties();
    }

    ngOnChanges() {
        const classList = (this._elementRef.nativeElement as HTMLElement).classList;
        while (classList.length > 0) {
            classList.remove(classList.item(0));
        }
        if (this.class) {
            this._addClassToElement(this.class);
        }
        this._setProperties();
    }

    ngOnInit() {
        this._setProperties();
    }
}
