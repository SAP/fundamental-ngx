import {
    Component,
    OnInit,
    ElementRef,
    ChangeDetectionStrategy,
    Input,
    HostBinding,
    Renderer2,
    forwardRef
} from '@angular/core';

import { DYNAMIC_SIDE_CONTENT_CLASS_NAME, DYNAMIC_SIDE_CONTENT_CHILD_TOKEN } from './constants';

let componentId = 0;

@Component({
    selector: 'fd-dynamic-side-content-side',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DYNAMIC_SIDE_CONTENT_CHILD_TOKEN,
            useExisting: forwardRef(() => DynamicSideContentSideComponent)
        }
    ]
})
export class DynamicSideContentSideComponent implements OnInit {
    /** Unique element Id, by default it's auto generated */
    @Input()
    @HostBinding('attr.id')
    id = 'fd-dynamic-side-content-side-id-' + componentId++;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _render: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassName(DYNAMIC_SIDE_CONTENT_CLASS_NAME.side);
    }

    /** @hidden */
    private _addClassName(className: string): void {
        return this._render.addClass(this._elementRef.nativeElement, className);
    }
}
