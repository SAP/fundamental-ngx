import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageService } from '../../dynamic-page.service';
import { ActionSquashBreakpointPx, DynamicPageHeaderComponent } from './dynamic-page-header.component';

@Component({
    template: ` <fd-dynamic-page-header [title]="title" [subtitle]="subtitle">
        <fd-breadcrumb>
            <fd-breadcrumb-item>
                <a fd-link [attr.href]="'#'">Men</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-link [attr.href]="'#'">Shoes</a>
            </fd-breadcrumb-item>
        </fd-breadcrumb>

        <fd-dynamic-page-global-actions></fd-dynamic-page-global-actions>
        <fd-dynamic-page-title-content></fd-dynamic-page-title-content>
    </fd-dynamic-page-header>`,
    providers: [DynamicPageService]
})
class TestComponent {
    title = 'Some title ';
    subtitle: string;

    @ViewChild(DynamicPageHeaderComponent)
    header: DynamicPageHeaderComponent;

    constructor(public dynamicPageService: DynamicPageService) {}
}

@Component({
    template: `
        <fd-dynamic-page-header [title]="title" [subtitleTemplate]="subtitleTemplate">
            <fd-breadcrumb>
                <fd-breadcrumb-item>
                    <a fd-link [attr.href]="'#'">Men</a>
                </fd-breadcrumb-item>
                <fd-breadcrumb-item>
                    <a fd-link [attr.href]="'#'">Shoes</a>
                </fd-breadcrumb-item>
            </fd-breadcrumb>

            <fd-dynamic-page-global-actions></fd-dynamic-page-global-actions>
            <fd-dynamic-page-title-content></fd-dynamic-page-title-content>
        </fd-dynamic-page-header>

        <ng-template #subtitleTemplate>
            <span class="my-custom-subtitle">CustomSubtitle</span>
        </ng-template>
    `,
    providers: [DynamicPageService]
})
class TestWithSubtitleTemplateComponent {
    title = 'Some title ';
    subtitle: string;

    @ViewChild(DynamicPageHeaderComponent)
    header: DynamicPageHeaderComponent;

    constructor(public dynamicPageService: DynamicPageService) {}
}

describe('DynamicPageTitleComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let header: DynamicPageHeaderComponent;
    let component: TestComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DynamicPageModule, BreadcrumbModule, ToolbarModule, ButtonModule],
            declarations: [TestComponent],
            providers: [DynamicPageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        header = component.header;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should call set size on depended components', fakeAsync(() => {
        fixture.detectChanges();
        const breadcrumbSpy = jest.spyOn(header._breadcrumbComponent, 'onResize');
        const contentToolbarSpy = jest.spyOn(header._contentToolbar, '_setSize');
        const globalActionsSpy = jest.spyOn(header._globalActions, '_setSize');

        header.size = 'small';

        tick(50);

        expect(breadcrumbSpy).toHaveBeenCalled();
        expect(contentToolbarSpy).toHaveBeenCalledWith('small');
        expect(globalActionsSpy).toHaveBeenCalledWith('small');
    }));

    it('should squash actions, when pixels are below breakpoint', () => {
        fixture.detectChanges();
        header.ngOnInit();
        component.dynamicPageService.pixelsSizeChanged.next(ActionSquashBreakpointPx - 10);
        fixture.detectChanges();
        expect((<any>header)._actionsSquashed).toBe(true);

        component.dynamicPageService.pixelsSizeChanged.next(ActionSquashBreakpointPx + 10);
        fixture.detectChanges();
        expect((<any>header)._actionsSquashed).toBe(false);
    });
});

describe('DynamicPageTitleComponent with custom subtitle', () => {
    let fixture: ComponentFixture<TestWithSubtitleTemplateComponent>;
    let header: DynamicPageHeaderComponent;
    let component: TestComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DynamicPageModule, BreadcrumbModule, ToolbarModule, ButtonModule],
            declarations: [TestWithSubtitleTemplateComponent],
            providers: [DynamicPageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWithSubtitleTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        header = component.header;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should set subtitleTemplate correctly', fakeAsync(() => {
        fixture.detectChanges();

        expect(header.subtitleTemplate).toBeDefined();
        expect(header.subtitle).toBeUndefined();
    }));

    it('should set subtitleTemplate correctly', fakeAsync(() => {
        fixture.detectChanges();

        const subtitle = (header as any)._elementRef.nativeElement.querySelector('.my-custom-subtitle');

        expect(subtitle).toBeDefined();
        expect(subtitle.textContent).toContain('CustomSubtitle');
    }));
});
