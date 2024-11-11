import { PaperClipIcon } from "@heroicons/react/20/solid";
import CustomButton from "../../../components/CustomButton/CustomButton";

type FormState = {
  comment: string;
  image: string;
  selectedFile: File | null;
};

type PostByUserProps = {
  formState: FormState;
  handleSubmit: (e: React.FormEvent) => void;
  handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAttachClick: () => void;
  submitImage: () => void;
};

const PostByUser: React.FC<PostByUserProps> = ({
  formState,
  handleSubmit,
  handleCommentChange,
  handleFileChange,
  handleAttachClick,
  submitImage,
}) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        {/* Image preview section */}
        {formState.image && (
          <div className="mt-4 pb-2">
            <p className="text-sm text-gray-500">Image Preview:</p>
            <img
              src={formState.image}
              alt="Preview"
              className="mt-2 max-w-xs rounded-lg shadow-md"
            />
          </div>
        )}
        {formState?.selectedFile && (
          <CustomButton
            bgColor="bg-indigo-600"
            textColor="text-white"
            label="Upload"
            type="button"
            onClick={() => submitImage()}
          />
        )}
        {/* <div className="mx-4">
          {formState?.image && (
            <img
              className="h-24 rounded-xl"
              src={formState?.image}
              alt="previewImage"
            ></img>
          )}
        </div> */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={3}
              placeholder="Add your comment..."
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
              value={formState.comment}
              onChange={handleCommentChange}
            />

            <div aria-hidden="true" className="py-2">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleAttachClick}
                  className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                >
                  <PaperClipIcon aria-hidden="true" className="h-5 w-5" />
                  <span className="sr-only">Attach a file</span>
                </button>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="shrink-0">
              <CustomButton
                bgColor="bg-indigo-600"
                textColor="text-white"
                label="Post"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostByUser;
