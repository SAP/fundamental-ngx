import { TestBed } from '@angular/core/testing';
import { NgModule, TemplateRef, Component, ViewChild } from '@angular/core';
import { NotificationService } from '../notification-service/notification.service';
import { NotificationRef } from '../notification-utils/notification-ref';
import { NotificationModule } from '../notification.module';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
    template: `
        <ng-template #testTemplate let-alert>
            <h1>test</h1>
        </ng-template>
    `
})
class TemplateTestComponent {
    @ViewChild('testTemplate', { static: true }) templateRef: TemplateRef<any>;
}

@NgModule({
    imports: [NotificationModule, RouterTestingModule],
    providers: [NotificationService],
    declarations: [TemplateTestComponent]
})
class TestModule {}

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();

        service = TestBed.get(NotificationService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    it('should open notifications from template', () => {
        jest.spyOn<any, any>(service, '_destroyNotificationComponent');

        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();

        const fixtureElTmp = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        const notificationRef: NotificationRef = service.open(fixtureElTmp);
        expect(service['notifications'].length).toBe(1);
        expect(service['containerRef']).toBeTruthy();

        notificationRef.close();
        expect((service as any)._destroyNotificationComponent).toHaveBeenCalled();
        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();
    });

    it('should open notifications from component', () => {
        jest.spyOn<any, any>(service, '_destroyNotificationComponent');

        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();

        const notificationRef: NotificationRef = service.open(TemplateTestComponent);

        expect(service['notifications'].length).toBe(1);
        expect(service['containerRef']).toBeTruthy();

        notificationRef.close();
        expect((service as any)._destroyNotificationComponent).toHaveBeenCalled();
        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();
    });

    it('should dismiss all alerts', () => {
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        expect(service['notifications'].length).toBe(5);

        service.destroyAll();

        expect(service['notifications'].length).toBe(0);
    });
});
