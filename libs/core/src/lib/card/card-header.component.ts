import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2, ContentChild } from '@angular/core';

import { AvatarComponent } from '../avatar/avatar.component';

import { CLASS_NAME } from './constants';

@Component({
    selector: 'fd-card-header',
    templateUrl: './card-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeaderComponent implements OnInit {
    /** @hidden */
    @ContentChild(AvatarComponent)
    _avatar: AvatarComponent;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._setAttributeToHostElement('tabindex', 0);

        this._addClassNameToHostElement(CLASS_NAME.cardHeader);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._addClassName(this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassName(element: HTMLElement, className: string): void {
        this._renderer.addClass(element, className);
    }

    /**@hidden */
    private _setAttributeToHostElement(attribute: string, value: any): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, attribute, value);
    }
}
