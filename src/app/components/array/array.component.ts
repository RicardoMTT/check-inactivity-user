import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrayComponent implements OnInit {
  formParent: FormGroup = new FormGroup({});

  constructor() {}

  ngOnInit(): void {
    this.initFormParent();
  }

  initFormParent(): void {
    this.formParent = new FormGroup({
      name: new FormControl('', [Validators.required]),
      skills: new FormArray([], [Validators.required]),
    });
  }

  initFormSkills(): FormGroup {
    return new FormGroup({
      language: new FormControl(''),
      projectUrl: new FormControl(''),
      expYear: new FormControl('', [Validators.required]),
    });
  }

  addSkill(): void {
    const refSkills = this.formParent.get('skills') as FormArray;
    refSkills.push(this.initFormSkills());
  }

  getCtrl(key: string, form: FormGroup): any {
    return form.get(key);
  }
}
