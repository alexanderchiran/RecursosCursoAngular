import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: true }) fomularioRegistro: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['Male', 'Female'];
  user = {
    username: '',
    email: '',
    secretQuestion:'',
    answer:'',
    gender:''
  };

  submitted = false;


  suggestUserName() {
    const suggestedName = 'Superuser';
    //primer enfoque de seteo de variables 
    // this.fomularioRegistro.setValue(
    //   {
    //     userData1:{
    //       username: suggestedName,
    //       email:'algo@algo.com'
    //     },
    //     secret:'pet',
    //     secret2:'pet',
    //     questionAnswer:'123',
    //     gender: 'Male'
    //   }
    // );

    //segundo enfoque de seteo de variables
    this.fomularioRegistro.form.patchValue({userData1: {username: suggestedName}})
  }

  // onSubmit1(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit1() {
    this.submitted= true;
    console.log(this.fomularioRegistro);
    this.user.username = this.fomularioRegistro.value.userData1.username;
    this.user.email = this.fomularioRegistro.value.userData1.email;
    this.user.secretQuestion = this.fomularioRegistro.value.secret;
    this.user.answer = this.fomularioRegistro.value.questionAnswer;
    this.user.gender = this.fomularioRegistro.value.gender;

    //RESET THE FORM    
    this.fomularioRegistro.reset();
  }
}
