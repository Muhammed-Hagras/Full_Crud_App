import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch , useSelector} from 'react-redux';
import { insertPosts } from '../store/postSlice';
import { useNavigate } from "react-router-dom"
import Loading from "../components/Loading"

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const formHandler = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 500);
    dispatch(insertPosts({id,title, description}))
    .unwrap()
    .then((originalPromiseResult) => {
      // handle result here
      navigate("/")
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
      console.log(rejectedValueOrSerializedError)
    })
    
  }


  return (
    <div>
      <Form onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title </Form.Label>
        <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        {/* <Form.Text className="text-muted">
          We'll never share your Title with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" as="textarea"
          rows={3}
          value={description}
          onChange= {(e) => setDescription(e.target.value)}
          />
      </Form.Group>
      <Loading loading={loading} error={error}>
      <Button variant="success" type="submit" disabled={loading}>
        Submit
      </Button>
      </Loading>
     
    </Form>
    </div>
  )
}
