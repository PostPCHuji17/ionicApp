declare namespace myHome.object {

  interface UserPrems {
    email: string;
    password: string;
  }

  interface UserProfile {
    id : string;
    email: string;
    displayName?: string;
    picture?: string;
    thumb_picture?: string;
    selectedGroup?: string;
  }

  interface Tag {
    id : string;
    color: string;
    description: string;
  }
  interface Attached {
    title: string;
    takenAt: Date;
    picture: string;
    pictureSmall: string;
  }

  interface Group {
    id : string;
    picture : string;
    title : string;
    email? : Array<string>;
    tags? : Array<Tag>;
    transactions? : Array<Transaction>;
  }

  interface Transaction {
    id: string;
    creator: string;
    group_id: string;
    title: string;
    amount: number;
    description: string;
    tags: Array<Tag>;
    datetime: Date;
    attached: Array<Attached>
  }

  interface Comment {
    content : string;
    date : Date;
    publisher : string
  }

}
