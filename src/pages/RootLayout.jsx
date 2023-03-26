import { Outlet } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import "../index.css"


const RootLayout = () => {
  return (
    <div className="bg-warning py-5  myView">
      <Container >
      <Header />
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
    </div>
    
  );
};

export default RootLayout;
