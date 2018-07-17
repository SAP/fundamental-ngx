import { ElementRef, OnChanges, OnInit, Input } from '@angular/core';

/*
 This abstract class allows the user to set their own custom classes on a Fundamental NGX directive, in addition to the
 classes the library needs to add itself.
 When library classes were added through the directive's host: {'[class]'} property, any classes the user added would be
 overwritten.  By extending this class, we instead add library classes to the user's classList rather than replace them.
 */

export abstract class AbstractCustomClassManager implements OnInit, OnChanges {
    private _elementRef: ElementRef;

    @Input() class; // user's custom classes

    /*
     each directive that extends this class will implement this function and populate it with one or more calls to
     the '_addClassToElement' function, passing the class names to be added with each call
     */
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
