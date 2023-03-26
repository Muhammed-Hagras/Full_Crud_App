import Table from "react-bootstrap/Table";
import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details";

const Details = () => {
  const { id ,loading, error, record } = usePostDetails();
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
          <td>{record?.title}</td>
          <td>{record?.description}</td>
        </tr>
        </tbody>
      </Table>
      </Loading>
    </>
  );
};

export default Details;
