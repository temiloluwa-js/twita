import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/Posts.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const dpurl = localStorage.getItem("dpurl")


  useEffect(() => {
    console.log(posts);
    axios
      .get("http://localhost:3010/posts")
      .then((response) => setPosts(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.posts}>
      {posts &&
        posts.map((post) => (
          <article className={styles.post} key={post.id}>
            <div className={styles.post_header}>
              <div className={styles.dp}>
               <img src={posts.creatorDp}/>
              </div>
              <div className="person_details">
                <h1>
                  {post.creatorFirstName} {post.creatorLastName}
                </h1>
                <p>@{post.creator}</p>
              </div>
            </div>
            <div className={styles.post_body}>
              <h1>{post.postContent}</h1>
              <p>{post.datePosted}</p>
            </div>
            <div className={styles.post_actions}>
              <p>Like</p>
              <p>Comment</p>
              <p>Share</p>
            </div>
          </article>
        ))}
    </div>
  );
};

export default PostList;
