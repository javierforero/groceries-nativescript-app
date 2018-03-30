import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import { setHintColor} from "../../utils/hint-util";
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: './pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {

    user: User;
    isLoggingIn:boolean = true;

    @ViewChild("container") container: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("password") password: ElementRef;


    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
        this.user.email = "javier@gmail.com";
        this.user.password = "12345";
    }

    submit() {
        if(!this.user.isValidEmail()) {
            alert("Please enter a valid email address");
            return;
        }
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

        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#2763F5"),
            duration: 200
        });
        if(this.isLoggingIn) {
            this.page.color = new Color("black");
        } else {
            this.page.color = new Color("white");
        }

    }

    setTextFieldColors() {
        let emailTextField = <TextField>this.email.nativeElement;
        let passwordTextField = <TextField>this.password.nativeElement;

        let mainTextColor = new Color(this.isLoggingIn ? "black" : "white");
        emailTextField.color = mainTextColor;
        passwordTextField.color = mainTextColor;

        let hintColor = new Color(this.isLoggingIn ? "black" : "white");
        setHintColor({ view: emailTextField, color: hintColor });
        setHintColor({ view: passwordTextField, color: hintColor });
    }


    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
    }

}
