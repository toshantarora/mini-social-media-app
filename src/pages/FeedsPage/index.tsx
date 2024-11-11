import React, { useEffect, useReducer, useRef, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
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
} from "firebase/firestore";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../../context/PostReducer";

import PostByUser from "./components/PostByUser";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import PostCard from "./components/PostCard";
import AlertNotification from "../../components/AlertNotification/AlertNotification";

type Post = {
  id: string;
  uid: string;
  imageUrl: string;
  username: string;
  likes: number;
  comments: {
    user: string;
    text: string;
    replies?: { user: string; text: string }[];
  }[];
};
const defaultPosts = [
  {
    id: "1",
    uid: "csdcsdcsdcsdsrfref",
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
    uid: "csdcsdcsdcsdsrfrefsdcds",
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
    uid: "csdcsdcsdcsdcssesdcsdsrfref",
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
  const [lastVisiblePost, setLastVisiblePost] = useState<DocumentData | null>(
    null
  );

  const { user, userData } = useAppContext();
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const documentId = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [formState, setFormState] = useState<{
    comment: string;
    image: string;
    selectedFile: File | null;
  }>({
    comment: "",
    image: "",
    selectedFile: null,
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progressBar, setProgressBar] = useState(0);
 
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      comment: e.target.value,
    });
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFormState({
        ...formState,
        selectedFile: file,
        image: fileURL,
      });
    }
  };

  const handleAttachClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState?.comment && formState.selectedFile) {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: formState?.comment,
          image: formState?.image,
          timestamp: serverTimestamp(),
        });
        setFormState({
          ...formState,
          comment: "",
          image: "",
          selectedFile: null,
        });
      } catch (err: any) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };
  console.log("formState", formState);
  const storage = getStorage();
  const metadata: any = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const handleSubmitImage = async () => {
    const fileType =
      formState?.selectedFile &&
      metadata.contentType.includes(formState?.selectedFile["type"]);
    console.log("fileType=====", fileType, formState?.selectedFile);
    if (!formState?.selectedFile) return;
    if (fileType) {
      try {
        const storageRef = ref(
          storage,
          `images/${formState?.selectedFile.name}`
        );
        const uploadTask = uploadBytesResumable(
          storageRef,
          formState?.selectedFile,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setFormState({ ...formState, image: downloadURL });
              }
            );
          }
        );
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
    const postData = () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const posts = snapshot.docs.map((item) => ({
            id: item.id,
            content: item.data().content || "",
            ...item.data(),
          }));

          dispatch({
            type: SUBMIT_POST,
            posts,
          });

          // Smooth scroll to the latest post
          if (scrollRef.current) {
            (scrollRef.current as HTMLElement).scrollIntoView({
              behavior: "smooth",
            });
          }

          setFormState({
            ...formState,
            image: "",
            selectedFile: null,
          });
          setProgressBar(0);
        }
      );

      return unsubscribe;
    };

    return postData();
  }, [SUBMIT_POST]);


  const data = state?.posts?.length > 0 ? state?.posts : postsData;
  return (
    <div
    //className="flex justify-between  mx-auto max-w-7xl flex-col bg-black items-center"
    >
      <div className="pb-4">
        <div className="overflow-hidden mx-auto max-w-2xl  rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            {/* Content goes here */}
            <PostByUser
              handleSubmit={handleSubmitPost}
              formState={formState}
              handleCommentChange={handleCommentChange}
              handleFileChange={handleFileChange}
              handleAttachClick={handleAttachClick}
              submitImage={handleSubmitImage}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col py-4 w-full">
        {state?.error ? (
          <div className="flex justify-center items-center">
            <AlertNotification errorMessage=" Something went wrong refresh and try again..." />
          </div>
        ) : (
          <div>
            {data?.length > 0 &&
              data?.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    postId={post?.documentId ? post?.documentId : post?.id}
                    uid={post?.uid}
                    username={post?.name}
                    email={post?.email}
                    imageUrl={post?.image}
                    text={post?.text}
                    likes={post.likes}
                    comments={post.comments}
                    isLiked={true}
                    isSaved={false}
                    timestamp={new Date(
                      post?.timestamp?.toDate()
                    )?.toUTCString()}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedsPage;