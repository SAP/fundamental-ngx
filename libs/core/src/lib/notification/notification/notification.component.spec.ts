import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from '../notification-service/notification.service';
import { ButtonModule, NotificationDefault } from '@fundamental-ngx/core';
import { NotificationModule } from '../notification.module';
import { CommonModule } from '@angular/common';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';


@Component({
    template: `
        <ng-template #testTemplate let-notification>
            <h1>test</h1>
            <a href="#">testLink</a>
            <button>testBtn</button>
        </ng-template>
    `
})
class TemplateTestComponent {
    @ViewChild('testTemplate', { static: true }) templateRef: TemplateRef<any>;
}

@NgModule({
    declarations: [TemplateTestComponent],
    imports: [CommonModule, BrowserModule, NotificationModule, ButtonModule],
    entryComponents: [TemplateTestComponent]
})
class TestModule {}

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let notificationService: NotificationService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [DynamicComponentService, NotificationService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        notificationService = TestBed.get(NotificationService);
    });

    it('should generate From Object', () => {
        spyOn<any>(component, 'createFromDefaultConfiguration').and.callThrough();
        component.childContent = new NotificationDefault();
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any).createFromDefaultConfiguration).toHaveBeenCalled();
    });

    it('should generate component', () => {
        spyOn<any>(component, 'loadFromComponent').and.callThrough();
        component.childContent = TemplateTestComponent;
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any).loadFromComponent).toHaveBeenCalled();
    });

    it('should generate template', () => {
        spyOn<any>(component, 'loadFromTemplate').and.callThrough();
        component.childContent = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any).loadFromTemplate).toHaveBeenCalled();
    });
});
