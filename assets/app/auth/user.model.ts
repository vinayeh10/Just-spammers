export class User{
    // when declared public it means typescript declares it as
    // property and also assigns a value passed in constructor

    constructor(public email:string,
        public password:string,
        public firstName?:string,
        public lastName?:string){}
}