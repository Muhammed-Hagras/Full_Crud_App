import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { insertPosts } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import withGuard from "../util/withGuard";
import { useFormik } from "formik";
import { postSchema } from "../util/validationSchema"

const AddPost = (props) => {

  const { loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const formHandler = (e) => {
  //   e.preventDefault();
  //   const id = Math.floor(Math.random() * 500);
  //   dispatch(insertPosts({id,title, description}))
  //   .unwrap()
  //   .then((originalPromiseResult) => {
  //     // handle result here
  //     navigate("/")
  //   })
  //   .catch((rejectedValueOrSerializedError) => {
  //     // handle error here
  //     console.log(rejectedValueOrSerializedError)
  //   })

  // }

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 500);
      dispatch(insertPosts({ id, title: values.title, description: values.description }))
        .unwrap()
        .then((originalPromiseResult) => {
          // handle result here
          navigate("/");
        })
        .catch((rejectedValueOrSerializedError) => {
          // handle error here
          console.log(rejectedValueOrSerializedError);
        });
    },
  });

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title </Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.title}
          />
          <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            as="textarea"
            name="description"
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.description}
          />
          <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
        </Form.Group>
        <Loading loading={loading} error={error}>
          <Button variant="success" type="submit" disabled={loading}>
            Submit
          </Button>
        </Loading>
      </Form>
    </div>
  );
};

export default withGuard(AddPost);
