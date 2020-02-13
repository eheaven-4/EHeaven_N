export class Attend{
    userid:string;
    username:string;
    attend:boolean;

}
export class AttendList{
    class:string;
    markedby:string;
    atendList:Array<Attend>;
}
export class Attendreturn{
    username:string;
    attend:boolean;
    class:string;
    date:string;
}
export class Returnuser{
    userid:string;
    name:string;
}