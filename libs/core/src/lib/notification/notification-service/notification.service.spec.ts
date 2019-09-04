import { TestBed } from '@angular/core/testing';
import { NgModule, TemplateRef, Component, ViewChild } from '@angular/core';
import { NotificationModule, NotificationRef, NotificationService } from '@fundamental-ngx/core';

@Component({
    template: `        
            <ng-template #testTemplate let-alert>
                <h1>test</h1>
            </ng-template>
    `
})
class TemplateTestComponent {
    @ViewChild('testTemplate') templateRef: TemplateRef<any>;
}

@NgModule({
    imports: [NotificationModule],
    providers: [NotificationService],
    declarations: [TemplateTestComponent],
    entryComponents: [TemplateTestComponent]
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

    it('should open notification container', () => {
        service.open({});
        expect(service['containerRef']).toBeTruthy();
    });

    it('should open notifications from object', () => {
        spyOn<any>(service, 'destroyNotificationComponent').and.callThrough();

        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();

        const notificationRef: NotificationRef = service.open({});
        expect(service['notifications'].length).toBe(1);
        expect(service['containerRef']).toBeTruthy();

        notificationRef.dismiss();
        expect((service as any).destroyNotificationComponent).toHaveBeenCalled();
        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();
    });

    it('should open notifications from template', () => {
        spyOn<any>(service, 'destroyNotificationComponent').and.callThrough();

        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();

        const fixtureElTmp = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        const notificationRef: NotificationRef = service.open(fixtureElTmp);
        expect(service['notifications'].length).toBe(1);
        expect(service['containerRef']).toBeTruthy();

        notificationRef.close();
        expect((service as any).destroyNotificationComponent).toHaveBeenCalled();
        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();
    });

    it('should open notifications from component', () => {
        spyOn<any>(service, 'destroyNotificationComponent').and.callThrough();

        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();

        const notificationRef: NotificationRef = service.open(TemplateTestComponent);

        expect(service['notifications'].length).toBe(1);
        expect(service['containerRef']).toBeTruthy();

        notificationRef.close();
        expect((service as any).destroyNotificationComponent).toHaveBeenCalled();
        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();
    });

    it('should open notifications in Group', () => {
        expect(service['notifications'].length).toBe(0);
        expect(service['containerRef']).toBeFalsy();

        const groupContainerRef = service.createNotificationGroup(null);

        const notificationRef1: NotificationRef = service.open(TemplateTestComponent, null, groupContainerRef);
        const notificationRef2: NotificationRef = service.open(TemplateTestComponent, null, groupContainerRef);
        const notificationRef3: NotificationRef = service.open(TemplateTestComponent, null, groupContainerRef);
        const notificationRef4: NotificationRef = service.open(TemplateTestComponent, null, groupContainerRef);

        expect(service['notifications'].length).toBe(4);
        expect(service['containerRef']).toBeTruthy();

        notificationRef4.close();

        expect(service['notifications'].length).toBe(3);

        notificationRef3.closeWholeGroup();

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
