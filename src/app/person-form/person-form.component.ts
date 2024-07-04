import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule,],
  template: `
  <form [formGroup]="personForm" (ngSubmit)="onSubmit()">
  <label for="name">Name:</label>
  <input id="name" formControlName="name" /><br /><br />
  <label for="age">Age:</label>
  <input id="age" formControlName="age" /><br /><br />
  <button type="submit">Save</button>
</form>
`,
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent {
  personForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const data = this.personForm.value;
      this.http.post('http://localhost:8080/midoripol/persons', data).subscribe(
        response => {
          console.log('Persistenza riuscita');
        },
        error => {
          console.log('Persistenza fallita', error);
        }
      );
    }
  }
}
