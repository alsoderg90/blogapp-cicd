import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { Button, Container, Col, Row } from 'react-bootstrap'

const App = () => {
//const [blog, newBlog] = useState({title:'', author:'', url:''})
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)
  const [user, setUser] = useState(null)
  const [blogsVisible, setBlogsVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  },[user])

  useEffect (() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    }
    catch (exception) {
	  console.log(exception)
      setMessage('wrong credentials')
      setMessageClass('error')
      setTimeout(() => {
        setMessageClass(null)
        setMessage(null)
      }, 2500)
      setUserName('')
      setPassword('')
    }
  }

  const addBlog= (blogObject) => {
    blogService.create(blogObject).then(blog => {
      setBlogs(blogs.concat(blog))
      setBlogsVisible(false)
      setMessage(`A new blog: ${blog.title} by ${blog.author} added`)
      setMessageClass('gg')
      setTimeout(() => {
        setMessageClass(null)
        setMessage(null)
      }, 2500)
    })
  }


  const blogForm = () => {
    const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
    const showWhenVisible = { display: blogsVisible ? '' : 'none' }
    const sortedList = blogs.sort((a,b) => (a.likes < b.likes) ? 1 : -1)

    return (
      <Container>
        <Row>
          <h2>Blogs</h2>
        </Row>
        <p>
          <Row>
            <Col>
              {user.name} logged in 
		  </Col>
		  <Col>
		  <Button varitant="danger" onClick = {() => {
                window.localStorage.clear()
                setUser(null)}}> Log out 
              </Button>
		  </Col>
		  </Row>
        </p>
        {sortedList.map(blog => 
          <Blog 
		  	key={blog.id} 
            blog={blog} 
            setBlogs={() => setBlogs} blogs={blogs}
          />
        )}
        <Container style={hideWhenVisible}> 
          <Button onClick={() => setBlogsVisible(true)}> Create </Button>
        </Container>
        <Container style={showWhenVisible}>
          <Row>
            <BlogForm
              addBlog={addBlog}
              setBlogsVisible={setBlogsVisible}
              user={user}
            />
          </Row>
        </Container>
      </Container>
    )
  }

  return (

    <div>
      <Notification message={message} messageClass={messageClass} />
      {user === null ? <LoginForm username={username}
        password={password} setPassword={({ target }) =>
        {setPassword(target.value)}} setUserName={({ target }) =>
        {setUserName(target.value)}} handleLogin={(event) =>
        {handleLogin(event)}} /> :
        blogForm()}
    </div>
  )
}

export default App