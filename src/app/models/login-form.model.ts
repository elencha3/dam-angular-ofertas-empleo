export class LoginForm {
    //Declaro la clase formulario de login con todos los campos que tendrá mi formulario de login

    private username: string;
    private password: string;
    private rememberMe: boolean;
    
    constructor(_username: string, _password: string, _rememberMe: boolean) {
        this.username = _username;
        this.password = _password;
        this.rememberMe = _rememberMe
        }
    
    get nombre(): string {
        return this.username;
    }
    set nombre(value: string) {
        this.username = value;
    }

    get pass(): string {
        return this.password;
    }
    set pass(value: string) {
        this.password = value;
    }

    get check(): boolean {
        return this.rememberMe;
    }
    set check(value: boolean) {
        this.rememberMe = value;
    }
    
}