import React, { useState, useEffect, Fragment } from 'react';
import Post from '../../components/Feed/Post/Post';
import Button from '../../components/Button/Button';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import Input from '../../components/Form/Input/Input';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import './Feed.css';

type PostData = {
  _id: string;
  title: string;
  creator: {
    name: string;
  };
  createdAt: string;
  content: string;
  imageUrl: string;
};


const Feed = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [editPost, setEditPost] = useState<PostData | null>(null);
  const [status, setStatus] = useState('');
  const [postPage, setPostPage] = useState(1);
  const [postsLoading, setPostsLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('URL')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch user status.');
        }
        return res.json();
      })
      .then(resData => {
        setStatus(resData.status);
      })
      .catch(catchError);

    loadPosts('');
  }, []);

  const loadPosts = (direction: 'next' | 'previous' | '') => {
    if (direction) {
      setPostsLoading(true);
      setPosts([]);
    }
    let page = postPage;
    if (direction === 'next') {
      page++;
      setPostPage(page);
    }
    if (direction === 'previous' && postPage > 1) {
      page--;
      setPostPage(page);
    }
    fetch('http://localhost:8080/feed/posts')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch posts.');
        }
        return res.json();
      })
      .then(resData => {
        setPosts(resData.posts);
        setTotalPosts(resData.totalItems);
        setPostsLoading(false);
      })
      .catch(catchError);
  };

  const statusUpdateHandler = (event: React.FormEvent) => {
    event.preventDefault();
    fetch('URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Can't update status!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(catchError);
  };

  const newPostHandler = () => {
    setIsEditing(true);
  };

  const startEditPostHandler = (postId: string) => {
    const loadedPost = posts.find(p => p._id === postId);
    if (loadedPost) {
      setIsEditing(true);
      setEditPost(loadedPost);
    }
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    setEditPost(null);
  };

  const finishEditHandler = (postData: PostData) => {
    setEditLoading(true);
    let url = 'http://localhost:8080/feed/post';
    let method = 'POST';
    if (editPost) {
      url = 'http://localhost:8080/feed/post';
      method = 'PUT';
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: postData.title,
        content: postData.content,
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
      .then(resData => {
        const post: PostData = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          creator: resData.post.creator,
          createdAt: resData.post.createdAt,
          imageUrl: resData.post.imageUrl
        };
        setPosts(prevPosts => {
          let updatedPosts = [...prevPosts];
          if (editPost) {
            const postIndex = prevPosts.findIndex(p => p._id === editPost._id);
            updatedPosts[postIndex] = post;
          } else if (prevPosts.length < 2) {
            updatedPosts = prevPosts.concat(post);
          }
          return updatedPosts;
        });
        setIsEditing(false);
        setEditPost(null);
        setEditLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsEditing(false);
        setEditPost(null);
        setEditLoading(false);
        setError(err);
      });
  };

  const statusInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const deletePostHandler = (postId: string) => {
    setPostsLoading(true);
    fetch('URL', {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Deleting a post failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        setPosts(prevPosts => prevPosts.filter(p => p._id !== postId));
        setPostsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setPostsLoading(false);
      });
  };

  const errorHandler = () => {
    setError(null);
  };

  const catchError = (error: Error) => {
    setError(error);
  };

  return (
    <Fragment>
      <ErrorHandler error={error} onHandle={errorHandler} />
      <FeedEdit
        editing={isEditing}
        selectedPost={editPost}
        loading={editLoading}
        onCancelEdit={cancelEditHandler}
        onFinishEdit={finishEditHandler}
      />
      <section className="feed__status">
        <form onSubmit={statusUpdateHandler}>
          <Input
            type="text"
            placeholder="Your status"
            control="input"
            onChange={statusInputChangeHandler}
            value={status}
          />
          <Button mode="flat" type="submit">
            Update
          </Button>
        </form>
      </section>
      <section className="feed__control">
        <Button mode="raised" design="accent" onClick={newPostHandler}>
          New Post
        </Button>
      </section>
      <section className="feed">
        {postsLoading && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Loader />
          </div>
        )}
        {posts.length <= 0 && !postsLoading ? (
          <p style={{ textAlign: 'center' }}>No posts found.</p>
        ) : null}
        {!postsLoading && (
          <Paginator
            onPrevious={() => loadPosts('previous')}
            onNext={() => loadPosts('next')}
            lastPage={Math.ceil(totalPosts / 2)}
            currentPage={postPage}
          >
            {posts.map(post => (
              <Post
                key={post._id}
                id={post._id}
                author={post.creator.name}
                date={new Date(post.createdAt).toLocaleDateString('en-US')}
                title={post.title}
                image={post.imageUrl}
                content={post.content}
                onStartEdit={() => startEditPostHandler(post._id)}
                onDelete={() => deletePostHandler(post._id)}
              />
            ))}
          </Paginator>
        )}
      </section>
    </Fragment>
  );
};

export default Feed;
