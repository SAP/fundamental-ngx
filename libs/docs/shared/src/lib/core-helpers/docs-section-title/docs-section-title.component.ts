import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    Inject,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { CURRENT_LIB, Libraries } from '../../utilities/libraries';

@Component({
    selector: 'fd-docs-section-title',
    template: `
        <h2 [id]="id" #title class="docs-header-link" (click)="navigateToFragment($event)">
            <span class="docs-header-link__text">
                <ng-content></ng-content>
            </span>
            <a
                class="docs-markdown-a"
                [attr.aria-describedby]="id"
                [href]="fragmentUrl"
                (click)="navigateToFragment($event)"
            >
                <fd-icon glyph="number-sign"></fd-icon>
            </a>
        </h2>
    `,
    styleUrls: ['./docs-section-title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent]
})
export class DocsSectionTitleComponent implements OnInit, AfterViewInit {
    @ViewChild('title', { read: ElementRef })
    sectionTitle: ElementRef;

    @Input()
    id = '';

    @Input()
    componentName = '';

    readonly currentLibrary: Libraries;

    /** Pre-computed fragment URL for the anchor href (hash-based routing). */
    get fragmentUrl(): string {
        return `#/${this.currentLibrary}/${this.componentName}#${this.id}`;
    }

    private idFromUrl: any;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        @Inject(CURRENT_LIB) private readonly currentLib: Libraries,
        private readonly _destroyRef: DestroyRef
    ) {
        this.currentLibrary = this.currentLib;
    }

    ngOnInit(): void {
        this.activatedRoute.fragment.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((fragment) => {
            this.idFromUrl = fragment;
            this.handleUrlFragment();
        });
    }

    ngAfterViewInit(): void {
        this.handleUrlFragment();
    }

    /** Navigate to this section's fragment when the heading is clicked. */
    navigateToFragment(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(['/' + this.currentLibrary + '/' + this.componentName], {
            fragment: this.id,
            replaceUrl: true
        });
    }

    private handleUrlFragment(): void {
        if (this.sectionTitle) {
            if (this.id === this.idFromUrl) {
                this.sectionTitle.nativeElement.scrollIntoView(true);
                this.addOffset();
            }
        }
    }

    private addOffset(): void {
        const pageContent = document.getElementById('page-content');
        if (pageContent) {
            pageContent.scrollTop -= 30;
        }
    }
}
