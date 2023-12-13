import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { NgTemplateOutlet } from '@angular/common';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import {
    DYNAMIC_SIDE_CONTENT_CHILD_TOKEN,
    DYNAMIC_SIDE_CONTENT_CLASS_NAME,
    DynamicSideContentPosition,
    DynamicSideContentSize
} from './constants';
import { DynamicSideContentMainComponent } from './dynamic-side-content-main.component';
import { DynamicSideContentSideComponent } from './dynamic-side-content-side.component';
import { getPositionClassName, getSizeClassName } from './utils';

let componentId = 0;

@Component({
    selector: 'fd-dynamic-side-content',
    templateUrl: './dynamic-side-content.component.html',
    styleUrl: './dynamic-side-content.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet]
})
export class DynamicSideContentComponent implements CssClassBuilder, OnChanges, OnInit, AfterContentInit {
    /**
     * Side content position, can be 'left' | 'right' | 'bottom' | 'equalSplit' | 'none'.
     */
    @Input()
    set position(position: DynamicSideContentPosition) {
        this._position = position;

        this._calculateSidePosition();
    }
    get position(): DynamicSideContentPosition {
        return this._position;
    }

    /**
     * Screen size, can be 'sm' | 'md' | 'lg' | 'xl'.
     */
    @Input()
    size: DynamicSideContentSize = 'xl';

    /** Unique element Id, by default it's auto generated */
    @Input()
    @HostBinding('attr.id')
    id = 'fd-dynamic-side-content-id-' + componentId++;

    /**
     * @ignore
     * required by CssClassBuilder
     */
    class: string;

    /**
     * @ignore
     * Indicates when side content should be rendered before or after main content
     */
    _isSideBefore = true;

    /** @ignore */
    @ContentChildren(DYNAMIC_SIDE_CONTENT_CHILD_TOKEN as any)
    private _children: QueryList<DynamicSideContentMainComponent | DynamicSideContentSideComponent>;

    /** @ignore */
    private _isSideProjectedAsFirst = false;

    /** @ignore */
    private _position: DynamicSideContentPosition = 'none';

    /** @ignore */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngAfterContentInit(): void {
        this._listenToChildrenOrder();
    }

    /** @ignore */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            DYNAMIC_SIDE_CONTENT_CLASS_NAME.container,
            getSizeClassName(this.size),
            getPositionClassName(this.position)
        ].filter((v): v is string => !!v);
    }

    /** @ignore */
    private _listenToChildrenOrder(): void {
        this._children.changes.pipe(startWith(this._children)).subscribe(() => {
            this._isSideProjectedAsFirst = this._children.first instanceof DynamicSideContentSideComponent;

            this._calculateSidePosition();

            this._changeDetectorRef.markForCheck();
        });
    }

    /** @ignore */
    private _calculateSidePosition(): void {
        const position = this._position;

        if (position === 'none' || position === 'equalSplit' || !position) {
            this._isSideBefore = this._isSideProjectedAsFirst;
        }

        if (position === 'left') {
            this._isSideBefore = true;
        }

        if (position === 'right' || position === 'bottom') {
            this._isSideBefore = false;
        }
    }
}
