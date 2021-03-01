import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert-service/alert.service';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { AlertContainerComponent } from './alert-utils/alert-container.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ButtonModule } from '../button/button.module';
import { AlertConfig } from './alert-utils/alert-config';

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
    declarations: [AlertComponent, AlertContainerComponent, TemplateTestComponent],
    imports: [CommonModule, BrowserModule, NoopAnimationsModule, ButtonModule],
    providers: [AlertService, DynamicComponentService],
    entryComponents: [AlertComponent, AlertContainerComponent, TemplateTestComponent]
})
class TestModule {}

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;
    let service: AlertService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        service = TestBed.get(AlertService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get generated id', () => {
        component.ngOnInit();
        expect(component.id).toBeDefined();
    });

    it('should load child component', () => {
        spyOn<any>(component, 'loadFromComponent').and.callThrough();
        component.childContent = TemplateTestComponent;
        component.ngOnInit();
        component.ngAfterViewInit();
        expect((component as any).loadFromComponent).toHaveBeenCalled();
        expect(component.componentRef).toBeTruthy();
    });

    it('should load child template', () => {
        spyOn<any>(component, 'loadFromTemplate').and.callThrough();
        component.childContent = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        component.ngOnInit();
        component.ngAfterViewInit();
        expect((component as any).loadFromTemplate).toHaveBeenCalled();
        expect(component.componentRef).toBeTruthy();
    });

    it('should load child string', () => {
        const tester = 'teststring';
        spyOn<any>(component, 'loadFromString').and.callThrough();
        component.childContent = tester;
        component.ngOnInit();
        component.ngAfterViewInit();
        expect((component as any).loadFromString).toHaveBeenCalled();
        expect(component.message).toBe(tester);
    });

    it('should dismiss', () => {
        component.open();
        expect(fixture.nativeElement.classList.contains('fd-has-display-block')).toBe(true);
        expect(fixture.nativeElement.classList.contains('fd-has-display-none')).toBe(false);
        component.dismiss();
        expect(fixture.nativeElement.classList.contains('fd-has-display-block')).toBe(false);
        expect(fixture.nativeElement.classList.contains('fd-has-display-none')).toBe(true);
    });

    it('should open', () => {
        component.dismiss();
        expect(fixture.nativeElement.classList.contains('fd-has-display-block')).toBe(false);
        expect(fixture.nativeElement.classList.contains('fd-has-display-none')).toBe(true);
        component.open();
        expect(fixture.nativeElement.classList.contains('fd-has-display-block')).toBe(true);
        expect(fixture.nativeElement.classList.contains('fd-has-display-none')).toBe(false);
    });

    it('should persist', fakeAsync(() => {
        service.open(TemplateTestComponent, { duration: -1 } as AlertConfig);
        service['alerts'][0].instance.ngOnInit();
        fixture.detectChanges();
        service['alerts'][0].instance.ngAfterViewInit();
        fixture.detectChanges();
        tick(200);
        fixture.whenStable().then(() => {
            expect(service.hasOpenAlerts()).toBe(true);
        });
    }));

    it('should support visibleTime', fakeAsync(() => {
        service.open(TemplateTestComponent, { duration: 10 } as AlertConfig);
        service['alerts'][0].instance.ngOnInit();
        fixture.detectChanges();
        service['alerts'][0].instance.ngAfterViewInit();
        fixture.detectChanges();
        expect(service.hasOpenAlerts()).toBe(true);
        tick(20);
        fixture.whenStable().then(() => {
            expect(service.hasOpenAlerts()).toBe(false);
        });
    }));

    it('should handle mouseenter/mouseleave events', () => {
        component.handleAlertMouseEvent({ type: 'mouseenter' });
        expect(component.mouseInAlert).toBeTruthy();
        component.handleAlertMouseEvent({ type: 'mouseleave' });
        expect(component.mouseInAlert).toBeFalsy();
    });
});
