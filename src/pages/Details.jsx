import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details";

const Details = () => {
  const { id ,loading, error, recordInfo } = usePostDetails();
  const dispatch = useDispatch() ;
  useEffect(() => {
    return () => {
      dispatch({ type: "posts/cleanRecord" });
    };
  }, [dispatch]);

  return (
    <>
      <Loading loading={loading} error={error}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{id}</td>
          <td>{recordInfo?.title}</td>
          <td>{recordInfo?.description}</td>
        </tr>
        </tbody>
      </Table>
      </Loading>
    </>
  );
};

export default Details;
