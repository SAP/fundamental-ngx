import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageService } from '../../dynamic-page.service';
import { ActionSquashBreakpointPx, DynamicPageHeaderComponent } from './dynamic-page-header.component';

@Component({
    template: `
        <fd-dynamic-page-header
            [title]="title"
            [subtitle]="subtitle"
            [titleWrap]="titleWrap"
            [subtitleWrap]="subtitleWrap"
            [headingLevel]="headingLevel"
            [subtitleHeadingLevel]="subtitleHeadingLevel"
            [titleId]="titleId"
        >
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
    imports: [DynamicPageModule, BreadcrumbModule, ToolbarModule, ButtonComponent],
    providers: [DynamicPageService]
})
class TestComponent {
    @ViewChild(DynamicPageHeaderComponent)
    header: DynamicPageHeaderComponent;

    title = 'Some title';
    subtitle = 'Some subtitle';
    titleWrap = false;
    subtitleWrap = false;
    headingLevel = 2;
    subtitleHeadingLevel: number | undefined;
    titleId = 'custom-title-id';

    constructor(public dynamicPageService: DynamicPageService) {}
}

@Component({
    template: `
        <fd-dynamic-page-header [title]="title">
            <fd-breadcrumb>
                <fd-breadcrumb-item>
                    <a fd-link [attr.href]="'#'">Home</a>
                </fd-breadcrumb-item>
            </fd-breadcrumb>
        </fd-dynamic-page-header>
    `,
    imports: [DynamicPageModule, BreadcrumbModule],
    providers: [DynamicPageService]
})
class MinimalTestComponent {
    @ViewChild(DynamicPageHeaderComponent)
    header: DynamicPageHeaderComponent;

    title = 'Test title';
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
    imports: [DynamicPageModule, BreadcrumbModule, ToolbarModule, ButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DynamicPageService]
})
class TestWithSubtitleTemplateComponent {
    @ViewChild(DynamicPageHeaderComponent)
    header: DynamicPageHeaderComponent;

    constructor(public dynamicPageService: DynamicPageService) {}
}

describe('DynamicPageHeaderComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let header: DynamicPageHeaderComponent;
    let component: TestComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [DynamicPageService]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        header = component.header;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
        expect(header).toBeTruthy();
    });

    describe('Input signals', () => {
        it('should display title from input signal', () => {
            const titleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__title');
            expect(titleElement.textContent.trim()).toBe('Some title');
            expect(header.title()).toBe('Some title');
        });

        it('should update title when input changes', () => {
            component.title = 'New title';
            fixture.detectChanges();

            const titleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__title');
            expect(titleElement.textContent.trim()).toBe('New title');
        });

        it('should display subtitle when collapsed', () => {
            component.dynamicPageService.collapsed.set(true);
            fixture.detectChanges();

            const subtitleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__subtitle');
            expect(subtitleElement).toBeTruthy();
            expect(subtitleElement.textContent.trim()).toBe('Some subtitle');
            expect(header.subtitle()).toBe('Some subtitle');
        });

        it('should display subtitle when expanded', () => {
            component.dynamicPageService.collapsed.set(false);
            fixture.detectChanges();

            const subtitleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__subtitle');
            expect(subtitleElement).toBeTruthy();
            expect(subtitleElement.textContent.trim()).toBe('Some subtitle');
        });

        it('should not display subtitle if not provided', () => {
            component.subtitle = '';
            component.dynamicPageService.collapsed.set(true);
            fixture.detectChanges();

            const subtitleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__subtitle');
            expect(subtitleElement).toBeFalsy();
        });

        it('should apply titleWrap class when titleWrap is true', () => {
            component.titleWrap = true;
            fixture.detectChanges();

            const titleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__title');
            expect(titleElement.classList.contains('fd-dynamic-page__title--wrap')).toBe(true);
        });

        it('should not apply titleWrap class when titleWrap is false', () => {
            component.titleWrap = false;
            fixture.detectChanges();

            const titleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__title');
            expect(titleElement.classList.contains('fd-dynamic-page__title--wrap')).toBe(false);
        });

        it('should apply subtitleWrap class when subtitleWrap is true', () => {
            component.subtitleWrap = true;
            component.dynamicPageService.collapsed.set(true);
            fixture.detectChanges();

            const subtitleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__subtitle');
            expect(subtitleElement.classList.contains('fd-dynamic-page__subtitle--wrap')).toBe(true);
        });

        it('should set custom titleId', () => {
            const titleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__title');
            expect(titleElement.id).toBe('custom-title-id');
            expect(header.titleId()).toBe('custom-title-id');
        });
    });

    describe('Heading levels', () => {
        it('should set correct heading level for title', () => {
            component.headingLevel = 3;
            fixture.detectChanges();

            const titleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__title');
            expect(titleElement.getAttribute('aria-level')).toBe('3');
            expect(header._headingLevel()).toBe(3);
        });

        it('should default to heading level 2 for title', () => {
            const titleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__title');
            expect(titleElement.getAttribute('aria-level')).toBe('2');
            expect(header._headingLevel()).toBe(2);
        });

        it('should set heading role and level for subtitle when subtitleHeadingLevel is provided', () => {
            component.subtitleHeadingLevel = 4;
            component.dynamicPageService.collapsed.set(true);
            fixture.detectChanges();

            const subtitleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__subtitle');
            expect(subtitleElement.getAttribute('role')).toBe('heading');
            expect(subtitleElement.getAttribute('aria-level')).toBe('4');
        });

        it('should not set heading role for subtitle when subtitleHeadingLevel is not provided', () => {
            component.subtitleHeadingLevel = undefined;
            component.dynamicPageService.collapsed.set(true);
            fixture.detectChanges();

            const subtitleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__subtitle');
            expect(subtitleElement.getAttribute('role')).toBeNull();
            expect(subtitleElement.getAttribute('aria-level')).toBeNull();
        });
    });

    describe('Responsive behavior', () => {
        it('should update size to small when width <= 599', () => {
            component.dynamicPageService.pixelsSizeChanged.set(500);
            fixture.detectChanges();

            expect(header._size).toBe('small');
        });

        it('should update size to medium when width is between 600-1023', () => {
            component.dynamicPageService.pixelsSizeChanged.set(800);
            fixture.detectChanges();

            expect(header._size).toBe('medium');
        });

        it('should update size to large when width is between 1024-1439', () => {
            component.dynamicPageService.pixelsSizeChanged.set(1200);
            fixture.detectChanges();

            expect(header._size).toBe('large');
        });

        it('should update size to extra-large when width >= 1440', () => {
            component.dynamicPageService.pixelsSizeChanged.set(1600);
            fixture.detectChanges();

            expect(header._size).toBe('extra-large');
        });
    });

    describe('Actions squashing', () => {
        it('should squash actions when viewport is below breakpoint', () => {
            component.dynamicPageService.pixelsSizeChanged.set(ActionSquashBreakpointPx - 10);
            fixture.detectChanges();

            expect(header._actionsSquashed()).toBe(true);
        });

        it('should not squash actions when viewport is above breakpoint', () => {
            component.dynamicPageService.pixelsSizeChanged.set(ActionSquashBreakpointPx + 10);
            fixture.detectChanges();

            expect(header._actionsSquashed()).toBe(false);
        });

        it('should squash actions at exactly the breakpoint', () => {
            component.dynamicPageService.pixelsSizeChanged.set(ActionSquashBreakpointPx);
            fixture.detectChanges();

            expect(header._actionsSquashed()).toBe(false);
        });
    });

    describe('Content children', () => {
        it('should query breadcrumb component', () => {
            expect(header._breadcrumbComponent()).toBeTruthy();
        });

        it('should query global actions component', () => {
            expect(header._globalActions()).toBeTruthy();
        });

        it('should query title content component', () => {
            expect(header._contentToolbar()).toBeTruthy();
        });
    });

    describe('Event handling', () => {
        it('should stop event propagation when stopPropagation is called', () => {
            const mockEvent = new MouseEvent('click', { bubbles: true });
            jest.spyOn(mockEvent, 'stopPropagation');

            header.stopPropagation(mockEvent);

            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });
    });
});

describe('DynamicPageHeaderComponent with defaults', () => {
    let fixture: ComponentFixture<MinimalTestComponent>;
    let header: DynamicPageHeaderComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MinimalTestComponent],
            providers: [DynamicPageService]
        }).compileComponents();

        fixture = TestBed.createComponent(MinimalTestComponent);
        fixture.detectChanges();
        header = fixture.componentInstance.header;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
        expect(header).toBeTruthy();
    });

    it('should generate default titleId when not provided', () => {
        const titleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__title');
        expect(header.titleId()).toMatch(/^fd-dynamic-page-title-id-\d+$/);
        expect(titleElement.id).toMatch(/^fd-dynamic-page-title-id-\d+$/);
    });

    it('should use default heading level of 2', () => {
        const titleElement = fixture.nativeElement.querySelector('.fd-dynamic-page__title');
        expect(titleElement.getAttribute('aria-level')).toBe('2');
        expect(header._headingLevel()).toBe(2);
    });
});

describe('DynamicPageHeaderComponent with custom templates', () => {
    let fixture: ComponentFixture<TestWithSubtitleTemplateComponent>;
    let header: DynamicPageHeaderComponent;
    let component: TestWithSubtitleTemplateComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestWithSubtitleTemplateComponent],
            providers: [DynamicPageService]
        }).compileComponents();

        fixture = TestBed.createComponent(TestWithSubtitleTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        header = component.header;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should use custom title template when provided', () => {
        expect(header._titleTemplate()).toBeDefined();
        expect(header.title()).toBe('');
    });

    it('should use custom subtitle template when provided', () => {
        expect(header._subtitleTemplate()).toBeDefined();
        expect(header.subtitle()).toBe('');
    });

    it('should pass collapsed state to title template context when expanded', async () => {
        component.dynamicPageService.collapsed.set(false);
        fixture.detectChanges();
        await fixture.whenStable();

        const title = fixture.nativeElement.querySelector('.my-custom-title');
        expect(title).toBeTruthy();
        expect(title.textContent.trim()).toBe('Title expanded');
    });

    it('should pass collapsed state to title template context when collapsed', async () => {
        component.dynamicPageService.collapsed.set(true);
        fixture.detectChanges();
        await fixture.whenStable();

        const title = fixture.nativeElement.querySelector('.my-custom-title');
        expect(title.textContent.trim()).toBe('Title collapsed');
    });

    it('should pass collapsed state to subtitle template context when expanded', async () => {
        component.dynamicPageService.collapsed.set(false);
        fixture.detectChanges();
        await fixture.whenStable();

        const subtitle = fixture.nativeElement.querySelector('.my-custom-subtitle');
        expect(subtitle).toBeTruthy();
        expect(subtitle.textContent.trim()).toBe('Subtitle expanded');
    });

    it('should pass collapsed state to subtitle template context when collapsed', async () => {
        component.dynamicPageService.collapsed.set(true);
        fixture.detectChanges();
        await fixture.whenStable();

        const subtitle = fixture.nativeElement.querySelector('.my-custom-subtitle');
        expect(subtitle.textContent.trim()).toBe('Subtitle collapsed');
    });

    it('should reactively update template context when collapsed state changes', async () => {
        component.dynamicPageService.collapsed.set(false);
        fixture.detectChanges();
        await fixture.whenStable();

        let subtitle = fixture.nativeElement.querySelector('.my-custom-subtitle');
        let title = fixture.nativeElement.querySelector('.my-custom-title');

        expect(subtitle.textContent.trim()).toBe('Subtitle expanded');
        expect(title.textContent.trim()).toBe('Title expanded');

        component.dynamicPageService.collapsed.set(true);
        fixture.detectChanges();
        await fixture.whenStable();

        subtitle = fixture.nativeElement.querySelector('.my-custom-subtitle');
        title = fixture.nativeElement.querySelector('.my-custom-title');

        expect(subtitle.textContent.trim()).toBe('Subtitle collapsed');
        expect(title.textContent.trim()).toBe('Title collapsed');
    });
});
