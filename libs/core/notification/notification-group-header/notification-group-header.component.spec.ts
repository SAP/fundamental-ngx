import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { NotificationModule } from '../notification.module';
import { NotificationGroupHeaderComponent } from './notification-group-header.component';

@Component({
    selector: 'fd-notification-group-header-test',
    template: `
        <fd-notification-group-header #notificationGroupHeader>
            <span fd-notification-group-header-title [id]="'fd-notification-group-header-title-1'">Today</span>
        </fd-notification-group-header>
    `,
    imports: [NotificationModule]
})
class TestWrapperComponent {
    notificationGroupHeader = viewChild<NotificationGroupHeaderComponent>('notificationGroupHeader');
}

@Component({
    template: `
        <fd-notification-group-header #notificationGroupHeader>
            <span fd-notification-group-header-title>Today</span>
        </fd-notification-group-header>
        <fd-notification-actions>
            <button fd-button id="action-btn">Action</button>
        </fd-notification-actions>
    `,
    imports: [NotificationModule, ButtonComponent]
})
class TestWithActionsComponent {
    notificationGroupHeader = viewChild<NotificationGroupHeaderComponent>('notificationGroupHeader');
}

describe('NotificationGroupHeaderComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestWrapperComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper class', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.classList.contains('fd-notification-group__header')).toBe(true);
    });

    it('should apply proper role', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.getAttribute('role')).toBe('button');
    });

    it('should have proper tabindex', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should have default title', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.title).toBe('Expand/Collapse');
    });

    it('should have expanded set to false by default', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(attributeElement.nativeElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have an arrow', () => {
        const headerArrowElement = fixture.debugElement.query(By.css('.fd-notification-group__header-arrow'));
        expect(headerArrowElement).toBeTruthy();
    });

    it('should expand when toggleExpand method is called', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-notification-group-header'));
        component.notificationGroupHeader()?.toggleExpand();
        fixture.detectChanges();
        expect(attributeElement.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    describe('keyboard handling', () => {
        it('should toggle expand on Enter key', () => {
            const headerEl = fixture.debugElement.query(By.css('fd-notification-group-header'));
            expect(component.notificationGroupHeader()?.expanded()).toBe(false);

            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });
            headerEl.nativeElement.dispatchEvent(enterEvent);
            fixture.detectChanges();

            expect(component.notificationGroupHeader()?.expanded()).toBe(true);
        });

        it('should toggle expand on Space key', () => {
            const headerEl = fixture.debugElement.query(By.css('fd-notification-group-header'));
            expect(component.notificationGroupHeader()?.expanded()).toBe(false);

            const spaceEvent = new KeyboardEvent('keydown', { key: ' ', keyCode: 32 });
            headerEl.nativeElement.dispatchEvent(spaceEvent);
            fixture.detectChanges();

            expect(component.notificationGroupHeader()?.expanded()).toBe(true);
        });

        it('should not toggle expand on other keys', () => {
            const headerEl = fixture.debugElement.query(By.css('fd-notification-group-header'));
            expect(component.notificationGroupHeader()?.expanded()).toBe(false);

            const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', keyCode: 9 });
            headerEl.nativeElement.dispatchEvent(tabEvent);
            fixture.detectChanges();

            expect(component.notificationGroupHeader()?.expanded()).toBe(false);
        });
    });

    describe('click handling', () => {
        it('should toggle expand on click', () => {
            const headerEl = fixture.debugElement.query(By.css('fd-notification-group-header'));
            expect(component.notificationGroupHeader()?.expanded()).toBe(false);

            headerEl.nativeElement.click();
            fixture.detectChanges();

            expect(component.notificationGroupHeader()?.expanded()).toBe(true);

            headerEl.nativeElement.click();
            fixture.detectChanges();

            expect(component.notificationGroupHeader()?.expanded()).toBe(false);
        });
    });

    describe('icon behavior', () => {
        it('should have slim-arrow-right icon when collapsed (LTR)', () => {
            const headerComponent = component.notificationGroupHeader()!;
            expect(headerComponent['_buttonIcon']()).toBe('slim-arrow-right');
        });

        it('should have slim-arrow-down icon when expanded', () => {
            component.notificationGroupHeader()?.toggleExpand();
            fixture.detectChanges();

            const headerComponent = component.notificationGroupHeader()!;
            expect(headerComponent['_buttonIcon']()).toBe('slim-arrow-down');
        });
    });
});

describe('NotificationGroupHeaderComponent aria-controls', () => {
    let fixture: ComponentFixture<TestWithActionsComponent>;
    let component: TestWithActionsComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestWithActionsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestWithActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set aria-controls attribute when signal is set', () => {
        // Set the ariaControls signal programmatically
        component.notificationGroupHeader()?.ariaControls.set('list-1');
        fixture.detectChanges();

        const headerEl = fixture.debugElement.query(By.css('fd-notification-group-header'));
        expect(headerEl.nativeElement.getAttribute('aria-controls')).toBe('list-1');
    });
});

describe('NotificationGroupHeaderComponent with RTL', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    const rtlSignal = signal(true);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestWrapperComponent],
            providers: [
                {
                    provide: RtlService,
                    useValue: { rtl: rtlSignal }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should have slim-arrow-left icon when collapsed in RTL mode', () => {
        const headerComponent = component.notificationGroupHeader()!;
        expect(headerComponent['_buttonIcon']()).toBe('slim-arrow-left');
    });

    it('should have slim-arrow-down icon when expanded in RTL mode', () => {
        component.notificationGroupHeader()?.toggleExpand();
        fixture.detectChanges();

        const headerComponent = component.notificationGroupHeader()!;
        expect(headerComponent['_buttonIcon']()).toBe('slim-arrow-down');
    });
});
