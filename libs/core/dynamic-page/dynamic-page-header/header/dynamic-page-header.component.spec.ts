import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonComponent } from '@fundamental-ngx/core/button';
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
    standalone: true,
    imports: [DynamicPageModule, BreadcrumbModule, ToolbarModule, ButtonComponent],
    providers: [DynamicPageService]
})
class TestComponent {
    @ViewChild(DynamicPageHeaderComponent)
    header: DynamicPageHeaderComponent;

    title = 'Some title ';
    subtitle: string;

    constructor(public dynamicPageService: DynamicPageService) {}
}

@Component({
    template: `
        <fd-dynamic-page-header>
            <ng-container *fdDynamicPageHeaderTitle="let collapsed">
                <span class="my-custom-title">Title {{ collapsed ? 'collapsed' : 'expanded' }}</span>
            </ng-container>
            <ng-container *fdDynamicPageHeaderSubtitle="let collapsed">
                <span class="my-custom-subtitle">Subtitle {{ collapsed ? 'collapsed' : 'expanded' }}</span>
            </ng-container>
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
    `,
    standalone: true,
    imports: [DynamicPageModule, BreadcrumbModule, ToolbarModule, ButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DynamicPageService]
})
class TestWithSubtitleTemplateComponent {
    @ViewChild(DynamicPageHeaderComponent)
    header: DynamicPageHeaderComponent;

    constructor(public dynamicPageService: DynamicPageService) {}
}

describe('DynamicPageTitleComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let header: DynamicPageHeaderComponent;
    let component: TestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
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
        component.dynamicPageService.pixelsSizeChanged.set(ActionSquashBreakpointPx - 10);
        fixture.detectChanges();
        expect((<any>header)._actionsSquashed$()).toBe(true);

        component.dynamicPageService.pixelsSizeChanged.set(ActionSquashBreakpointPx + 10);
        fixture.detectChanges();
        expect((<any>header)._actionsSquashed$()).toBe(false);
    });
});

describe('DynamicPageTitleComponent with custom subtitle', () => {
    let fixture: ComponentFixture<TestWithSubtitleTemplateComponent>;
    let header: DynamicPageHeaderComponent;
    let component: TestWithSubtitleTemplateComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestWithSubtitleTemplateComponent],
            providers: [DynamicPageService]
        }).compileComponents();
    });

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(TestWithSubtitleTemplateComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        fixture.whenRenderingDone().then(() => {
            fixture.detectChanges();
            header = component.header;
        });
    }));

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should set title template correctly', fakeAsync(() => {
        expect(header._titleTemplate).toBeDefined();
        expect(header.title).toBeUndefined();
    }));

    it('should set subtitle template correctly', fakeAsync(() => {
        expect(header._subtitleTemplate).toBeDefined();
        expect(header.subtitle).toBeUndefined();
    }));

    it('should set subtitle template properties correctly', waitForAsync(() => {
        fixture.detectChanges();
        fixture.whenRenderingDone().then(() => {
            component.dynamicPageService.collapsed.set(false);
            fixture.detectChanges();

            const subtitle = fixture.nativeElement.querySelector('.my-custom-subtitle');
            const title = fixture.nativeElement.querySelector('.my-custom-title');

            expect(subtitle).toBeDefined();
            expect(subtitle.textContent).toEqual(`Subtitle expanded`);
            expect(title.textContent).toEqual('Title expanded');

            component.dynamicPageService.collapsed.set(true);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.my-custom-subtitle').textContent).toEqual(
                `Subtitle collapsed`
            );
            expect(fixture.nativeElement.querySelector('.my-custom-title').textContent).toEqual('Title collapsed');
        });
    }));
});
