import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MessageToastComponent } from './message-toast.component';
import { MessageToastContainerComponent } from './message-toast-utils/message-toast-container.component';
import { MessageToastService } from './message-toast-service/message-toast.service';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { MessageToastConfig } from './message-toast-utils/message-toast-config';

@Component({
    template: `
        <ng-template #testTemplate let-messageToast>
            Message Toast Test Content
        </ng-template>
    `
})
class TemplateTestComponent {
    @ViewChild('testTemplate', { static: true }) templateRef: TemplateRef<any>;
}

@NgModule({
    declarations: [MessageToastComponent, MessageToastContainerComponent, TemplateTestComponent],
    imports: [CommonModule, BrowserModule],
    providers: [MessageToastService, DynamicComponentService],
    entryComponents: [MessageToastComponent, MessageToastContainerComponent, TemplateTestComponent]
})
class TestModule {}

describe('MessageToastComponent', () => {
    let component: MessageToastComponent;
    let fixture: ComponentFixture<MessageToastComponent>;
    let service: MessageToastService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageToastComponent);
        component = fixture.componentInstance;
        service = TestBed.get(MessageToastService);
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
        spyOn<any>(component, '_loadFromComponent').and.callThrough();
        component.childContent = TemplateTestComponent;
        component.ngOnInit();
        component.ngAfterViewInit();
        expect((component as any)._loadFromComponent).toHaveBeenCalled();
        expect(component.componentRef).toBeTruthy();
    });

    it('should load child template', () => {
        spyOn<any>(component, '_loadFromTemplate').and.callThrough();
        component.childContent = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        component.ngOnInit();
        component.ngAfterViewInit();
        expect((component as any)._loadFromTemplate).toHaveBeenCalled();
        expect(component.componentRef).toBeTruthy();
    });

    it('should load child string', () => {
        const tester = 'Message Toast Test Content';
        spyOn<any>(component, '_loadFromString').and.callThrough();
        component.childContent = tester;
        component.ngOnInit();
        component.ngAfterViewInit();
        expect((component as any)._loadFromString).toHaveBeenCalled();
        expect(component.message).toBe(tester);
    });

    it('should hide the message toast', () => {
        component.open();
        expect(fixture.nativeElement.classList.contains('fd-has-display-block')).toBe(true);
        expect(fixture.nativeElement.classList.contains('fd-has-display-none')).toBe(false);
        component.close();
        expect(fixture.nativeElement.classList.contains('fd-has-display-block')).toBe(false);
        expect(fixture.nativeElement.classList.contains('fd-has-display-none')).toBe(true);
    });

    it('should open the message toast', () => {
        component.close();
        expect(fixture.nativeElement.classList.contains('fd-has-display-block')).toBe(false);
        expect(fixture.nativeElement.classList.contains('fd-has-display-none')).toBe(true);
        component.open();
        expect(fixture.nativeElement.classList.contains('fd-has-display-block')).toBe(true);
        expect(fixture.nativeElement.classList.contains('fd-has-display-none')).toBe(false);
    });

    it('should support visibleTime', fakeAsync(() => {
        service.open(TemplateTestComponent, { duration: 10 } as MessageToastConfig);
        service['_messageToasts'][0].instance.ngOnInit();
        fixture.detectChanges();
        service['_messageToasts'][0].instance.ngAfterViewInit();
        fixture.detectChanges();
        expect(service.hasOpenMessageToasts()).toBe(true);
        tick(20);
        fixture.whenStable().then(() => {
            expect(service.hasOpenMessageToasts()).toBe(false);
        });
    }));

    it('should handle mouseenter/mouseleave events', () => {
        component.handleMessageToastMouseEnterEvent();
        expect(component.mouseOverMessageToast).toBeTruthy();
        component.handleMessageToastMouseLeaveEvent();
        expect(component.mouseOverMessageToast).toBeFalsy();
    });
});
