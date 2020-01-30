import { ElementRef, OnChanges, OnInit, Input } from '@angular/core';

/*
 This abstract class allows the user to set their own custom styles on a Fundamental NGX directive, in addition to the
 styles the library needs to add itself.
 When library styles were added through the directive's host: {'[class]'} property, any styles the user added would be
 overwritten.  By extending this class, we instead add library styles to the user's classList rather than replace them.
 */

/** @hidden */
export abstract class AbstractFdNgxClass implements OnInit, OnChanges {
    private _elementRef: ElementRef;

    /** @hidden */
    @Input() class: string // user's custom classes

    /*
     each directive that extends this class will implement this function and populate it with one or more calls to
     the '_addClassToElement' function, passing the style names to be added with each call
     */
    /** @hidden */
    abstract _setProperties(): void;

    _setClassToElement(className: string): void {
        (this._elementRef.nativeElement as HTMLElement).classList.value = `${className} ${this.class}`;
    }

    _clearElementClass(): void {
        (this._elementRef.nativeElement as HTMLElement).classList.value = '';
    }

    /** @hidden */
    _addClassToElement(className: string): void {
        (this._elementRef.nativeElement as HTMLElement).classList.add(...className.split(' '));
    }

    /** @hidden */
    _addStyleToElement(attribute, value): void {
        (this._elementRef.nativeElement as HTMLElement).style[attribute] = value;
    }

    /** @hidden */
    protected constructor(elementRef: ElementRef) {
        this._elementRef = elementRef;
        this._setProperties();
    }

    /** @hidden */
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

    /** @hidden */
    ngOnInit() {
        this._setProperties();
    }
}
