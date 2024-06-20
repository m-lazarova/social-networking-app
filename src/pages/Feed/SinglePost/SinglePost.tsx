import React, { useEffect, useState } from 'react';
import Image from '../../../components/Image/Image';
import './SinglePost.css';


type Creator = {
  name: string;
};

type PostProps = {
  title: string;
  creator: Creator;
  createdAt: string;
  content: string;
  imageUrl: string;
};

const SinglePost = (props) => {
  const [post, setPost] = useState<PostProps | null>(null);

  useEffect(() => {
    const postId = props.match.params.postId;
    fetch(`URL/${postId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }
        return res.json();
      })
      .then((resData: PostProps) => {
        setPost(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.postId]);

  if (!post) {
    return <p>Loading...</p>; // Add a loading indicator while fetching data
  }

  return (
    <section className="single-post">
      <h1>{post.title}</h1>
      <h2>
        Created by {post.creator.name} on {new Date(post.createdAt).toLocaleDateString('en-US')}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={post.imageUrl} />
      </div>
      <p>{post.content}</p>
    </section>
  );
};

export default SinglePost;
