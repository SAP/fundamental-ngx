import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { DialogService, DialogRef } from '@fundamental-ngx/core/dialog';
import { UserMenuComponent } from './user-menu.component';
import { of } from 'rxjs';

@Component({
    template: `
        <ng-template #testTemplate>
            <div>Test Dialog Content</div>
        </ng-template>
    `,
    standalone: true,
    imports: [CommonModule]
})
class TemplateTestComponent {
    @ViewChild('testTemplate', { static: true }) templateRef: TemplateRef<any>;
}

describe('UserMenuComponent', () => {
    let component: UserMenuComponent;
    let fixture: ComponentFixture<UserMenuComponent>;
    let dialogService: jasmine.SpyObj<DialogService>;
    let rtlService: jasmine.SpyObj<RtlService>;
    let dialogRefSpy: jasmine.SpyObj<DialogRef>;

    beforeEach(waitForAsync(() => {
        dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close'], { afterClosed: of(null) });
        dialogService = jasmine.createSpyObj('DialogService', ['open']);
        dialogService.open.and.returnValue(dialogRefSpy);
        rtlService = jasmine.createSpyObj('RtlService', ['rtl'], { rtl: of(false) });

        TestBed.configureTestingModule({
            imports: [CommonModule, UserMenuComponent, TemplateTestComponent],
            providers: [
                { provide: DialogService, useValue: dialogService },
                { provide: RtlService, useValue: rtlService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should open the user menu', () => {
        spyOn(component.isOpenChange, 'emit');
        component.open();
        expect(component.isOpen()).toBeTrue();
        expect(component.isOpenChange.emit).toHaveBeenCalledWith(true);
    });

    it('should close the user menu', () => {
        spyOn(component.isOpenChange, 'emit');
        component.close();
        expect(component.isOpen()).toBeFalse();
        expect(component.isOpenChange.emit).toHaveBeenCalledWith(false);
    });

    it('should open dialog in mobile mode', () => {
        const templateTestFixture = TestBed.createComponent(TemplateTestComponent);
        const templateComponent = templateTestFixture.componentInstance;
        templateTestFixture.detectChanges();

        component.openDialog(templateComponent.templateRef);
        expect(dialogService.open).toHaveBeenCalled();
    });
});
