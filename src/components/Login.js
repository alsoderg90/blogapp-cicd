import React from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Container, Row, Col} from 'react-bootstrap'

const LoginForm = ({
  setUserName,
  setPassword,
  username,
  password,
  handleLogin
}) => {
  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Row>
          <h2>Log in to application</h2>
        </Row>
        <Row>
		  <Col>
            <Form.Label> Username: </Form.Label>
          </Col>
          <Col>
            <Form.Control
              id='username'
              type ="username"
              value={username}
              name='Username'
              onChange = {setUserName}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label> Password</Form.Label>
          </Col>
          <Col>
            <Form.Control
              id='password'
              type = "password"
              value = {password}
              name = "password"
              onChange = {setPassword}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button id='login-button' style={{width: '25%'}} type="submit">Login</Button>
		  </Col>
        </Row>
      </Form>
    </Container>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm