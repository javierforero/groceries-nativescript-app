import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: './pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent {
    email="";
    user: User;
    isLoggingIn:boolean = true;

    constructor(private router: Router, private userService: UserService) {
        this.user = new User();
        this.user.email = "javier@gmail.com";
        this.user.password = "12345";
    }

    submit() {
        if(this.isLoggingIn) {
            this.logIn();
        } else {
            this.signUp();
        }
    }

    logIn() {
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(["/list"]),
                (error) => {
                        alert("Unfortunately we could not find your account.");
                        console.log("myError: ", error);
                      }
            )
    }

    signUp() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleLogIn();

                },
                () => alert("Unfortunately we were unable to create your account.")
            )
    }

    toggleLogIn() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
