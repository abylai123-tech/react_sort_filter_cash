import React from 'react';
import MyButton from "./UI/button/MyButton";

const PostItem = ({post, number, remove}) => {
  return (
    <li className={'post-item'}>
      <div style={{display: 'flex'}}>
        <div className={'post-item-id'}>
          <p>{number}</p>
        </div>
        <div className={'post-item-content'}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      </div>
      <div>
        <MyButton onClick={()=> remove(post)}>Удалить</MyButton>
      </div>
    </li>
  );
};

export default PostItem;
