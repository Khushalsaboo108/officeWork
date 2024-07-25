const express = require("express");
const candidateSchema = require("./candidateSchema");

exports.addCandidateData = async (request, responce) => {
  console.log(request.body);

  let data = {
    candidate_name: request.body.candidate_name.toLowerCase(),
    candidate_number: request.body.candidate_number,
    candidate_category: request.body.candidate_category,
    candidate_gst: request.body.candidate_gst.toLowerCase(),
    candidate_email: request.body.candidate_email,
    candidate_shopAddress: request.body.candidate_shopAddress,
    candidate_shopName: request.body.candidate_shopName,
    candidate_amount: request.body.candidate_amount,
  };

  const id = request.body.id;
  const candidate_gst = data.candidate_gst; 

  const fondAdmin = await candidateSchema.findOne({ candidate_gst });

  if (id === undefined) {
    if (fondAdmin) {
      responce.send({
        status: 1,
        message: "Candidate already exist",
      });
    } else {
      let dataInsert = await candidateSchema(data);

      dataInsert
        .save()
        .then((insertData) => {
          responce.send({
            status: 0,
            message: "Candidate Add Successfully...",
            data: insertData,
          });
        })
        .catch((error) => {
          responce.send({
            status: 1,
            message: "Candidate not add Successfully...",
            error: `Error: ${error}`,
          });
        });
    }
  } else {
    await AuthLoginSchema.findOneAndUpdate({ _id: admin_id }, { $set: data });
    responce.send({
      status: 2,
      message: "Error",
      error: `Error: Candidate not add `,
    });
  }
};
