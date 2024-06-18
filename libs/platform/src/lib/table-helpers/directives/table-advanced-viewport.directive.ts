import {
    Directive,
    ElementRef,
    Input,
    Renderer2,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    ChangeDetectorRef,
    inject
} from '@angular/core';
import { Observable, debounceTime, take, takeUntil } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { ViewportRootService } from '../services/table-advanced-viewport-root.service';

@Directive({
    selector: '[fdpTableViewport]',
    standalone: true,
    providers: [DestroyedService]
})
export class ViewportDirective implements OnInit {
    /** @hidden */
    @Input()
    tableViewport: TemplateRef<any>;

    /** @hidden */
    @Input()
    viewportFallback: TemplateRef<any>;

    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    private readonly _viewportRootService = inject(ViewportRootService);

    /** @hidden */
    private currentTemplate: TemplateRef<any>;
    /** @hidden */
    constructor(
        /** @hidden */
        private el: ElementRef,
        /** @hidden */
        private renderer: Renderer2,
        /** @hidden */
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
            rootMargin: '10px 10px 10px 10px',
            threshold: 0.0
        };

        const observer = new Observable<boolean>((subscriber) => {
            const intersectionObserver = new IntersectionObserver((entries) => {
                const { isIntersecting } = entries[0];
                subscriber.next(isIntersecting);
            }, options);

            intersectionObserver.observe(this.el.nativeElement.parentElement);

            return {
                unsubscribe() {
                    intersectionObserver.disconnect();
                }
            };
        });

        observer
            .pipe(takeUntil(this._destroy$))
            .pipe(debounceTime(50))
            .subscribe((inViewPort) => {
                this.updateView(inViewPort);
            });
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
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.tableViewport);
                this.currentTemplate = this.tableViewport;
            } else if (!inViewPort && this.currentTemplate !== this.viewportFallback) {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.viewportFallback);
                this.currentTemplate = this.viewportFallback;
            }
        }
        this.cdr.markForCheck(); // Mark parent component for change detection
    }
}
