import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { BusyIndicatorExtendedDirective } from './busy-indicator-extended.directive';
import { MessageToastService } from '../../message-toast/message-toast-service/message-toast.service';
import { MessageToastComponent } from '../../message-toast/message-toast.component';
import { MessageToastContainerComponent } from '../../message-toast/message-toast-utils/message-toast-container.component';
import { BusyIndicatorComponent } from '../busy-indicator.component';

@Component({
    template: `<ng-template #testTemplate let-messageToast>
        <div fd-busy-indicator-extended>
            <fd-busy-indicator [loading]="true" label="Please wait" ariaLabel="Please wait"></fd-busy-indicator>
        </div>
    </ng-template>`
})
class TestComponent {
    @ViewChild('testTemplate', { static: true }) templateRef: TemplateRef<any>;
}

@NgModule({
    declarations: [
        MessageToastComponent,
        MessageToastContainerComponent,
        BusyIndicatorComponent,
        BusyIndicatorExtendedDirective,
        TestComponent
    ],
    imports: [CommonModule, BrowserModule],
    providers: [MessageToastService],
    entryComponents: [
        MessageToastComponent,
        MessageToastContainerComponent,
        BusyIndicatorComponent,
        BusyIndicatorExtendedDirective,
        TestComponent
    ]
})
class TestModule {}

describe('BusyIndicatorExtenedDirective', () => {
    let messageComponent: MessageToastComponent;
    let fixture: ComponentFixture<MessageToastComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [TestModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageToastComponent);
        messageComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(messageComponent).toBeTruthy();
    });

    it('should assign classes', () => {
        messageComponent.open();
        spyOn<any>(messageComponent, '_loadFromComponent').and.callThrough();
        messageComponent.childContent = TestBed.createComponent(TestComponent).componentInstance.templateRef;
        messageComponent.ngOnInit();
        messageComponent.ngAfterViewInit();
        console.log('message component', fixture.nativeElement.classList);
        expect(fixture.nativeElement.classList.contains('fd-busy-indicator-extended--message-toast')).toBe(true);
        expect(fixture.nativeElement.classList.contains('fd-busy-indicator-extended')).toBe(true);
    });
});
