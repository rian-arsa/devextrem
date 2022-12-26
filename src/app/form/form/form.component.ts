import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  currentValue: Date = new Date();

  email!: string;
  checkBox!: boolean;

  cobaAdd(form: NgForm) {
    console.log(form);
  }

}
