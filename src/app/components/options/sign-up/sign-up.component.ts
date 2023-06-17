import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private fb: FormBuilder, private router: Router) {
  }

  infoGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobilePhone: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    role: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required])
  })

  detailsGroup = this.fb.group({
    info: new FormControl('', [Validators.required, Validators.minLength(10)]),
    status: new FormControl('',[Validators.required,Validators.minLength(1)]),
    jobTitle: new FormControl('',[Validators.required,Validators.minLength(2)]),
    imageUrl: new FormControl('',[Validators.required])
  })

  navigateToHomePage(){
    this.router.navigate(['/home']);
  }
}
