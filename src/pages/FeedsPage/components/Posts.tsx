import React, { useState } from "react";
import { FaHeart, FaComment, FaBookmark, FaTrashAlt } from "react-icons/fa";

interface Comment {
  user: string;
  text: string;
  replies: Comment[];
}

interface PostProps {
  postId: string;
  imageUrl: string;
  username: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isSaved: boolean;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onDelete: (postId: string) => void;
}

const Post: React.FC<PostProps> = ({
  postId,
  imageUrl,
  username,
  likes,
  comments,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onDelete,
}) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle adding comment logic
  };

  return (
    <div className="bg-white mx-auto max-w-2xl p-4 rounded-lg shadow-md mb-4">
      <img src={imageUrl} alt="Post" className="w-full h-80 object-cover rounded-lg" />
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold">{username}</span>
        <div className="flex space-x-2">
          <button onClick={() => onLike(postId)}>
            <FaHeart color={isLiked ? "red" : "gray"} />
          </button>
          <span>{likes}</span>
          <button onClick={() => setShowComments(!showComments)}>
            <FaComment />
          </button>
          <button onClick={() => onSave(postId)}>
            <FaBookmark color={isSaved ? "blue" : "gray"} />
          </button>
          <button onClick={() => onDelete(postId)}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
      
      {showComments && (
        <div className="mt-2">
          <div className="space-y-2">
            {comments.map((comment, index) => (
              <div key={index}>
                <div className="flex items-center">
                  <span className="font-semibold">{comment.user}</span>: {comment.text}
                </div>
                {comment.replies && (
                  <div className="ml-4">
                    {comment.replies.map((reply, replyIndex) => (
                      <div key={replyIndex}>
                        <span className="font-semibold">{reply.user}</span>: {reply.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleAddComment} className="mt-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border p-2 rounded-lg"
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
