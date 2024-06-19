import {
    Directive,
    ElementRef,
    Input,
    Renderer2,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    ChangeDetectorRef,
    inject,
    OnDestroy
} from '@angular/core';
import { Observable, take, takeUntil, Subscriber, Subject } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { ViewportRootService } from '../services/table-advanced-viewport-root.service';

@Directive({
    selector: '[fdpTableViewport]',
    standalone: true,
    providers: [DestroyedService]
})
export class ViewportDirective implements OnInit, OnDestroy {
    /** @hidden */
    @Input()
    tableViewport: TemplateRef<any>;

    /** @hidden */
    @Input()
    viewportFallback: TemplateRef<any>;

    /** @hidden */
    private _destroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private currentViewRef: any;

    /** @hidden */
    private readonly _viewportRootService = inject(ViewportRootService);

    /** @hidden */
    private currentTemplate: TemplateRef<any>;
    /** @hidden */
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private viewContainer: ViewContainerRef,
        private cdr: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (!this._viewportRootService.getRootNode()) {
            this._viewportRootService.rootElement$.pipe(take(1)).subscribe((rootNode) => {
                if (rootNode) {
                    this.checkViewport();
                }
            });
        } else {
            this.checkViewport();
        }
    }

    /** @hidden */
    checkViewport(): void {
        const options: IntersectionObserverInit = {
            root: this._viewportRootService.getRootNode(),
            rootMargin: '50px',
            threshold: 0.0
        };

        const observer = new Observable<boolean>((subscriber: Subscriber<boolean>) => {
            const intersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
                const { isIntersecting } = entries[0];
                subscriber.next(isIntersecting);
            }, options);

            intersectionObserver.observe(this.el.nativeElement.parentElement);
            this._destroy$.subscribe(() => {
                intersectionObserver.disconnect();
            });
            return {
                unsubscribe() {
                    intersectionObserver.disconnect();
                }
            };
        });

        observer.pipe(takeUntil(this._destroy$)).subscribe((inViewPort) => {
            this.updateView(inViewPort);
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    /** @hidden */
    private updateView(inViewPort: boolean): void {
        if (this.viewContainer.length === 0) {
            if (inViewPort) {
                this.viewContainer.createEmbeddedView(this.tableViewport);
                this.currentTemplate = this.tableViewport;
            } else {
                this.viewContainer.createEmbeddedView(this.viewportFallback);
                this.currentTemplate = this.viewportFallback;
            }
        } else {
            if (inViewPort && this.currentTemplate !== this.tableViewport) {
                if (this.currentViewRef) {
                    this.viewContainer.remove(0);
                    this.viewContainer.insert(this.currentViewRef);
                } else {
                    this.viewContainer.clear();
                    this.viewContainer.createEmbeddedView(this.tableViewport);
                }
                this.currentTemplate = this.tableViewport;
            } else if (!inViewPort && this.currentTemplate !== this.viewportFallback) {
                this.currentViewRef = this.viewContainer.detach(0);
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.viewportFallback);
                this.currentTemplate = this.viewportFallback;
            }
        }
        this.cdr.markForCheck(); // Mark parent component for change detection
    }
}
