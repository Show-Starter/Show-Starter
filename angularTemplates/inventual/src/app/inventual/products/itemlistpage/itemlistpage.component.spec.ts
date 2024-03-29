import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemlistpageComponent } from './itemlistpage.component';

describe('ItemlistpageComponent', () => {
  let component: ItemlistpageComponent;
  let fixture: ComponentFixture<ItemlistpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemlistpageComponent]
    });
    fixture = TestBed.createComponent(ItemlistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
