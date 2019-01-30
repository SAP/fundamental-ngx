import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { HashService } from '../utils/hash.service';
import { AlertService } from './alert.service';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(async(() => {
        const hashSpy = jasmine.createSpyObj('HashService', ['hash']);
        const alertServiceSpy = jasmine.createSpyObj('AlertService', ['open', 'popAlert', 'getAlertCount']);

        TestBed.configureTestingModule({
            declarations: [AlertComponent],
            providers: [{ provide: HashService, useValue: hashSpy }, { provide: AlertService, useValue: alertServiceSpy }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get an ID and handle the close event for that ID', () => {
        component.ngOnInit();
        expect(component.generatedId).toBeDefined();
        component.close.subscribe(id => expect(id).toBe(component.id));
        component.handleClose();
    });
});
