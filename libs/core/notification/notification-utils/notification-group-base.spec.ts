import { Component, Directive, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { NotificationModule } from '../notification.module';
import { NotificationGroupBaseDirective } from './notification-group-base';

/**
 * Concrete implementation of the abstract NotificationGroupBaseDirective for testing
 */
@Directive({
    selector: '[fdTestNotificationGroupBase]',
    standalone: true
})
class TestNotificationGroupBaseDirective extends NotificationGroupBaseDirective {}

@Component({
    template: `
        <div fdTestNotificationGroupBase #testDirective>
            <fd-notification-header [uniqueId]="'test-header-id'">
                <span fd-notification-title>Test Title</span>
            </fd-notification-header>
            <fd-notification-actions>
                <button fd-button id="btn1">Action 1</button>
                <button fd-button id="btn2">Action 2</button>
            </fd-notification-actions>
        </div>
    `,
    imports: [NotificationModule, ButtonComponent, TestNotificationGroupBaseDirective]
})
class TestHostComponent {
    @ViewChild(TestNotificationGroupBaseDirective)
    directive: TestNotificationGroupBaseDirective;
}

@Component({
    template: `
        <div fdTestNotificationGroupBase #testDirective>
            <fd-notification-header [uniqueId]="'header-1'">
                <span fd-notification-title>Header 1</span>
            </fd-notification-header>
            <fd-notification-header [uniqueId]="'header-2'">
                <span fd-notification-title>Header 2</span>
            </fd-notification-header>
            <fd-notification-actions>
                <button fd-button id="btn1">Action 1</button>
            </fd-notification-actions>
        </div>
    `,
    imports: [NotificationModule, ButtonComponent, TestNotificationGroupBaseDirective]
})
class TestMultipleHeadersComponent {
    @ViewChild(TestNotificationGroupBaseDirective)
    directive: TestNotificationGroupBaseDirective;
}

@Component({
    template: `
        <div fdTestNotificationGroupBase #testDirective>
            <fd-notification-header [uniqueId]="'test-header'">
                <span fd-notification-title>Test</span>
            </fd-notification-header>
            <!-- No actions component -->
        </div>
    `,
    imports: [NotificationModule, TestNotificationGroupBaseDirective]
})
class TestNoActionsComponent {
    @ViewChild(TestNotificationGroupBaseDirective)
    directive: TestNotificationGroupBaseDirective;
}

@Component({
    template: `
        <div fdTestNotificationGroupBase #testDirective>
            <!-- No header component -->
            <fd-notification-actions>
                <button fd-button id="btn1">Action 1</button>
            </fd-notification-actions>
        </div>
    `,
    imports: [NotificationModule, ButtonComponent, TestNotificationGroupBaseDirective]
})
class TestNoHeaderComponent {
    @ViewChild(TestNotificationGroupBaseDirective)
    directive: TestNotificationGroupBaseDirective;
}

@Component({
    template: `
        <div fdTestNotificationGroupBase #testDirective>
            <fd-notification-header [uniqueId]="'test-header'">
                <span fd-notification-title>Test</span>
            </fd-notification-header>
            <fd-notification-actions>
                <!-- Actions component with no buttons -->
            </fd-notification-actions>
        </div>
    `,
    imports: [NotificationModule, TestNotificationGroupBaseDirective]
})
class TestNoButtonsComponent {
    @ViewChild(TestNotificationGroupBaseDirective)
    directive: TestNotificationGroupBaseDirective;
}

@Component({
    template: `
        <div fdTestNotificationGroupBase #testDirective>
            <fd-notification-header [uniqueId]="'test-header'">
                <span fd-notification-title>Test</span>
            </fd-notification-header>
            <fd-notification-actions>
                <button fd-button id="btn1" aria-describedby="existing-id">Action 1</button>
                <button fd-button id="btn2">Action 2</button>
            </fd-notification-actions>
        </div>
    `,
    imports: [NotificationModule, ButtonComponent, TestNotificationGroupBaseDirective]
})
class TestExistingAriaComponent {
    @ViewChild(TestNotificationGroupBaseDirective)
    directive: TestNotificationGroupBaseDirective;
}

describe('NotificationGroupBaseDirective', () => {
    describe('content queries', () => {
        let fixture: ComponentFixture<TestHostComponent>;
        let component: TestHostComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestHostComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestHostComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should query NotificationHeaderComponent via @ContentChildren', async () => {
            await waitForAuditTime();
            fixture.detectChanges();

            expect(component.directive.notificationHeader).toBeTruthy();
            expect(component.directive.notificationHeader.length).toBe(1);
        });

        it('should query NotificationActionsComponent via @ContentChildren', async () => {
            await waitForAuditTime();
            fixture.detectChanges();

            expect(component.directive.notificationActions).toBeTruthy();
            expect(component.directive.notificationActions.length).toBe(1);
        });

        it('should query buttons within NotificationActionsComponent', async () => {
            await waitForAuditTime();
            fixture.detectChanges();

            const actionsComponent = component.directive.notificationActions.first;
            expect(actionsComponent.buttons).toBeTruthy();
            expect(actionsComponent.buttons.length).toBe(2);
        });
    });

    describe('aria-describedby functionality', () => {
        it('should set aria-describedby on buttons linking to header uniqueId', async () => {
            const fixture = TestBed.configureTestingModule({
                imports: [TestHostComponent]
            }).createComponent(TestHostComponent);
            fixture.detectChanges();

            await waitForAuditTime();
            fixture.detectChanges();

            const btn1 = fixture.debugElement.query(By.css('#btn1'));
            const btn2 = fixture.debugElement.query(By.css('#btn2'));

            expect(btn1.nativeElement.getAttribute('aria-describedby')).toBe('test-header-id');
            expect(btn2.nativeElement.getAttribute('aria-describedby')).toBe('test-header-id');
        });

        it('should use first header uniqueId when multiple headers exist', async () => {
            const fixture = TestBed.configureTestingModule({
                imports: [TestMultipleHeadersComponent]
            }).createComponent(TestMultipleHeadersComponent);
            fixture.detectChanges();

            await waitForAuditTime();
            fixture.detectChanges();

            const btn1 = fixture.debugElement.query(By.css('#btn1'));
            // Should use first header's id, not the second one
            expect(btn1.nativeElement.getAttribute('aria-describedby')).toBe('header-1');
        });

        it('should not set aria-describedby when no actions component exists', async () => {
            const fixture = TestBed.configureTestingModule({
                imports: [TestNoActionsComponent]
            }).createComponent(TestNoActionsComponent);
            fixture.detectChanges();

            await waitForAuditTime();
            fixture.detectChanges();

            // No buttons to check, but directive should not throw
            expect(fixture.componentInstance.directive.notificationActions.length).toBe(0);
        });

        it('should not set aria-describedby when no header component exists', async () => {
            const fixture = TestBed.configureTestingModule({
                imports: [TestNoHeaderComponent]
            }).createComponent(TestNoHeaderComponent);
            fixture.detectChanges();

            await waitForAuditTime();
            fixture.detectChanges();

            const btn1 = fixture.debugElement.query(By.css('#btn1'));
            // Should not have aria-describedby since there's no header
            expect(btn1.nativeElement.getAttribute('aria-describedby')).toBeNull();
        });

        it('should not set aria-describedby when actions have no buttons', async () => {
            const fixture = TestBed.configureTestingModule({
                imports: [TestNoButtonsComponent]
            }).createComponent(TestNoButtonsComponent);
            fixture.detectChanges();

            await waitForAuditTime();
            fixture.detectChanges();

            // Directive should not throw when no buttons exist
            expect(fixture.componentInstance.directive.notificationActions.first.buttons.length).toBe(0);
        });

        it('should not overwrite existing aria-describedby attributes', async () => {
            const fixture = TestBed.configureTestingModule({
                imports: [TestExistingAriaComponent]
            }).createComponent(TestExistingAriaComponent);
            fixture.detectChanges();

            await waitForAuditTime();
            fixture.detectChanges();

            const btn1 = fixture.debugElement.query(By.css('#btn1'));
            const btn2 = fixture.debugElement.query(By.css('#btn2'));

            // btn1 should keep its existing aria-describedby
            expect(btn1.nativeElement.getAttribute('aria-describedby')).toBe('existing-id');
            // btn2 should get the header id
            expect(btn2.nativeElement.getAttribute('aria-describedby')).toBe('test-header');
        });
    });
});

/**
 * Helper to wait for auditTime(0) to complete
 */
function waitForAuditTime(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 50));
}
