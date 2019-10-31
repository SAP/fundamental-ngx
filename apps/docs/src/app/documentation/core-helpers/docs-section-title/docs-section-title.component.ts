import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'fd-docs-section-title',
    template: `
        <h2 [id]="id" #title class="docs-header-link">
            <a class="docs-markdown-a"
               [attr.aria-describedby]="id"
               [routerLink]="'/' + currentLibrary + '/' + componentName"
               [fragment]="id">
                <fd-icon [glyph]="'chain-link'"></fd-icon>
            </a>
            <ng-content></ng-content>
        </h2>
    `,
    styleUrls: ['./docs-section-title.component.scss']
})
export class DocsSectionTitleComponent implements OnInit, AfterViewInit {

    @ViewChild('title', { read: ElementRef, static: false })
    sectionTitle: ElementRef;

    @Input()
    id: string = '';

    @Input()
    componentName: string = '';

    readonly currentLibrary: 'core' | 'platform' = null;

    private idFromUrl: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.currentLibrary = this.router.url && this.router.url.includes('core/') ? 'core' : 'platform';
    }

    ngOnInit(): void {
        this.activatedRoute.fragment.subscribe(fragment => {
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
        if (document.getElementById('page-content')) {
            document.getElementById('page-content').scrollTop -= 30;
        }
    }
}
