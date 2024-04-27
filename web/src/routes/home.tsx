import SideBar from "../components/sideBarTopCate";
import Card from "../components/card";
import CardLoadig from "../components/cardloading";
import { useEffect, useState } from "react";
import postService from "../services/postService";
import IPostModel from "../interfaces/IPostModel";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [posts, setPosts] = useState<IPostModel[]>([]);

  const loadPost = async () => {
    setTimeout(async () => {
      const nextPage = currentPage + 1;
      const result = await postService.getPostByPage(nextPage);
      setCurrentPage(nextPage);

      const newPostList = Array.from(new Set([...posts, ...result.data]));
      setPosts(newPostList);
    }, 1000);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await loadPost();
      } catch (e) {
        console.log(e);
      }
    };
    init();
  }, []);

  const render = () => {
    return posts.map((post) => <Card {...post} />);
  };

  const Loading = () => {
    const result = [];
    for (let index = 0; index < 3; index++) {
      result.push(<CardLoadig />);
    }
    return (
      <div className="flex max-md:flex-col flex-row max-md:flex-wrap gap-2 mt-5 ">
        {result}
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-screen-2xl min-w-72 py-5 max-md:pt-0 flex flex-auto gap-7 flex-row max-md:flex-col relative">
        <SideBar />
        <div className="flex-1">
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={loadPost}
            hasMore={true}
            loader={<Loading />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={loadPost}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8593; Release to refresh
              </h3>
            }
          >
            <div className="flex max-md:flex-col flex-row flex-wrap gap-2">
              {render()}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
