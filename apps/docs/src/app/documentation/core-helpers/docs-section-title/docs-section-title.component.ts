import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libraries } from '../../utilities/libraries';

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
    styleUrls: ['./docs-section-title.component.scss']
})
export class DocsSectionTitleComponent implements OnInit, AfterViewInit {
    @ViewChild('title', { read: ElementRef })
    sectionTitle: ElementRef;

    @Input()
    id = '';

    @Input()
    componentName = '';

    readonly currentLibrary: Libraries = null;

    private idFromUrl: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        @Inject('CURRENT_LIB') private currentLib: Libraries
    ) {
        this.currentLibrary = this.currentLib;
    }

    ngOnInit(): void {
        this.activatedRoute.fragment.subscribe((fragment) => {
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
