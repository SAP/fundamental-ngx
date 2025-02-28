import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
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
    imports: [NotificationModule, ButtonModule]
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
                ButtonModule,
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
});
