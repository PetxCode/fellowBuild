import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ref } from "yup";
import pix from "./coder.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

const AddCandidate = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [positionCandidate, setPositionCandidate] = useState("President");
  const [image, setImage] = useState("");
  const [imagePix, setImagePix] = useState(pix);

  const Model = yup.object().shape({
    name: yup.string().required(),
    point: yup.string().required()
  });

  const { register, reset, handleSubmit } = useForm({
    resolver: yupResolver(Model)
  });

  const handlePix = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImagePix(save);
    setImage(file);
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data, positionCandidate);
    const url =
      "https://codelab-fellows-election-api.herokuapp.com/api/candidate/create";
    const { name, point, position } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", positionCandidate);
    formData.append("point", point);
    formData.append("avatar", image);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `CodeLab ${currentUser?.token}`
      }
    };

    await axios.post(url, formData, config);

    reset();
    navigate("/");
  });

  return (
    <div>
      <Container>
        <Wrapper>
          <Card onSubmit={onSubmit} type="multipart/form-data">
            <Image src={imagePix} />
            <ImageInput onChange={handlePix} id="pix" type="file" />
            <ImageLabel htmlFor="pix">Upload Image</ImageLabel>

            <Label>Enter Name</Label>
            <Input placeholder="Name" {...register("name")} />

            <Label>Enter Point</Label>
            <Input placeholder="Point" {...register("point")} />
            <Label>Enter Position</Label>
            <Select
              value={positionCandidate}
              onChange={(e) => {
                setPositionCandidate(e.target.value);
              }}
            >
              <option value="President">President</option>
              <option value="VP/Secretary">VP/Secretary</option>
              <option value="Program Coordinator/Publicity">
                Program Coordinator/Publicity
              </option>
              <option value="Fin Sec/Welfare">Fin Sec/Welfare</option>
              <option value="Treasurer/Chief Whip">Treasurer/Chief Whip</option>
            </Select>

            <Button type="submit">Enter Candidate</Button>
          </Card>
        </Wrapper>
      </Container>
    </div>
  );
};

export default AddCandidate;

const Select = styled.select`
  width: 300px;
  height: 50px;
  margin-top: 10px;
  border-radius: 3px;
  padding-left: 10px;
  font-family: Raleway;
  font-size: 18px;
  /* color: lightgray; */
  outline: none;

  border: 1px solid lightgray;

  ::placeholder {
    font-family: Raleway;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  padding: 20px 40px;
  background: #004080;
  color: white;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  margin-bottom: 20px;
  margin: 10px 0;
  outline: none;
  border: 0;

  :hover {
    cursor: pointer;
    transform: scale(0l97);
  }
`;

const Label = styled.label`
  color: #004080;
  margin-top: 10px;
`;
const Input = styled.input`
  margin: 10px 0;
  height: 40px;
  width: 300px;
  border-radius: 3px;
  padding-left: 5px;
  outline: none;
  border: 1px solid lightgray;

  ::placeholder {
    font-family: Raleway;
    font-size: 16px;
  }
`;

const ImageLabel = styled.label`
  border-radius: 20px;
  padding: 10px 20px;
  background: #004080;
  color: white;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  margin-bottom: 20px;

  :hover {
    cursor: pointer;
    transform: scale(0l97);
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  object-fit: cover;
  background: gray;
  margin-bottom: 30px;
`;

const Card = styled.form`
  width: 500px;
  min-height: 300px;
  background: white;
  border-radius: 5px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  height: 100%;
  background: lightgray;
`;
