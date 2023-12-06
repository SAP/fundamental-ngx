import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformValueHelpDialogModule } from '../../value-help-dialog.module';

import { DefineTabComponent } from './define-tab.component';

describe('DefineTabComponent', () => {
    let component: DefineTabComponent;
    let fixture: ComponentFixture<DefineTabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformValueHelpDialogModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefineTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
