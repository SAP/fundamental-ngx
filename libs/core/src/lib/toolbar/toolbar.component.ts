import {
    Component,
    ViewEncapsulation,
    AfterViewInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ElementRef,
    ViewChild,
    OnInit,
    forwardRef,
    ContentChildren,
    QueryList,
    ChangeDetectorRef,
    Renderer2,
    Input,
    OnDestroy
} from '@angular/core';
import { ToolbarItemDirective } from './toolbar-item.directive';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';
import { Observable, of, fromEvent } from 'rxjs';
import { delay, tap, debounceTime, takeWhile, distinctUntilChanged, switchMap } from 'rxjs/operators';

const ELEMENT_MARGIN = 8;
const OVERFLOW_SPACE = 50 + 2 * ELEMENT_MARGIN;
const MAX_CONTENT_SIZE = 99999999;

export type ToolbarType = 'solid' | 'transparent' | 'auto' | 'info';

export type ToolbarSize = 'cozy' | 'compact';

@Component({
    selector: 'fd-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked, CssClassBuilder {
    /** Property allows user to pass additional class
     */
    @Input()
    class: string;

    /** Determines if overflow button should be visible
     * Default value: false
     */
    @Input()
    shouldOverflow: boolean = false;

    /** Determines the type of toolbar
     * Available options: 'solid' | 'transparent' | 'auto' | 'info'
     * Default value: 'solid'
     */
    @Input()
    fdType: ToolbarType = 'solid';

    /** Determines the size of toolbar
     * Available options: 'cozy' | 'compact'
     * Default value: 'compact'
     */
    @Input()
    size: ToolbarSize = 'compact';

    /** Determines if toolbar contains text which size is equal to h4
     * Default value: false
     */
    @Input()
    hasTitle: boolean = false;

    /** Determines if toolbar should has active state (only when fdType == 'info')
     * Default value: false
     */
    @Input()
    active: boolean = false;

    /** Determines if toolbar should clear border bottom
     * Default value: false
     */
    @Input()
    clearBorder: boolean = false;

    /** @hidden */
    @ViewChild('toolbar')
    toolbar: ElementRef;

    /** @hidden */
    @ViewChild('overflowBody')
    overflowBody: ElementRef;

    /** @hidden */
    @ViewChild('overflowSpacer')
    overflowSpacer: ElementRef;

    /** @hidden */
    @ContentChildren(forwardRef(() => ToolbarItemDirective))
    toolbarItems: QueryList<ToolbarItemDirective>;

    /** @hidden */
    overflowVisibility: Observable<boolean>;

    /** @hidden */
    private get _toolbarWidth(): number {
        return (this.toolbar.nativeElement as HTMLElement).clientWidth - OVERFLOW_SPACE;
    }

    /** @hidden */
    private get _overflowBody(): HTMLElement {
        return this.overflowBody.nativeElement as HTMLElement;
    }

    /** @hidden */
    private get _toolbar(): HTMLElement {
        return this.toolbar.nativeElement as HTMLElement;
    }

    /** @hidden */
    private _overflowElements: ToolbarItemDirective[] = [];

    /** @hidden */
    private _normalElements: ToolbarItemDirective[] = [];

    /** @hidden */
    private _alive: boolean = true;

    /** @hidden */
    constructor(private _cd: ChangeDetectorRef, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit() {
        fromEvent(window, 'resize')
            .pipe(
                takeWhile(() => this._alive && this.shouldOverflow),
                debounceTime(100),
                distinctUntilChanged(),
                switchMap(() => this._onResize())
            )
            .subscribe();
    }

    /** @hidden */
    ngAfterViewInit() {
        if (this.shouldOverflow) {
            this._collapseItems();
        }

        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewChecked() {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy() {
        this._alive = false;
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.toolbar;
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string {
        return [
            'fd-toolbar',
            `fd-toolbar--${this.fdType}`,
            `${this.active && this.fdType === 'info' ? 'fd-toolbar--active' : ''}`,
            `${this.size === 'cozy' ? 'fd-toolbar--cozy' : ''}`,
            `${this.hasTitle ? 'fd-toolbar--title' : ''}`,
            `${this.clearBorder ? 'fd-toolbar--clear' : ''}`
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    /** @hidden */
    private _onResize(): Observable<boolean> {
        return of(true).pipe(
            tap(() => this._reset()),
            delay(5),
            tap(() => this._collapseItems())
        );
    }

    // shouldOverflow items
    /** @hidden */
    private _collapseItems(): void {
        this.toolbarItems.reduce((_contentWidth, toolbarItem) => {
            const itemWidth = this._getElementWidthWithMargin(toolbarItem);
            const shouldItemBeRemoved = this._shouldToolbarItemBeRemoved(itemWidth, _contentWidth);

            if (shouldItemBeRemoved) {
                this._removeToolbarItemFromDOM(toolbarItem);
                this._overflowElements.push(toolbarItem);
            } else {
                this._normalElements.push(toolbarItem);
            }

            return !shouldItemBeRemoved ? _contentWidth + itemWidth : MAX_CONTENT_SIZE;
        }, 0);

        this._addToolbarItemToOverflow(this._overflowElements);

        [...this._normalElements, ...this._overflowElements].forEach((x) =>
            this._changeItemVisibilityState(x.elementRef.nativeElement, true)
        );

        this._changeOverflowVisibleState(this._overflowElements.length > 0);

        this._cd.markForCheck();
    }

    /** @hidden */
    private _shouldToolbarItemBeRemoved(itemWidth: number, contentWidth: number): boolean {
        return contentWidth + itemWidth > this._toolbarWidth;
    }

    /** @hidden */
    private _getElementWidthWithMargin(toolbarItem: ToolbarItemDirective): number {
        return toolbarItem.elementRef.nativeElement.offsetWidth + ELEMENT_MARGIN;
    }

    /** @hidden */
    private _removeToolbarItemFromDOM(toolbarItem: ToolbarItemDirective): void {
        // IE11 workaround element.remove() is not supported
        toolbarItem.elementRef.nativeElement.parentNode.removeChild(toolbarItem.elementRef.nativeElement);
    }

    /** @hidden */
    private _addToolbarItemToOverflow(toolbarItems: ToolbarItemDirective[]): void {
        toolbarItems.forEach((x) => {
            this._overflowBody.appendChild(x.elementRef.nativeElement);
        });
    }

    /** @hidden */
    private _reset(): void {
        this._normalElements.forEach(this._removeToolbarItemFromDOM);
        this._overflowElements.forEach(this._removeToolbarItemFromDOM);

        [...this._normalElements, ...this._overflowElements].map((x) => {
            this._changeItemVisibilityState(x.elementRef.nativeElement, false);
            this._renderer.insertBefore(this._toolbar, x.elementRef.nativeElement, this.overflowSpacer.nativeElement);
        });

        this._overflowElements = [];
        this._normalElements = [];
        this._changeOverflowVisibleState(false);
    }

    private _changeOverflowVisibleState(visible: boolean): void {
        this.overflowVisibility = of(visible).pipe(delay(1));
    }

    private _changeItemVisibilityState(element: HTMLElement, visible: boolean): void {
        const fadeIn = 'fd-toolbar-fade-in';
        const fadeOut = 'fd-toolbar-fade-out';

        if (visible) {
            element.classList.add(fadeIn);
            element.classList.remove(fadeOut);
            return;
        }

        element.classList.add(fadeOut);
        element.classList.remove(fadeIn);
    }
}
