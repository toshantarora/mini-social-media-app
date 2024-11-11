import React, { useEffect, useReducer, useState } from "react";
import { FaHeart, FaComment, FaBookmark, FaTrashAlt } from "react-icons/fa";
import {
  postActions,
  PostsReducer,
  postsStates,
} from "../../../context/PostReducer";
import { useAppContext } from "../../../context/AppContext";
import { db } from "../../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
  QuerySnapshot,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import CommentSection from "./CommentSection";

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
  uid: string;
  email: string;
  comments: Comment[];
  isLiked: boolean;
  isSaved: boolean;
  text: string;
  timestamp: string;
}

const PostCard: React.FC<PostProps> = ({
  postId,
  uid,
  imageUrl,
  email,
  username,
  likes,
  comments,
  isLiked,
  isSaved,
  timestamp,
  text,
}) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { user, userData } = useAppContext();

  const likesRef = doc(collection(db, "posts", postId, "likes"));
  const likesCollection = collection(db, "posts", postId, "likes");
  const { ADD_LIKE, ADD_COMMENT, HANDLE_ERROR } = postActions;
  const singlePostDocument = doc(db, "posts", postId);

  const handleAddLikes = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query(likesCollection, where("id", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const likesDocId = await querySnapshot?.docs[0]?.id;
    try {
      if (likesDocId !== undefined) {
        const deleteId = doc(db, "posts", postId, "likes", likesDocId);
        await deleteDoc(deleteId);
      } else {
        await setDoc(likesRef, {
          id: user?.uid,
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeletePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user?.uid === uid) {
        await deleteDoc(singlePostDocument);
      } else {
        alert("You cant delete other users posts !!!");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log(error.message);
    }
  };
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const getLikes = async () => {
      try {
        const q = collection(db, "posts", postId, "likes");
        unsubscribe = onSnapshot(q, (snapshot) => {
          const likesArray = snapshot.docs.map(
            (doc) => doc.data().id as number
          );
          dispatch({
            type: ADD_LIKE,
            likes: likesArray,
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
    getLikes();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [postId, ADD_LIKE, HANDLE_ERROR, dispatch]);

  return (
    <>
      <div className="bg-white mx-auto max-w-2xl p-4 rounded-lg shadow-md mb-4">
        <img
          src={imageUrl}
          alt="Post"
          className="w-full h-80 object-cover rounded-lg"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">{username}</span>
          <div className="flex space-x-2">
            <button onClick={handleAddLikes}>
              <FaHeart
                color={
                  state?.likes?.length > 0 && state?.likes?.length
                    ? "red"
                    : "gray"
                }
              />
            </button>
            <span>{state?.likes?.length > 0 && state?.likes?.length}</span>
            <button onClick={() => setShowComments(!showComments)}>
              <FaComment />
            </button>

            <button onClick={handleDeletePost}>
              <FaTrashAlt />
            </button>
          </div>
        </div>

        {showComments && <CommentSection postId={postId} comments={comments} />}
      </div>
    </>
  );
};

export default PostCard;
