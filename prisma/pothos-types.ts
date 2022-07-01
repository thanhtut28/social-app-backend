import type { Prisma, User, Post, Comment, Follows, Like } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "posts" | "comments" | "following" | "followedBy" | "likes";
        RelationName: "posts" | "comments" | "following" | "followedBy" | "likes";
        ListRelations: "posts" | "comments" | "following" | "followedBy" | "likes";
        Relations: {
            posts: {
                Shape: Post[];
                Types: PrismaTypes["Post"];
            };
            comments: {
                Shape: Comment[];
                Types: PrismaTypes["Comment"];
            };
            following: {
                Shape: Follows[];
                Types: PrismaTypes["Follows"];
            };
            followedBy: {
                Shape: Follows[];
                Types: PrismaTypes["Follows"];
            };
            likes: {
                Shape: Like[];
                Types: PrismaTypes["Like"];
            };
        };
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        Where: Prisma.PostWhereUniqueInput;
        Fields: "author" | "comments" | "likes";
        RelationName: "author" | "comments" | "likes";
        ListRelations: "comments" | "likes";
        Relations: {
            author: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            comments: {
                Shape: Comment[];
                Types: PrismaTypes["Comment"];
            };
            likes: {
                Shape: Like[];
                Types: PrismaTypes["Like"];
            };
        };
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        Where: Prisma.CommentWhereUniqueInput;
        Fields: "author" | "post";
        RelationName: "author" | "post";
        ListRelations: never;
        Relations: {
            author: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            post: {
                Shape: Post;
                Types: PrismaTypes["Post"];
            };
        };
    };
    Follows: {
        Name: "Follows";
        Shape: Follows;
        Include: Prisma.FollowsInclude;
        Select: Prisma.FollowsSelect;
        Where: Prisma.FollowsWhereUniqueInput;
        Fields: "follower" | "following";
        RelationName: "follower" | "following";
        ListRelations: never;
        Relations: {
            follower: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            following: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Like: {
        Name: "Like";
        Shape: Like;
        Include: Prisma.LikeInclude;
        Select: Prisma.LikeSelect;
        Where: Prisma.LikeWhereUniqueInput;
        Fields: "author" | "post";
        RelationName: "author" | "post";
        ListRelations: never;
        Relations: {
            author: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            post: {
                Shape: Post;
                Types: PrismaTypes["Post"];
            };
        };
    };
}