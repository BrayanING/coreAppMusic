export class Album {
    constructor(
        public id?: Number,
        public userId?: Number,
        public name?: string,
        public artistId?: Number,
        public dateReleased?: any,
        public genreId?: Number,
        public status?: boolean
    ) { }
}
