import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MessageToastComponent, MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { BusyIndicatorModule } from '../busy-indicator.module';

@Component({
    template: `<ng-template #testTemplate let-messageToast>
        <div fd-busy-indicator-extended>
            <fd-busy-indicator [loading]="true" label="Please wait" ariaLabel="Please wait"></fd-busy-indicator>
        </div>
    </ng-template>`,
    standalone: true,
    imports: [BusyIndicatorModule, MessageToastModule]
})
class TestComponent {
    @ViewChild('testTemplate', { static: true }) templateRef: TemplateRef<any>;
}

describe('BusyIndicatorExtendedDirective', () => {
    let messageComponent: MessageToastComponent;
    let fixture: ComponentFixture<MessageToastComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BusyIndicatorModule, MessageToastModule, TestComponent],
            providers: [MessageToastService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageToastComponent);
        messageComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(messageComponent).toBeTruthy();
    });

    it('should assign classes', () => {
        spyOn<any>(messageComponent, '_loadFromComponent').and.callThrough();

        messageComponent.childContent = TestBed.createComponent(TestComponent).componentInstance.templateRef;
        messageComponent.open();
        messageComponent.ngOnInit();
        messageComponent.ngAfterViewInit();

        expect(fixture.nativeElement.classList.contains('fd-busy-indicator-extended--message-toast')).toBe(true);
        expect(fixture.nativeElement.classList.contains('fd-busy-indicator-extended')).toBe(true);
    });
});
