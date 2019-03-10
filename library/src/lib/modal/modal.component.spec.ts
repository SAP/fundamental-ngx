import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal-service/modal.service';
import { ModalModule } from './modal.module';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import createSpyObj = jasmine.createSpyObj;
import { ModalRef } from './modal-utils/modal-ref';

@Component({
    template: `        
            <ng-template #testTemplate let-modal>
                <h1>test</h1>
                <a href="#">testLink</a>
                <button fd-button>testBtn</button>
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
    const modalRef = createSpyObj('modalRef', ['dismiss']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [{provide: ModalRef, useValue: modalRef}]
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

    it('should close after esc pressed', () => {
        component.childComponentType = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        component.ngOnInit();
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        component['elRef'].nativeElement.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
        expect(modalRef.dismiss).toHaveBeenCalled();
    });

});
