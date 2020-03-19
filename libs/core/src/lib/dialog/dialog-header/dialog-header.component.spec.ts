import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHeaderComponent } from './dialog-header.component';
import { DialogModule } from '../dialog.module';
import { DialogRef } from '../dialog-utils/dialog-ref.class';

describe('DialogHeaderComponent', () => {
    let component: DialogHeaderComponent;
    let fixture: ComponentFixture<DialogHeaderComponent>;
    const modalRef = jasmine.createSpyObj('DialogRef', ['dismiss']);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [DialogModule],
            providers: [
                { provide: DialogRef, useValue: modalRef },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });

});
