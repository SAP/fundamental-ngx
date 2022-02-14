import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxConfig, MessageBoxHost } from '../utils/message-box-config.class';
import { MessageBoxSemanticIconComponent } from './message-box-semantic-icon.component';

describe('MessageBoxSemanticIconComponent', () => {
    let component: MessageBoxSemanticIconComponent;
    let fixture: ComponentFixture<MessageBoxSemanticIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageBoxSemanticIconComponent],
            providers: [{ provide: MessageBoxHost, useValue: { _messageBoxConfig: new MessageBoxConfig() } }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageBoxSemanticIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
