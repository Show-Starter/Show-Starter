import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEventDialogComponent } from './find-event-dialog.component';

describe('FindEventDialogComponent', () => {
  let component: FindEventDialogComponent;
  let fixture: ComponentFixture<FindEventDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindEventDialogComponent]
    });
    fixture = TestBed.createComponent(FindEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
