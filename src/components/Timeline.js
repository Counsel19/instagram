import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import usePhotos from "../hooks/use-photos";
import Post from "./post"

const Timeline = () => {
  const photos = usePhotos();

  return (
    <div className="container col-span-3 md:col-span-2">
      {photos?.length === 0 ? (
        <Skeleton count={4} width={600} height={500} className="mb-5" />
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-xl md:text-2xl">Follow People to see Photos!</p>
      )}
    </div>
  );
};

export default Timeline;
