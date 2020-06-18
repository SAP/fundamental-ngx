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
    HostListener,
    ChangeDetectorRef,
    Renderer2,
    Input
} from '@angular/core';
import { ToolbarItemDirective } from './public_api';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const ELEMENT_MARGIN = 8;
const OVERFLOW_SPACE = 50 + 2 * ELEMENT_MARGIN;

export type ToolbarType = 'solid' | 'transparent' | 'auto' | 'info';

export type ToolbarSize = 'cozy' | 'compact';
@Component({
    selector: 'fd-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, AfterViewInit, AfterViewChecked, CssClassBuilder {
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
    overflowElements: ToolbarItemDirective[] = [];

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
    constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) {}

    /** @hidden */
    ngOnInit() {}

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
    elementRef(): ElementRef<any> {
        return this.toolbar;
    }

    /** @hidden */
    @HostListener('window:resize')
    onResize() {
        if (this.shouldOverflow) {
            this._reset();
            this._collapseItems();
        }
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass() {
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

    // shouldOverflow items
    /** @hidden */
    private _collapseItems() {
        this.toolbarItems.reduce((_contentWidth, toolbarItem) => {
            const itemWidth = this._getElementWidthWithMargin(toolbarItem);
            const shouldItemBeRemoved = this._shouldToolbarItemBeRemoved(itemWidth, _contentWidth);

            if (shouldItemBeRemoved) {
                this._removeToolbarItemFromDOM(toolbarItem);
                this.overflowElements.push(toolbarItem);
            }
            return !shouldItemBeRemoved && !this._isSpacer(toolbarItem) ? _contentWidth + itemWidth : _contentWidth;
        }, 0);

        this._addToolbarItemToOverflow(this.overflowElements);
        this._changeOverflowVisibleState(this.overflowElements.length > 0);

        this.cd.markForCheck();
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
    private _removeToolbarItemFromDOM(toolbarItem: ToolbarItemDirective) {
        toolbarItem.elementRef.nativeElement.remove();
    }

    /** @hidden */
    private _addToolbarItemToOverflow(toolbarItems: ToolbarItemDirective[]) {
        toolbarItems.forEach((x) => {
            this._overflowBody.appendChild(x.elementRef.nativeElement);
        });
    }

    /** @hidden */
    private _reset() {
        this._overflowBody.childNodes.forEach((x) => {
            x.remove();
            this.renderer.insertBefore(this._toolbar, x, this.overflowSpacer.nativeElement);
        });

        this.overflowElements = [];
        this._changeOverflowVisibleState(false);
    }

    /** @hidden */
    private _isSpacer(item: ToolbarItemDirective): boolean {
        return (item.elementRef.nativeElement as HTMLElement).className.includes('spacer');
    }

    private _changeOverflowVisibleState(visible: boolean) {
        this.overflowVisibility = of(visible).pipe(delay(5));
    }
}
