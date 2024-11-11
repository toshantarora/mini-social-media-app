type Post = {
    id?: number;
    content?: string;
    // Add other post properties here
  };
  
  type Action =
    | { type: "SUBMIT_POST"; posts: any[] }
    | { type: "HANDLE_ERROR" }
    | { type: "ADD_LIKE"; likes: number[] }
    | { type: "ADD_COMMENT"; comments: string[] };
  
  export const postActions = {
    SUBMIT_POST: "SUBMIT_POST" as const,
    HANDLE_ERROR: "HANDLE_ERROR" as const,
    ADD_LIKE: "ADD_LIKE" as const,
    ADD_COMMENT: "ADD_COMMENT" as const,
  };
  
  export const postsStates = {
    error: false,
    posts: [] as any[],
    likes: [] as number[],
    comments: [] as string[],
  };
  
  type State = typeof postsStates;
  
  export const PostsReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case postActions.SUBMIT_POST:
        return {
          ...state,
          error: false,
          posts: action.posts,
        };
      case postActions.ADD_LIKE:
        return {
          ...state,
          error: false,
          likes: action.likes,
        };
      case postActions.ADD_COMMENT:
        return {
          ...state,
          error: false,
          comments: action.comments,
        };
      case postActions.HANDLE_ERROR:
        return {
          ...state,
          error: true,
          posts: [],
        };
      default:
        return state;
    }
  };
  