import { useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";

function App() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  return (
    <>
      {selectedPostId && (
        <button onClick={() => setSelectedPostId(null)}>
          Back to Posts List
        </button>
      )}
      {!selectedPostId ? (
        <>
          <CreatePost />
          <Posts onSelectPost={(id: number) => setSelectedPostId(id)} />
        </>
      ) : (
        <PostDetails id={selectedPostId} />
      )}
    </>
  );
}

export default App;
