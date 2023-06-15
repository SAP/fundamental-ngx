import { AfterViewInit, Directive, ElementRef, HostListener, inject, Input, NgZone, Renderer2 } from '@angular/core';
import { DomPortal } from '@angular/cdk/portal';
import { BehaviorSubject, Observable, Subject, combineLatest, tap, delayWhen, takeUntil } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { MenuItemComponent } from '../../menu-item/menu-item.component';

@Directive({
    selector: 'li[fd-menu-item][fdMenuSegmentedButtonOption]',
    standalone: true,
    providers: [DestroyedService]
})
export class SegmentedButtonOptionDirective<T> implements AfterViewInit {
    /** @hidden */
    @Input() value: T;

    /** @hidden */
    private _clicked = new Subject<void>();
    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    readonly menuItem = inject(MenuItemComponent, { host: true });

    /** @hidden */
    readonly clicked: Observable<void> = this._clicked.asObservable();

    /** @hidden */
    readonly renderer2 = inject(Renderer2);

    /** @hidden */
    private _dotElement: HTMLSpanElement;

    /** @hidden */
    private _viewInit$ = new Subject<void>();

    /** @hidden */
    private _selected$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    constructor() {
        const ngZone = inject(NgZone);
        const destroyed$ = inject(DestroyedService);
        combineLatest([this._viewInit$.pipe(delayWhen(() => ngZone.onStable.asObservable())), this._selected$])
            .pipe(
                tap(() => {
                    if (!this._dotElement) {
                        this.createDot();
                    }
                }),
                tap(([_, selected]) => {
                    selected ? this.showDot() : this.hideDot();
                }),
                takeUntil(destroyed$)
            )
            .subscribe();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._viewInit$.next();
    }

    /** @hidden */
    private createDot(): void {
        this._dotElement = this.renderer2.createElement('span');
        this.renderer2.appendChild(this.elementRef.nativeElement, this._dotElement);
        this.renderer2.addClass(this._dotElement, 'fd-menu__active-dot');
        this.renderer2.setAttribute(this._dotElement, 'role', 'presentation');
        this.hideDot();
        const addonDirective = this.menuItem.menuInteractive.startAddon;
        const addonGlyph = addonDirective._addonGlyph;
        addonGlyph.renderElement(new DomPortal(this._dotElement)).subscribe();
    }

    /** @hidden */
    private showDot(): void {
        this.renderer2.setAttribute(this._dotElement, 'aria-hidden', 'false');
        this.renderer2.setStyle(this._dotElement, 'display', 'inline-block');
    }

    /** @hidden */
    private hideDot(): void {
        this.renderer2.setAttribute(this._dotElement, 'aria-hidden', 'true');
        this.renderer2.setStyle(this._dotElement, 'display', 'none');
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    _onClick($event: MouseEvent | KeyboardEvent): void {
        $event.preventDefault();
        this._clicked.next();
    }

    /** @hidden */
    set selected(isSelected: boolean) {
        this._selected$.next(isSelected);
    }
}
