import { CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

interface LoaderProps {
  color: string;
  loading: boolean;
}
const Loader = ({ color, loading }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
