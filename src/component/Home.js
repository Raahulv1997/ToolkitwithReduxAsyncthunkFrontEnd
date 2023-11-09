import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import AddStudent from "../comman/AddStudent";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../redux/featurs/userDetailsSlice";
import { deleteUser } from "../redux/featurs/userDetailsSlice";
const Home = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.app);

  const [show, setShow] = useState(false);
  const [userId, setUserID] = useState("");
  const [modelVal, setModelVal] = useState("add");
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);
  return (
    <div>
      <Container>
        <Row>
          <Col className="bg-dark mt-4 text-white text-center p-5">
            <h1 className=" fs-1">Student Management record</h1>
          </Col>
        </Row>
        <Row>
          <Col className="text-end">
            <Button className="btn btn-primary mt-3 " onClick={handleShow}>
              Add Student
            </Button>
          </Col>
        </Row>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <>
            <h4>No. of Student {users.length}</h4>
            <Row className="mt-3">
              <Col>
                {" "}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Mobile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((data, id) => {
                        return (
                          <>
                            <tr>
                              <td>{id + 1}</td>
                              <td>{data.name}</td>
                              <td>{data.email}</td>
                              <td>{data.age}</td>
                              <td>{data.mobile}</td>
                              <td>
                                <Row>
                                  {" "}
                                  <Col>
                                    {" "}
                                    <Button className="bg-dark">
                                      <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                  </Col>
                                  <Col>
                                    {" "}
                                    <Button
                                      className="bg-success"
                                      onClick={() => {
                                        setUserID(data._id);
                                        setShow(true);
                                        setModelVal("edit");
                                      }}
                                    >
                                      {" "}
                                      <FontAwesomeIcon icon={faPenToSquare} />
                                    </Button>
                                  </Col>
                                  <Col>
                                    {" "}
                                    <Button
                                      className="bg-danger"
                                      onClick={() => {
                                        console.log("idddd" + data._id);
                                        dispatch(deleteUser(data._id));
                                        dispatch(showUser());
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                  </Col>
                                </Row>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Container>
      <AddStudent
        show={show}
        setShow={setShow}
        id={userId}
        modelVal={modelVal}
        setModelVal={setModelVal}
      />
    </div>
  );
};

export default Home;
