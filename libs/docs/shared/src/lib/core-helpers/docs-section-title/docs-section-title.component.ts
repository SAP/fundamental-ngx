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
import { ActivatedRoute } from '@angular/router';
import { CURRENT_LIB, Libraries } from '../../utilities/libraries';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'fd-docs-section-title',
    template: `
        <h2 [id]="id" #title class="docs-header-link">
            <a
                class="docs-markdown-a"
                [attr.aria-describedby]="id"
                [routerLink]="'/' + currentLibrary + '/' + componentName"
                [fragment]="id"
            >
                <fd-icon glyph="chain-link"></fd-icon>
            </a>
            <ng-content></ng-content>
        </h2>
    `,
    styleUrls: ['./docs-section-title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsSectionTitleComponent implements OnInit, AfterViewInit {
    @ViewChild('title', { read: ElementRef })
    sectionTitle: ElementRef;

    @Input()
    id = '';

    @Input()
    componentName = '';

    readonly currentLibrary: Libraries;

    private idFromUrl: any;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
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
