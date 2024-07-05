import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
  <form #personForm="ngForm" (ngSubmit)="onSubmit(personForm)">
    <label for="name">Name:</label>
    <input id="name" name="name" ngModel required /><br /><br />
    <label for="age">Age:</label>
    <input id="age" name="age" ngModel required /><br /><br />
    <button type="submit" [disabled]="!personForm.valid">Save</button>
  </form>
  `,
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  constructor(private http: HttpClient) {}

  onSubmit(personForm: any) {
    if (personForm.valid) {
      const data = personForm.value;
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
