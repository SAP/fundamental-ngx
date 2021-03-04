import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ButtonModule } from '../../../button/button.module';
import { BreadcrumbModule } from '../../../breadcrumb/breadcrumb.module';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { DynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageService } from '../../dynamic-page.service';
import { ActionSquashBreakpointPx, DynamicPageHeaderComponent } from './dynamic-page-header.component';

@Component({
    template: `
        <fd-dynamic-page-header [title]="title" [subtitle]="subtitle" >
            <fd-breadcrumb>
                <fd-breadcrumb-item>
                    <a fd-breadcrumb-link [attr.href]="'#'">Men</a>
                </fd-breadcrumb-item>
                <fd-breadcrumb-item>
                    <a fd-breadcrumb-link [attr.href]="'#'">Shoes</a>
                </fd-breadcrumb-item>
            </fd-breadcrumb>
            
            <fd-dynamic-page-global-actions></fd-dynamic-page-global-actions>
            <fd-dynamic-page-title-content></fd-dynamic-page-title-content>

            <fd-dynamic-page-key-info></fd-dynamic-page-key-info>
        </fd-dynamic-page-header>`,
    providers: [
        DynamicPageService
    ]
})
class TestComponent {
    title = 'Some title ';
    subtitle: string;

    @ViewChild(DynamicPageHeaderComponent)
    header: DynamicPageHeaderComponent;

    constructor(
        public dynamicPageService: DynamicPageService
    ) {}
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

    it('should call set size on depended components', fakeAsync(()  => {
        fixture.detectChanges();
        const breadcrumbSpy = spyOn(header._breadcrumbComponent, 'onResize').and.callThrough();
        const contentToolbarSpy = spyOn(header._contentToolbar, '_setSize').and.callThrough();
        const globalActionsSpy = spyOn(header._globalActions, '_setSize').and.callThrough();

        header.size = 'small';

        tick(5)

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
    })
});
