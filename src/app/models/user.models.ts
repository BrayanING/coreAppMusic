export class User {
  constructor(
    public id: Number,
    public name: string,
    public email: string,
    public password: string,
    public img?: string,
    public status?: boolean
  ) {  }
}
