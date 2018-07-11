export class Genre {
    constructor(
        public id: Number,
        public userId: Number,
        public name: string,
        public description: string,
        public status?: boolean
    ) { }
}
