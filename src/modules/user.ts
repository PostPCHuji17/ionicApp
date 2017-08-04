declare namespace myHome.object {

  interface UserPrems {
    email: string;
    password: string;
  }

  interface UserProfile {
    email: string;
    displayName: string;
    picture: string;
    thumb_picture: string;
  }

  interface tag {
    color: string;
    description: string;
  }
  interface attached {
    title: string;
    takenAt: Date;
    picture: string;
    pictureSmall: string;
  }

  interface group {
    email : Array<string>;
    tags : Array<tag>;
    transactions : Array<transaction>;
  }

  interface transaction {
    id: number;
    creator: string;
    group_id: string;
    title: string;
    amount: number;
    description: string;
    tags: Array<tag>;
    datetime: Date;
    attached: Array<attached>
  }

  interface comment {
    content : string;
    date : Date;
    publisher : string
  }

}
