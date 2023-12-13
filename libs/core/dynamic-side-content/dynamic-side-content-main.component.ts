import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    Renderer2,
    forwardRef
} from '@angular/core';

import { DYNAMIC_SIDE_CONTENT_CHILD_TOKEN, DYNAMIC_SIDE_CONTENT_CLASS_NAME } from './constants';

let componentId = 0;

@Component({
    selector: 'fd-dynamic-side-content-main',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DYNAMIC_SIDE_CONTENT_CHILD_TOKEN,
            useExisting: forwardRef(() => DynamicSideContentMainComponent)
        }
    ],
    standalone: true
})
export class DynamicSideContentMainComponent implements OnInit {
    /** Unique element Id, by default it's auto generated */
    @Input()
    @HostBinding('attr.id')
    id = 'fd-dynamic-side-content-main-id-' + componentId++;

    /** @ignore */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) {}

    /** @ignore */
    ngOnInit(): void {
        this._addClassName(DYNAMIC_SIDE_CONTENT_CLASS_NAME.main);
    }

    /** @ignore */
    private _addClassName(className: string): void {
        return this._render.addClass(this._elementRef.nativeElement, className);
    }
}
