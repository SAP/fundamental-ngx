import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxSemanticIconComponent } from './message-box-semantic-icon.component';

describe('MessageBoxSemanticIconComponent', () => {
    let component: MessageBoxSemanticIconComponent;
    let fixture: ComponentFixture<MessageBoxSemanticIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageBoxSemanticIconComponent],
            providers: [MessageBoxConfig]
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
