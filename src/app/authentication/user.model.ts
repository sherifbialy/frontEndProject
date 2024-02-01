export class User{
    constructor(
       public email:string,
    
     private _token:string,
     private _tokenExpire:Date,

    ){}
    
get token(){
    if(!this._tokenExpire||new Date()>this._tokenExpire){
        return null;
    }
  return this._token
}

    
}