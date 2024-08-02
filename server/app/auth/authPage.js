const express = require("express");
const AuthLoginSchema = require("./authSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtKey = "khatabook12";

exports.addAuthData = async (request, responce) => {
  console.log(request.body);
  const hashedPassword = await bcrypt.hash(request.body.auth_password, 5);

  // All data

  let data = {
    auth_name: request.body.auth_name,
    auth_userName: request.body.auth_userName.toLowerCase(),
    auth_email: request.body.auth_email.toLowerCase(),
    auth_password: hashedPassword,
    auth_Id: request.body.auth_Id,
  };

  // Check userName, email, id exist or not

  let checkData = await AuthLoginSchema.findOne({
    $or: [
      { auth_userName: data.auth_userName },
      { auth_email: data.auth_email },
      { auth_Id: data.auth_Id },
    ],
  });

  try {
    if (
      !request.body.auth_userName ||
      !request.body.auth_email ||
      !request.body.auth_Id ||
      !request.body.auth_password
    ) {
      responce.status(401).send({
        status: 1,
        message: "Please provide your all data",
        data: {},
      });
      return;
    } else {
      if (checkData) {
        responce.status(400).send({
          status: 1,
          message: "Auth already exist",
          data: {},
        });
      } else {
        const newAuthData = new AuthLoginSchema(data);
        const insertData = await newAuthData.save();
        responce.status(200).send({
          status: 0,
          message: "Auth added successfully...",
          data: {
            userName: insertData.auth_userName,
            name: insertData.auth_name,
            id: insertData.auth_Id,
            email: insertData.auth_email,
          },
        });
      }
    }
  } catch (error) {
    responce.status(500).send({
      status: 1,
      message: "Server Error",
      error: `Error: ${error}`,
    });
    return;
  }
};

exports.checkAuth = async (request, response) => {
  console.log(request.body);
  const { userName, password } = request.body;

  // Requirement are full fill or not fulfilled
  if (!userName || !password) {
    return response.status(401).send({
      status: 1,
      message: "Please provide all required data",
      data: {},
    });
  } else {
    try {
      // get user from database
      const user = await AuthLoginSchema.findOne({
        $or: [
          { auth_userName: userName },
          { auth_email: userName },
          { auth_Id: userName },
        ],
      });
      // check user exist or not
      if (user) {
        // check password is currect or not
        if (user && (await bcrypt.compare(password, user.auth_password))) {
          jwt.sign(
            { userId: user.auth_userName },
            jwtKey,
            { expiresIn: "10s" },
            (err, token) => {
              if (err) {
                return response.status(500).send({
                  status: 1,
                  message: "Something went wrong",
                  data: {},
                });
              }

              return response.status(200).send({
                status: 0,
                message: "Login successful",
                data: {
                  token,
                  userName: user.auth_userName,
                  name: user.auth_name,
                  id: user.auth_Id,
                  email: user.auth_email,
                },
              });
            }
          );
        } else {
          return response.status(401).send({
            status: 1,
            message: "Invalid  password",
            data: {},
          });
        }
      } else {
        return response.status(401).send({
          status: 1,
          message: "Invalid username",
          data: {},
        });
      }
    } catch (error) {
      return response.status(500).send({
        status: 1,
        message: "Internal server error",
        data: {},
      });
    }
  }
};
