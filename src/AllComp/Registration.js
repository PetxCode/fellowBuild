import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ref } from "yup";
import pix from "./coder.png";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [imagePix, setImagePix] = useState(pix);

  const Model = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([ref("password"), null])
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
    console.log(data);
    const url = "";
    const { name, email, password } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", image);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

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

            <Label>Enter your Name</Label>
            <Input placeholder="Name" {...register("name")} />

            <Label>Enter your Email</Label>
            <Input placeholder="Email" {...register("email")} />

            <Label>Enter your Password</Label>
            <Input placeholder="Password" {...register("password")} />

            <Label>Enter your Confirm</Label>
            <Input placeholder="Confirm" {...register("confirm")} />

            <Button type="submit">Register</Button>
          </Card>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Registration;

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
