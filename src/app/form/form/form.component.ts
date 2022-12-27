import { Component } from '@angular/core';

const sendRequest = function (value: any) {
  const invalidEmail = 'test@dx-email.com';
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value !== invalidEmail);
    }, 1000);
  });
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  currentValue: Date = new Date();

  name!: string
  email!: string;
  checkBox!: boolean;

  employee = {

  }

  asyncValidation(params: any) {
    return sendRequest(params.value);
  }

  cobaAdd(e: any) {
    console.log(e);
    console.log(this.employee);
  }

  submitButtonOptions = {
    text: "Submit the Form",
    useSubmitBehavior: true,
    // onClick: function (e: any) {
    //   console.log(e);
    // console.log(e.employee);
    // }
  }


}
