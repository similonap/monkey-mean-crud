import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyList } from './monkey-list';

describe('MonkeyList', () => {
  let component: MonkeyList;
  let fixture: ComponentFixture<MonkeyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonkeyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonkeyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
