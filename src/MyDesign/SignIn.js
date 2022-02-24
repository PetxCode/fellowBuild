import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ref } from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [imagePix, setImagePix] = useState("");

  const Model = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
  });

  const { register, reset, handleSubmit } = useForm({
    resolver: yupResolver(Model)
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const url =
      "https://codelab-fellows-election-api.herokuapp.com/api/voter/signin";
    const { email, password } = data;

    const res = await axios.post(url, { email, password });

    localStorage.setItem("voter", JSON.stringify(res.data.data));
    reset();
    navigate("/");
  });

  return (
    <div>
      <Container>
        <Wrapper>
          <Card onSubmit={onSubmit}>
            <Label>Enter your Email</Label>
            <Input placeholder="Email" {...register("email")} />

            <Label>Enter your Password</Label>
            <Input placeholder="Password" {...register("password")} />

            <Button type="submit">Sign In</Button>
          </Card>
        </Wrapper>
      </Container>
    </div>
  );
};

export default SignIn;

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
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  background: lightgray;
`;
