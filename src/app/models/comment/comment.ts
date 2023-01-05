export interface Comment {
    id: number,
    userId: number,
    userName: string,
    videoId: number,
    content: string,
    created: Date,
    likedByUsers: number,
    dislikedByUsers: number,
    userLiked: [boolean, null]
}