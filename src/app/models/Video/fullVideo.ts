export interface FullVideo {
    videoId: number,
    authorId: number,
    authorName: string,
    title: string,
    videoPath: [string, null],
    thumbnailPath: [string, null],
    created: [Date, null]
}