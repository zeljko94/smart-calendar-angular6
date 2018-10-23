export class Notification {




    constructor(ForUserID, Title, Body, CreatedUserID, CreatedAt, DateSeen, DateOpened, Icon, ID=0)
    {
        this.ID = ID;
        this.ForUserID = ForUserID;
        this.Title = Title;
        this.Body = Body;
        this.CreatedUserID = CreatedUserID;
        this.CreatedAt = CreatedAt;
        this.DateSeen = DateSeen;
        this.DateOpened = DateOpened;
        this.Icon = Icon;
    }

    ID: number;
    Title: string;
    Body: string;
    CreatedUserID: number;
    CreatedAt: Date;
    DateSeen: Date;
    DateOpened: Date;
    ForUserID: number;
    Icon: string;
}
