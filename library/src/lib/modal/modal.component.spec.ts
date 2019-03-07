import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { ModalModule } from './modal.module';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
    declarations: [TemplateTestComponent],
    imports: [CommonModule, BrowserModule, ModalModule, NoopAnimationsModule],
    providers: [ModalService],
    entryComponents: [TemplateTestComponent]
})
class TestModule {}

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let modalService: ModalService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        modalService = TestBed.get(ModalService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should generate component', () => {
        spyOn<any>(component, 'loadFromComponent').and.callThrough();
        component.childComponentType = TemplateTestComponent;
        component.ngOnInit();
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any).loadFromComponent).toHaveBeenCalled();
    });

    it('should generate template', () => {
        spyOn<any>(component, 'loadFromTemplate').and.callThrough();
        component.childComponentType = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        component.ngOnInit();
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        expect((component as any).loadFromTemplate).toHaveBeenCalled();
    });

    it('should trap focus', () => {
        component['focusTrap'] = null;
        component.focusTrapped = true;
        expect(component['focusTrap']).toBeFalsy();
        component.ngOnInit();
        component.ngAfterViewInit();
        expect(component['focusTrap']).toBeTruthy();
    });

    it('should skip trap focus', () => {
        component['focusTrap'] = null;
        component.focusTrapped = false;
        expect(component['focusTrap']).toBeFalsy();
        component.ngOnInit();
        component.ngAfterViewInit();
        expect(component['focusTrap']).toBeFalsy();
    });

});
