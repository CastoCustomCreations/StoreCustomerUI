import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ContactForm } from '../../Models/contactform.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import {FormControl, FormGroup, FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ChangeDetectionStrategy, model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [AsyncPipe,FormsModule,ReactiveFormsModule,MatCardModule, MatDatepickerModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  http = inject(HttpClient);
  date = model<Date | null>(null);

  ContactForm = new FormGroup({
    Name: new FormControl<string>(''),
    Email: new FormControl<string | null>(null),
    Phone: new FormControl<string>(''),
    Message: new FormControl<string>(''),
    Date: new FormControl<string>(''),

  });

  ContactForm$ = this.getContactForm();

  onFormSubmit(){
    const addContactFormRequest = {
      Name: this.ContactForm.value.Name,
      Email: this.ContactForm.value.Email,
      Phone: this.ContactForm.value.Phone,
      Message: this.ContactForm.value.Message,
      Date: this.ContactForm.value.Date,


    }
    this.http.post('https://localhost:7286/api/ContactF', addContactFormRequest)
    .subscribe({
      next: (value)=>{
        console.log(value);
        this.ContactForm$ = this.getContactForm();
        this.ContactForm.reset();
      }
    });
  }
  onDelete(id:string){
    this.http.delete(`https://localhost:7286/api/ContactForm/${id}`)
    .subscribe({
      next: (value)=>{
        alert('Item deleted');
        this.ContactForm$ = this.getContactForm();
      }
      })

  }

  private getContactForm(): Observable<ContactForm[]> {
    return this.http.get<ContactForm[]>('https://localhost:7286/api/ContactForm');
  }
}
