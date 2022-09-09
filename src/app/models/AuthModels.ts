export class User{
    email:string
    password:string
    constructor(email:string,pass:string){
        this.email = email
        this.password = pass
    }
}
export interface TokenModel{
    token:string
}