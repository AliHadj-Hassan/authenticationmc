export  abstract class Roles{
    static SUPERADMIN="superadmin";
    static ADMIN="admin";
    static INSTRUCTOR="instructor";
    static STUDENT="student";
    static CONSULTOR="consultor";
    static ENTREPRISE="entreprise";
    static getRoles(){
        return [this.SUPERADMIN,this.ADMIN,this.INSTRUCTOR,this.STUDENT,this.CONSULTOR,this.ENTREPRISE]
    }
}