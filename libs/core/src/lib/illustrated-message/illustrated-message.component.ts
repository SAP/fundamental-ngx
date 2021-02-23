import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';

export type IllustratedMessageType = '' | 'spot' | 'dialog';
export type IllustratedMessageSize = '' | 'sm';
let illustratedMessageUniqueId = 0;

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-illustrated-message]',
    template: `
        <ng-content select="fd-illustrated-message-illustration"></ng-content>
        <ng-content select="[fd-illustrated-message-figcaption]"></ng-content>
        <ng-content select="fd-illustrated-message-actions"></ng-content>
    `,
    styleUrls: ['./illustrated-message.component.scss'],

    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IllustratedMessageComponent implements OnChanges, OnInit, CssClassBuilder {
    /** 
     * The type of the Illustrated Message
     * Options include: '' | 'spot' | 'dialog'
     * The '' corresponds to scene(default) type
     */
    @Input() type: IllustratedMessageType;

    /** 
     * The size of the Illustrated Message
     * Options include: '' | 'sm'
     * The default is set to ''
     */
    @Input() size: IllustratedMessageSize;

    /** 
     * Id of the Illustrated Message
     * If not provided, a default one is generated
     */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-illustrated-message-' + illustratedMessageUniqueId++;

    /** User's custom classes */
    @Input()
    class: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-illustrated-message',
            this.type ? `fd-illustrated-message--${this.type}` : '',
            this.size ? `fd-illustrated-message--${this.size}` : '',
            this.class
        ];
    }
    
    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
