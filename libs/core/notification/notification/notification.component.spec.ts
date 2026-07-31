import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { NotificationService } from '../notification-service/notification.service';
import { NotificationModule } from '../notification.module';
import { NotificationComponent } from './notification.component';

@Component({
    template: `
        <ng-template #testTemplate let-notification>
            <h1>test</h1>
            <a href="#">testLink</a>
            <button>testBtn</button>
        </ng-template>
    `,
    standalone: true,
    imports: [NotificationModule, ButtonComponent]
})
class TemplateTestComponent {
    @ViewChild('testTemplate', { static: true }) templateRef: TemplateRef<any>;
}

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NotificationModule,
                RouterTestingModule.withRoutes([]),
                ButtonComponent,
                TemplateTestComponent, // Add TemplateTestComponent to imports
                NotificationComponent // Add NotificationComponent to imports
            ],
            providers: [DynamicComponentService, NotificationService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should generate component', () => {
        jest.spyOn<any, any>(component, '_loadFromComponent');
        component.childContent = TemplateTestComponent;
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any)._loadFromComponent).toHaveBeenCalled();
    });

    it('should generate template', () => {
        jest.spyOn<any, any>(component, '_loadFromTemplate');
        component.childContent = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any)._loadFromTemplate).toHaveBeenCalled();
    });

    it('should execute action callback on Enter key', () => {
        const callbackSpy = jest.fn();

        fixture.componentRef.setInput('actionKeyHandler', callbackSpy);
        fixture.detectChanges();

        fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

        expect(callbackSpy).toHaveBeenCalledTimes(1);
        expect(callbackSpy).toHaveBeenCalledWith(expect.any(KeyboardEvent), 'enter');
    });

    it('should execute action callback on Delete key', () => {
        const callbackSpy = jest.fn();

        fixture.componentRef.setInput('actionKeyHandler', callbackSpy);
        fixture.detectChanges();

        fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete', bubbles: true }));

        expect(callbackSpy).toHaveBeenCalledTimes(1);
        expect(callbackSpy).toHaveBeenCalledWith(expect.any(KeyboardEvent), 'delete');
    });

    it('should execute action callback on Backspace key', () => {
        const callbackSpy = jest.fn();

        fixture.componentRef.setInput('actionKeyHandler', callbackSpy);
        fixture.detectChanges();

        fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));

        expect(callbackSpy).toHaveBeenCalledTimes(1);
        expect(callbackSpy).toHaveBeenCalledWith(expect.any(KeyboardEvent), 'delete');
    });

    it('should not execute action callback for non action keys', () => {
        const callbackSpy = jest.fn();

        fixture.componentRef.setInput('actionKeyHandler', callbackSpy);
        fixture.detectChanges();

        fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

        expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('should not execute action callback when keydown originates from nested interactive controls', () => {
        const callbackSpy = jest.fn();

        fixture.componentRef.setInput('actionKeyHandler', callbackSpy);
        fixture.detectChanges();

        const nestedButton = document.createElement('button');
        fixture.nativeElement.appendChild(nestedButton);

        nestedButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

        expect(callbackSpy).not.toHaveBeenCalled();
    });
});
