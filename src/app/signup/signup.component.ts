import {Component, View} from 'angular2/core';

import {SignupService} from './signup.service';

// We `import` `http` into our `SignupService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from 'angular2/http';

// Import NgFor directive
import {NgFor} from 'angular2/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'signup',
    // Let Angular 2 know about `Http` and `SignupService`
    providers: [...HTTP_PROVIDERS, SignupService]
})
@View({
    template: require('./signup.html'),
})
export class Signup {

  // Initialize our `signupData.text` to an empty `string`
  signupData = {
    username: '',
    password: '',
    email: ''
  };

  private signups: Array<Signup> = [];

  constructor(public signupService: SignupService) {
      console.log('Signup constructor go!');

      //this.signups = [];
      signupService.getAll()
      // `Rxjs`; we subscribe to the response
          .subscribe((res) => {

              // Populate our `signup` array with the `response` data
              this.signups = res;
              // Reset `signup` input
              this.signupData.username = '';
            this.signupData.password = '';
            this.signupData.email = '';
          });

  }


  createSignup() {
      console.log(this.signupData);

      this.signupService.createSignup(this.signupData)
        .subscribe((res) => {

            // Populate our `signup` array with the `response` data
            this.signups = res;
            // Reset `signup` input
          this.signupData.username = '';
          this.signupData.password = '';
          this.signupData.email = '';
        });
  }

  deleteSignup(id) {

    this.signupService.deleteSignup(id)
      .subscribe((res) => {

          // Populate our `signup` array with the `response` data
          this.signups = res;
      });
  }

  refresh(){
      console.log("11111");
      this.signupService.getAll()
          .subscribe((res) => {

              // Populate our `signup` array with the `response` data
              this.signups = res;
              // Reset `signup` input
            this.signupData.username = '';
            this.signupData.password = '';
            this.signupData.email = '';
      });
  }
}
