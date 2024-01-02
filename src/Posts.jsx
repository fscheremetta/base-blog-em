import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery("posts", fetchPosts, {
    staleTime: 2000,
  });
  //staleTime is for re-fetching

  //cache is for data that might be re used later
  //   query goes into cold storage if no active useQuery
  //   cache data expires after cacheTime (default: five minutes)
  //      how long its been since the last active useQuery
  //   after the cache expires, the data is garbage collected
  //   cache is backup data to display while fetching

  //isFetching: the async query function hasnt yet resolved
  //isLoading no cached data, plus isFetching

  //by default, query tries 3 times before isError

  if (!data || isLoading) return <h3>Loading...</h3>;

  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
