import {
    Component,
    OnInit,
    Input,
    ElementRef,
    ViewChild,
    AfterViewInit,
    Inject,
    ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyedService } from '@fundamental-ngx/cdk';
import { takeUntil } from 'rxjs';
import { CURRENT_LIB, Libraries } from '../../utilities/libraries';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyedService]
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
        private readonly _destroy$: DestroyedService
    ) {
        this.currentLibrary = this.currentLib;
    }

    ngOnInit(): void {
        this.activatedRoute.fragment.pipe(takeUntil(this._destroy$)).subscribe((fragment) => {
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
