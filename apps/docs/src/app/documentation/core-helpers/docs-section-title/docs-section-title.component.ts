import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { Renderer } from 'marked';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fd-docs-section-title',
    template: `
        <h2 [id]="id" #title class="docs-header-link">
            <a class="docs-markdown-a" [attr.aria-describedby]="id" href="/fundamental-ngx/{{ componentName }}#{{ id }}">
                <span class="sap-icon--chain-link"></span>
            </a>
            <ng-content></ng-content>
        </h2>
    `,
    styleUrls: ['./docs-section-title.component.scss']
})
export class DocsSectionTitleComponent implements OnInit, AfterViewInit {
    private idFromUrl: any;

    @ViewChild('title', { read: ElementRef, static: false  }) sectionTitle: ElementRef;

    @Input() id: string = '';

    @Input() componentName: string = '';

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.fragment.subscribe(fragment => {
            this.idFromUrl = fragment;
        });
    }

    ngAfterViewInit(): void {
        if (this.sectionTitle.nativeElement.firstChild.hash === '#' + this.idFromUrl) {
            this.sectionTitle.nativeElement.scrollIntoView();
        }
    }
}
