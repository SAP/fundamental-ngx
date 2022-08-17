import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from '../notification-service/notification.service';
import { ButtonModule } from '../../button/button.module';
import { NotificationModule } from '../notification.module';
import { CommonModule } from '@angular/common';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { RouterTestingModule } from '@angular/router/testing';

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
    imports: [CommonModule, BrowserModule, NotificationModule, ButtonModule]
})
class TestModule {}

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule, RouterTestingModule],
            providers: [DynamicComponentService, NotificationService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should generate component', () => {
        spyOn<any>(component, '_loadFromComponent').and.callThrough();
        component.childContent = TemplateTestComponent;
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any)._loadFromComponent).toHaveBeenCalled();
    });

    it('should generate template', () => {
        spyOn<any>(component, '_loadFromTemplate').and.callThrough();
        component.childContent = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any)._loadFromTemplate).toHaveBeenCalled();
    });
});
