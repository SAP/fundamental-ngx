import { AlertService } from './alert.service';
import { TestBed } from '@angular/core/testing';
import { NgModule, TemplateRef, Component, ViewChild } from '@angular/core';
import { AlertRef } from '../alert-utils/alert-ref';
import { AlertComponent } from '../alert.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AlertContainerComponent } from '../alert-utils/alert-container.component';

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
    declarations: [AlertComponent, AlertContainerComponent, TemplateTestComponent],
    imports: [CommonModule, BrowserModule],
    providers: [AlertService],
    entryComponents: [AlertComponent, AlertContainerComponent, TemplateTestComponent]
})
class TestModule {}

describe('AlertService', () => {
    let service: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();

        service = TestBed.get(AlertService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    it('should open alert container', () => {
        expect(service['alertContainerRef']).toBeFalsy();
        (service as any).openAlertContainer();
        expect(service['alertContainerRef']).toBeTruthy();
    });

    it('should destroy alert container', () => {
        expect(service['alertContainerRef']).toBeFalsy();
        (service as any).openAlertContainer();
        expect(service['alertContainerRef']).toBeTruthy();
        (service as any).destroyAlertContainer();
        expect(service['alertContainerRef']).toBeFalsy();
    });

    it('should open alerts from string', () => {
        spyOn<any>(service, 'openAlertContainer').and.callThrough();
        spyOn<any>(service, 'destroyAlertContainer').and.callThrough();
        spyOn<any>(service, 'destroyAlertComponent').and.callThrough();

        expect(service['alerts'].length).toBe(0);
        expect(service['alertContainerRef']).toBeFalsy();

        const alertRef: AlertRef = service.open('teststring', {dismissible: false, duration: -1});
        expect((service as any).openAlertContainer).toHaveBeenCalled();
        expect(service['alerts'].length).toBe(1);
        expect(service['alertContainerRef']).toBeTruthy();

        alertRef.dismiss();
        expect((service as any).destroyAlertContainer).toHaveBeenCalled();
        expect((service as any).destroyAlertComponent).toHaveBeenCalled();
        expect(service['alerts'].length).toBe(0);
        expect(service['alertContainerRef']).toBeFalsy();
    });

    it('should open alerts from template', () => {
        spyOn<any>(service, 'openAlertContainer').and.callThrough();
        spyOn<any>(service, 'destroyAlertContainer').and.callThrough();
        spyOn<any>(service, 'destroyAlertComponent').and.callThrough();

        expect(service['alerts'].length).toBe(0);
        expect(service['alertContainerRef']).toBeFalsy();

        const fixtureElTmp = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        const alertRef: AlertRef = service.open(fixtureElTmp, {dismissible: false, duration: -1});
        expect((service as any).openAlertContainer).toHaveBeenCalled();
        expect(service['alerts'].length).toBe(1);
        expect(service['alertContainerRef']).toBeTruthy();

        alertRef.dismiss();
        expect((service as any).destroyAlertContainer).toHaveBeenCalled();
        expect((service as any).destroyAlertComponent).toHaveBeenCalled();
        expect(service['alerts'].length).toBe(0);
        expect(service['alertContainerRef']).toBeFalsy();
    });

    it('should open alerts from component', () => {
        spyOn<any>(service, 'openAlertContainer').and.callThrough();
        spyOn<any>(service, 'destroyAlertContainer').and.callThrough();
        spyOn<any>(service, 'destroyAlertComponent').and.callThrough();

        expect(service['alerts'].length).toBe(0);
        expect(service['alertContainerRef']).toBeFalsy();

        const alertRef: AlertRef = service.open(TemplateTestComponent, {dismissible: false, duration: -1});
        expect((service as any).openAlertContainer).toHaveBeenCalled();
        expect(service['alerts'].length).toBe(1);
        expect(service['alertContainerRef']).toBeTruthy();

        alertRef.dismiss();
        expect((service as any).destroyAlertContainer).toHaveBeenCalled();
        expect((service as any).destroyAlertComponent).toHaveBeenCalled();
        expect(service['alerts'].length).toBe(0);
        expect(service['alertContainerRef']).toBeFalsy();
    });

    it('should dismiss all alerts', () => {
        service.open('teststring1');
        service.open('teststring2');
        service.open('teststring3');
        expect(service['alerts'].length).toBe(3);

        (service as any).dismissAll();
        expect(service['alerts'].length).toBe(0);
    });

    it('should support hasOpenAlerts', () => {
        expect(service.hasOpenAlerts()).toBe(false);
        service.open('teststring');
        expect(service.hasOpenAlerts()).toBe(true);
    });

    it('should destroy alert container after last alert destroyed', () => {
        spyOn<any>(service, 'openAlertContainer').and.callThrough();
        spyOn<any>(service, 'destroyAlertContainer').and.callThrough();

        service.open('teststring');
        expect((service as any).openAlertContainer).toHaveBeenCalled();

        service.dismissAll();
        expect((service as any).destroyAlertContainer).toHaveBeenCalled();
    });
});
