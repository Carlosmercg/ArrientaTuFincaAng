import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsForMyPropertiesComponent } from './requests-for-my-properties.component';

describe('RequestsForMyPropertiesComponent', () => {
  let component: RequestsForMyPropertiesComponent;
  let fixture: ComponentFixture<RequestsForMyPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsForMyPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsForMyPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
