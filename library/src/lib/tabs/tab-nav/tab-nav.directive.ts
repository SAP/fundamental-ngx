import {
    AfterContentInit,
    ContentChildren,
    Directive,
    EventEmitter,
    Output,
    QueryList,
    Renderer2,
} from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';


/**
 * Tab Nav for only navigation mode when you want for example use router-outlet
 *
 * ```html
 *<nav fd-tab-nav>
 *  <div fd-tab-item>
 *      <a fd-tab-link
 *      [active]="true">
 *          Link
 *      </a>
 *  </div>
 *  <div fd-tab-item>
 *      <a fd-tab-link
 *      [active]="false">
 *          Link
 *      </a>
 *  </div>
 *  <a fd-tab-link
 *  [active]="false">
 *      Link
 *  </a>
 * </nav>
 * ```
 */

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-nav]',
    host: {
        'class': 'fd-tabs',
        'role': 'tablist'
    }
})
export class TabNavDirective implements AfterContentInit {

    /** @hidden */
    @ContentChildren(TabLinkDirective) links: QueryList<TabLinkDirective>;

    /** @hidden */
    @ContentChildren(TabItemDirective) items: QueryList<TabItemDirective>;

    /** Event Thrown every time something is clicked */
    @Output() onKeyDown = new EventEmitter<{event: any, index: number}>();

    /** @hidden */
    constructor(
        private renderer: Renderer2
    ) {}

    /** Function that gives possibility to get all the link directives, with and without nav__item wrapper */
    public get tabLinks(): TabLinkDirective[] {
        let tabLinks: TabLinkDirective[] = [];
        if (this.links) { tabLinks = tabLinks.concat(this.links.map(link => link)); }
        if (this.items) { tabLinks = tabLinks.concat(this.items.filter(item => !!item.linkItem).map(item => item.linkItem)); }
        return tabLinks;
    }

    /** @hidden */
    public ngAfterContentInit(): void {
        this.tabLinks.forEach((linkElement, index) => {
            this.renderer.listen(linkElement.elementRef.nativeElement, 'keydown', (event) => {
                this.onKeyDown.emit({event: event, index: index});
            }
        )})
    }
}
