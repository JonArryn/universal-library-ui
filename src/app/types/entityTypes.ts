export interface IBook {
    id: number;
    title: string;
    authorName: string;
    description: string;
    libraryId: number;
    createdAt: string;
    updatedAt: string;
}

export interface ILibrary {
    id: number;
    name: string;
    userId: number;
}
