import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CreateUser } from "../redux/featurs/userDetailsSlice";
import { UpdateUser } from "../redux/featurs/userDetailsSlice";
import { showUser } from "../redux/featurs/userDetailsSlice";
const AddStudent = ({ show, setShow, id, modelVal, setModelVal }) => {
  const dispatch = useDispatch();
  const intialFormState = {
    name: "",
    email: "",
    age: "",
    mobile: "",
    profileImage: "",
  };

  const [addUser, setAddUser] = useState(intialFormState);

  const { users } = useSelector((state) => state.app);

  const singleUser = users.filter((item) => item._id === id);

  const InputHeandller = (evt) => {
    const value = evt.target.value;
    setAddUser({ ...addUser, [evt.target.name]: value });
  };
  const handleClose = () => {
    setShow(false);
    setAddUser(intialFormState);
    setModelVal("add");
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(CreateUser(addUser));
    console.log("state--" + JSON.stringify(addUser));
    handleClose();
  };

  useEffect(() => {
    if (singleUser.length !== 0 && modelVal === "edit") {
      setAddUser(singleUser[0]);
    } else {
      setAddUser(intialFormState);
    }
    // eslint-disable-next-line
  }, [modelVal]);

  const updateUser = () => {
    dispatch(UpdateUser(addUser));
    dispatch(showUser());
    console.log("state--" + JSON.stringify(addUser));
    handleClose();
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {modelVal === "edit" ? "Update Student" : "Add Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={addUser.name}
                onChange={InputHeandller}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={addUser.email}
                onChange={InputHeandller}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                name="age"
                value={addUser.age}
                onChange={InputHeandller}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Mobile"
                name="mobile"
                value={addUser.mobile}
                onChange={InputHeandller}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter Mobile"
                name="profileImage"
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {modelVal === "edit" ? (
              <Button variant="primary" onClick={updateUser}>
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={SubmitHandler}>
                Add
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddStudent;
