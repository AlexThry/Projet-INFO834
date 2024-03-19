export class Chatroom {
    id!: string;
    user1!: string;
    user2!: string;

    constructor(
        id: string,
        user1: string,
        user2: string
    ) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
    }
}
