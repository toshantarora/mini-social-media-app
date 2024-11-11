import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { db } from "../../../firebaseConfig";
import {
  postActions,
  PostsReducer,
  postsStates,
} from "../../../context/PostReducer";
import Swal from "sweetalert2";
interface CommentSectionProps {
  postId: string;
  comments: any[];
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
}) => {
  const [newComment, setNewComment] = useState<string>("");
  const commentRef = doc(collection(db, "posts", postId, "comments"));
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { user, userData } = useAppContext();
  const { ADD_COMMENT, HANDLE_ERROR } = postActions;

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment !== "") {
      try {
        await setDoc(commentRef, {
          id: commentRef.id,
          comment: newComment,
          image: user?.photoURL,
          name: user?.displayName,
          timestamp: serverTimestamp(),
        });
        setNewComment("");
      } catch (error: any) {
        dispatch({ type: HANDLE_ERROR });
        Swal.fire({
          title: "Error!",
          text: error.message || "Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const collectionOfComments = collection(db, `posts/${postId}/comments`);
        const q = query(collectionOfComments, orderBy("timestamp", "desc"));
        await onSnapshot(q, (snapshot) => {
          const commentsData: any[] = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as any)
          );
          dispatch({
            type: ADD_COMMENT,
            comments: commentsData,
          });
        });
      } catch (error: any) {
        dispatch({ type: HANDLE_ERROR });
        Swal.fire({
          title: "Error!",
          text: error.message || "Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    getComments();
  }, [postId, ADD_COMMENT, HANDLE_ERROR]);

  const finalComments = state?.comments?.length > 0 ? state?.comments: comments 
  return (
    <div className="mt-2">
      <div className="space-y-2">
        {finalComments.map((comment, index) => (
          <div key={index}>
            <div className="flex items-center">
              <span className="font-semibold">{comment.user}</span>:{" "}
              {comment.text}
            </div>
            {comment.replies && (
              <div className="ml-4">
                {comment.replies.map((reply: any, replyIndex: any) => (
                  <div key={replyIndex}>
                    <span className="font-semibold">{reply.user}</span>:{" "}
                    {reply.text}
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
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
