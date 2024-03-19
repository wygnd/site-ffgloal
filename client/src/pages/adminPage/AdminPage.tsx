import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import {IPost} from "@/@types/post";

const AdminPage = () => {

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    setPosts([
      {
        post_id: 1,
        author_id: 1,
        title: "string",
        content: "string",
        name: "string",
        menu_order: 0,
        type: "page",
      }
    ])
  }, [])

  return (
    <div>
      <h1>This admin panel</h1>
      <br/>
      {posts.length > 0 &&
				<ul>
          {posts.map((post: IPost) => (
            <li key={post.post_id}>
              {post.title}
            </li>
          ))}
				</ul>
      }
      <Outlet/>
    </div>
  );
};

export default AdminPage;