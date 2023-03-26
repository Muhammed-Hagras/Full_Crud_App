import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPost,cleanRecord } from "../store/postSlice";

const EditPost = () => {
  const { loading, error, recordInfo } = usePostDetails();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (recordInfo) {
      setTitle(recordInfo?.title);
      setDescription(recordInfo?.description);
    }
  }, [recordInfo]);

  useEffect(() => {
    return () => {
      dispatch(cleanRecord());
    };
  }, [dispatch]);


  const formHandler = (e) => {
    e.preventDefault();

    dispatch(editPost({ id: recordInfo.id, title, description }))
      .unwrap()
      .then((originalPromiseResult) => {
        // handle result here
        navigate("/");
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.log(rejectedValueOrSerializedError);
      });
  };
  return (
    <div>
      <Form onSubmit={formHandler}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
          We'll never share your Title with anyone else.
        </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Loading loading={loading} error={error}>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Loading>
      </Form>
    </div>
  );
};

export default EditPost;
