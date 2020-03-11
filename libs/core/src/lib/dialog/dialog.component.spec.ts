import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog-service/dialog.service';
import { DialogModule } from './dialog.module';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import createSpyObj = jasmine.createSpyObj;
import { DialogRef } from './dialog-utils/dialog-ref.class';

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
    @ViewChild('testTemplate', { static: true }) templateRef: TemplateRef<any>;
}

@NgModule({
    declarations: [TemplateTestComponent],
    imports: [CommonModule, BrowserModule, DialogModule, NoopAnimationsModule],
    providers: [DialogService],
    entryComponents: [TemplateTestComponent]
})
class TestModule {}

describe('DialogComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;
    let modalService: DialogService;
    const modalRef = createSpyObj('modalRef', ['dismiss']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [{provide: DialogRef, useValue: modalRef}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        modalService = TestBed.get(DialogService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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

    it('should close after esc pressed', () => {
        component.childComponentType = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component['componentRef']).toBeTruthy();
        component['elRef'].nativeElement.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
        expect(modalRef.dismiss).toHaveBeenCalled();
    });

});
