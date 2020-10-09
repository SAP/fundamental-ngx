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

import { CLASS_NAME, DYNAMIC_SIDE_CONTENT_CHILD_TOKEN } from './constants';

let componentId = 0;

@Component({
    selector: 'fd-dynamic-side-side',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DYNAMIC_SIDE_CONTENT_CHILD_TOKEN,
            useExisting: forwardRef(() => DynamicSideSideComponent)
        }
    ]
})
export class DynamicSideSideComponent implements OnInit {
    /** Element id */
    @Input()
    @HostBinding('attr.id')
    id = 'fd-dynamic-side-side-id-' + componentId++;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _render: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this.addClassName(CLASS_NAME.side);
    }

    /** @hidden */
    private addClassName(className: string): void {
        return this._render.addClass(this._elementRef.nativeElement, className);
    }
}
