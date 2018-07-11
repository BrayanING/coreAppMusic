export class Artist {
  constructor(
    public id: Number,
    public userId: Number,
    public name: string,
    public bio: string,
    public status?: boolean
  ) {}
}
