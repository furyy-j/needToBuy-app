import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemDetailComponent } from './list-item-detail.component';

describe('ListItemDetailComponent', () => {
  let component: ListItemDetailComponent;
  let fixture: ComponentFixture<ListItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
