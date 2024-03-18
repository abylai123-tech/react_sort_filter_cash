import "./App.css";
import {useMemo, useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'Post-1', body: 'Description-3'},
    {id: 2, title: 'Post-2', body: 'Description-2'},
    {id: 3, title: 'Post-3', body: 'Description-1'},
    {id: 4, title: 'Post-4', body: 'Description-4'},
  ])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)


  const sortedPosts = useMemo(()=>{
    if (filter.sort){
      return [...posts].sort((a,b)=> a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => 
      post.title.toLowerCase().includes(filter.query.toLowerCase()) ||
      post.body.toLowerCase().includes(filter.query.toLowerCase()) ||
      post.id.toLocaleString().includes(filter.query.toLowerCase())
    );
  }, [filter.query, sortedPosts]);

  function createPost(new_post) {
    const {title, body} = new_post; 
    const newPost = {id: posts.length + 1, title, body}; 
    setPosts([...posts, newPost]); 
    setModal(false); 
  }

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id));
  }

    return (
      <div className={'posts-container'}>
        <MyButton onClick={()=> setModal(true)}>Создать пост</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>
        <hr/>
        <PostFilter filter={filter} setFilter={setFilter}/>
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Мои посты'/>
      </div>
    );
}
export default App;