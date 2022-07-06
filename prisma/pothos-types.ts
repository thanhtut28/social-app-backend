import type { Prisma, User, Post, Comment, Follows, Like, CollectionsOnPosts } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "posts" | "comments" | "following" | "followedBy" | "likes" | "collections";
        RelationName: "posts" | "comments" | "following" | "followedBy" | "likes" | "collections";
        ListRelations: "posts" | "comments" | "following" | "followedBy" | "likes" | "collections";
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
            collections: {
                Shape: CollectionsOnPosts[];
                Types: PrismaTypes["CollectionsOnPosts"];
            };
        };
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        Where: Prisma.PostWhereUniqueInput;
        Fields: "author" | "comments" | "likes" | "collectors";
        RelationName: "author" | "comments" | "likes" | "collectors";
        ListRelations: "comments" | "likes" | "collectors";
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
            collectors: {
                Shape: CollectionsOnPosts[];
                Types: PrismaTypes["CollectionsOnPosts"];
            };
        };
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        Where: Prisma.CommentWhereUniqueInput;
        Fields: "author" | "post" | "parent" | "children";
        RelationName: "author" | "post" | "parent" | "children";
        ListRelations: "children";
        Relations: {
            author: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            post: {
                Shape: Post;
                Types: PrismaTypes["Post"];
            };
            parent: {
                Shape: Comment | null;
                Types: PrismaTypes["Comment"];
            };
            children: {
                Shape: Comment[];
                Types: PrismaTypes["Comment"];
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
    CollectionsOnPosts: {
        Name: "CollectionsOnPosts";
        Shape: CollectionsOnPosts;
        Include: Prisma.CollectionsOnPostsInclude;
        Select: Prisma.CollectionsOnPostsSelect;
        Where: Prisma.CollectionsOnPostsWhereUniqueInput;
        Fields: "user" | "post";
        RelationName: "user" | "post";
        ListRelations: never;
        Relations: {
            user: {
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