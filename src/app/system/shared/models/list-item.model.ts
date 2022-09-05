
export class ListItem {
    constructor(
        public title: string, //
        public date: Date, //
        public description: string, //
        public priority: string, //
        public amount: number, //
        public countType: string, //
        public isCompleted: boolean,
        public id?: string, //?//
    ) {}
}
