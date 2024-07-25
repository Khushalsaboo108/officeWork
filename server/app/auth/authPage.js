const express = require("express");
const AuthLoginSchema = require("./authSchema");

exports.addAuthData = async (request, response) => {
  console.log(request.body);

  let data = {
    auth_name: request.body.auth_name,
    auth_email: request.body.auth_email,
    auth_userName: request.body.auth_userName,
    auth_password: request.body.auth_password,
    auth_Id: request.body.auth_Id,
  };

  const id = request.body.id;

  let userData;

  try {
    if (id === undefined) {
      let dataInsert = new AuthLoginSchema(data);

      const insertData = await dataInsert.save();
      userData = {
        status: 0,
        message: "Auth Add Successfully...",
        data: insertData,
      };
    } else {
      const updatedData = await AuthLoginSchema.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      );
      userData = {
        status: 2,
        message: "Auth Added Already...",
        data: updatedData,
      };
    }
  } catch (error) {
    userData = {
      status: 2,
      message: "Auth operation not successful...",
      error: `Error: ${error}`,
    };
  }

  response.send(userData);
};

exports.chackAuth = async (request, response) => {
  const { auth_userName, auth_email, auth_Id, auth_password } = request.body;

  console.log(request.body);

  let userData;

  try {
    const fondAdmin = await AuthLoginSchema.findOne({
      $or: [
        { auth_userName: auth_userName },
        { auth_email: auth_email },
        { auth_Id: auth_Id },
      ],
    });

    if (!auth_userName && !auth_email && !auth_Id) {
      userData = {
        status: 1,
        message: "Please enter User detail",
      };
    } else if (!fondAdmin) {
      userData = {
        status: 2,
        message: "User not found",
        data: {},
      };
    } else {
      if (auth_password && fondAdmin.auth_password === auth_password) {
        userData = {
          status: 0,
          message: "Login Successfully",
          data: fondAdmin,
        };
      } else {
        userData = {
          status: 1,
          message: "Login Unsuccessfully",
          data: {},
        };
      }
    }
  } catch (error) {
    userData = {
      status: 2,
      message: "Error",
      error: `Error: ${error}`,
    };
  }
  response.send(userData);
};

exports.getUpdate = (request, response) => {
  let userData = "Welcome To My World";
  response.send(userData);
};
