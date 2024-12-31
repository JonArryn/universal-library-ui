export interface IBook {
    id: number;
    title: string;
    authorName: string;
    description: string;
    libraryId: number;
    createdAt: string;
    updatedAt: string;
}

export interface IBookWithLibrary extends IBook {
    library: ILibrary;
}

export interface ILibrary {
    type: string;
    id: number;
    name: string;
    userId: number;
}
