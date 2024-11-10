import React, { useState } from "react";
import Post from "./components/Posts";

const defaultPosts = [
  {
    id: "1",
    imageUrl: "https://via.placeholder.com/800x600",
    username: "user1",
    likes: 25,
    comments: [
      {
        user: "user2",
        text: "Great post!",
        replies: [{ user: "user3", text: "I agree!" }],
      },
      { user: "user4", text: "Nice picture!" },
    ],
  },
  {
    id: "2",
    imageUrl: "https://via.placeholder.com/800x600",
    username: "user2",
    likes: 15,
    comments: [
      {
        user: "user1",
        text: "Amazing!",
        replies: [{ user: "user4", text: "So cool!" }],
      },
    ],
  },
  {
    id: "3",
    imageUrl: "https://via.placeholder.com/800x600",
    username: "user3",
    likes: 10,
    comments: [
      { user: "user1", text: "Awesome shot!" },
      { user: "user2", text: "Love this!" },
    ],
  },
];

const FeedsPage = () => {
  const [postsData, setPostsData] = useState<any[]>(defaultPosts || []);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleLike = (postId: string) => {};
  const handleSave = (postId: string) => {};
  const handleDelete = (postId: string) => {
    alert(`delete post ${postId}`);
  };
  return (
    <div 
    //className="flex justify-between  mx-auto max-w-7xl flex-col bg-black items-center"
    >
      {postsData.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          imageUrl={post.imageUrl}
          username={post.username}
          likes={post.likes}
          comments={post.comments}
          isLiked={true}
          isSaved={false}
          onLike={handleLike}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FeedsPage;
