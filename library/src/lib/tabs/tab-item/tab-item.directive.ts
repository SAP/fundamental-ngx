import {
    AfterContentInit,
    ContentChild, Directive, ElementRef,
    EventEmitter, Input,
    Output, TemplateRef
} from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { TabContentDirective } from '../tab-utils/tab-directives';

let tabItemUniqueId: number = 0;

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-item]',
})
export class TabItemDirective extends AbstractFdNgxClass implements AfterContentInit {

    @ContentChild(TabLinkDirective) tabLink: TabLinkDirective;

    @ContentChild(TabContentDirective, {read: TemplateRef}) tabContent: TemplateRef<TabContentDirective>;

    /** Aria-label of the tab. Also applied to the tab header. */
    @Input()
    ariaLabel: string;

    /** Id of the element that labels the tab. Also applied to the tab header. */
    @Input()
    ariaLabelledBy: string;

    /** Whether the tab is disabled. */
    @Input()
    disabled: boolean;

    /** Whether the tab is disabled. */
    @Input()
    active: boolean;

    /** Id of the tab. If none is provided, one will be generated. */
    @Input()
    id: string = 'fd-tab-item' + tabItemUniqueId++;

    @Output() clicked = new EventEmitter();

    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    ngAfterContentInit(): void {
        this.disabledChange(this.disabled);
        this.activateChange(this.active);
        if (this.tabLink) {
            this.tabLink.ariaControls = this.id;
        }
    }

    public activateChange(isActive: boolean) {
        this.active = isActive;
        if (this.tabLink) {
            this.tabLink.activateChange(!!isActive);
        }
    }

    public disabledChange(disabled: boolean) {
        this.disabled = disabled;
        if (this.tabLink) {
            this.tabLink.disabledChange(!!disabled)
        }
    }

    public focus() {
        if (this.tabLink) {
            this.tabLink.focus();
        }
    }

    _setProperties(): void {
        this._addClassToElement('fd-tabs__item');
        this.activateChange(this.active);
        this.disabledChange(this.disabled);
    }
}
