export class User {
  id!: string;
  username!: string;
  email!: string;
  password!: string;
  connected!: boolean;

  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.connected = false;
  }

}
