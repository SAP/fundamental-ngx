import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Renderer2
} from '@angular/core';

import { AvatarComponent, FD_AVATAR_COMPONENT } from '@fundamental-ngx/core/avatar';

import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { CardSubtitleDirective } from './card-subtitle.directive';
import { CLASS_NAME } from './constants';

@Component({
    selector: 'fd-card-header',
    templateUrl: './card-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: []
})
export class CardHeaderComponent implements OnInit, OnChanges, CssClassBuilder, AfterContentInit {
    /** Whether card header is interactive */
    @Input()
    interactive = true;

    /** Tab Index attribute for card header */
    @Input()
    @HostBinding('attr.tabindex')
    set tabindex(tabindex: string) {
        this._tabindex = tabindex;
    }
    get tabindex(): string {
        return !this.interactive ? '-1' : this._tabindex;
    }

    /** @ignore */
    private _tabindex = '0';

    /** @ignore */
    class: string;

    /** @ignore */
    @ContentChild(FD_AVATAR_COMPONENT)
    _avatar: AvatarComponent;

    /** @ignore */
    @ContentChild(CardSubtitleDirective)
    _subtitle: CardSubtitleDirective;

    /** @ignore */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngAfterContentInit(): void {
        /** Add fd-card__avatar class to fd-avatar */
        const avatar = this.elementRef.nativeElement.querySelector('fd-avatar');
        if (avatar) {
            this.renderer.addClass(avatar, 'fd-card__avatar');
        }
    }

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardHeader, !this.interactive ? CLASS_NAME.cardHeaderNonInteractive : ''];
    }
}
