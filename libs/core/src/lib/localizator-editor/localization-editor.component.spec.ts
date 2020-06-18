import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationEditorComponent } from './localization-editor.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { PopoverModule } from '../popover/popover.module';
import { ListModule } from '../list/list.module';
import { FormModule } from '../form/form.module';
import { InputGroupModule } from '../input-group/input-group.module';

describe('LocalizatorEditorComponent', () => {
    let component: LocalizationEditorComponent;
    let fixture: ComponentFixture<LocalizationEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PopoverModule, FormModule, InputGroupModule, ListModule, ButtonModule],
            declarations: [LocalizationEditorComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocalizationEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should add class', () => {
        expect(fixture.nativeElement.className).toBe('fd-localization-editor');
    });
});
