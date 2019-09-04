import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { ModalService, NotificationDefault, NotificationModule, NotificationService } from '@fundamental-ngx/core';
import { CommonModule } from '@angular/common';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalComponent } from '../../modal/modal.component';
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
    @ViewChild('testTemplate') templateRef: TemplateRef<any>;
}

@NgModule({
    declarations: [TemplateTestComponent],
    imports: [CommonModule, BrowserModule, NotificationModule],
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
            providers: [NotificationService, DynamicComponentService]
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
        component.childComponentType = new NotificationDefault();
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any).createFromDefaultConfiguration).toHaveBeenCalled();
    });

    it('should generate component', () => {
        spyOn<any>(component, 'loadFromComponent').and.callThrough();
        component.childComponentType = TemplateTestComponent;
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any).loadFromComponent).toHaveBeenCalled();
    });

    it('should generate template', () => {
        spyOn<any>(component, 'loadFromTemplate').and.callThrough();
        component.childComponentType = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any).loadFromTemplate).toHaveBeenCalled();
    });
});
