import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  formularioRegistro: FormGroup;
  forbiddenUserNames = ['Paulo','Alex'];

  ngOnInit() {
    this.formularioRegistro = new FormGroup({
      'userData': new FormGroup({
        //'username': new FormControl(null, Validators.required, this.forbiddenNames.bind(this)),
        'username': new FormControl(null, Validators.required),
        //'email': new FormControl('algo@algo.com',[Validators.required, Validators.email]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies' : new  FormArray([])
    });
  }

  onSubmit() {
    console.log(this.formularioRegistro);
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.formularioRegistro.get('hobbies')).push(control);
  }

  /*forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }*/

  getControls() {
    return (<FormArray>this.formularioRegistro.get('hobbies')).controls;
  }
}
