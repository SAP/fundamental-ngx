import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonModule } from '@fundamental-ngx/core/button';
import {
    ActionSquashBreakpointPx,
    DynamicPageHeaderComponent,
    DynamicPageModule,
    DynamicPageService
} from '@fundamental-ngx/core/dynamic-page';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

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
        const breadcrumbSpy = spyOn(header._breadcrumbComponent, 'onResize').and.callThrough();
        const contentToolbarSpy = spyOn(header._contentToolbar, '_setSize').and.callThrough();
        const globalActionsSpy = spyOn(header._globalActions, '_setSize').and.callThrough();

        header.size = 'small';

        tick(5);

        expect(breadcrumbSpy).toHaveBeenCalled();
        expect(contentToolbarSpy).toHaveBeenCalledWith('small');
        expect(globalActionsSpy).toHaveBeenCalledWith('small');
    }));

    it('should squash actions, when pixels are below breakpoint', () => {
        fixture.detectChanges();
        header.ngOnInit();
        component.dynamicPageService.pixelsSizeChanged.next(ActionSquashBreakpointPx - 10);
        fixture.detectChanges();
        expect((<any>header)._actionsSquashed).toBeTrue();

        component.dynamicPageService.pixelsSizeChanged.next(ActionSquashBreakpointPx + 10);
        fixture.detectChanges();
        expect((<any>header)._actionsSquashed).toBeFalse();
    });
});
