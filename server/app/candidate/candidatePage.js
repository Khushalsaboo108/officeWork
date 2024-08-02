const express = require("express");
const candidateSchema = require("./candidateSchema");

// add customer API
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
    candidate_dataText : request.body.candidate_dataText ?? {}
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

// This work for customer amount add or remove
exports.candidateAmountAdd = async (request, response) => {
  const params = request.params;
  const { type, amount } = request.body;

  try {
    const candidate = await candidateSchema.findOne({ _id: params });

    if (!candidate) {
      return response.status(404).send({
        status: 1,
        statusMessage: "Candidate not found",
      });
    }

    let newDataText;
    let amountAdd;

    if (candidate.candidate_dataText.length === 0) {
      newDataText = [{ type, amount }];
      amountAdd = amount
    } else {
      newDataText = [...candidate.candidate_dataText, { type, amount }];
      amountAdd = amount + candidate.candidate_amount
    }

    // Update candidate document with the new candidate_dataText
    await candidateSchema.findOneAndUpdate(
      { _id: params },
      { $set: { candidate_dataText: newDataText } },
      {$set : {candidate_amount : amountAdd}}
    );

    response.status(200).send({
      status: 0,
      statusMessage: "Updated successfully",
      data: { candidate_dataText: newDataText },
    });

  } catch (error) {
    console.log("Error", error);
    response.status(500).send({
      status: 1,
      statusMessage: "Error updating candidate data",
      error: error.message,
    });
  }
};



// This work for customer data give us

exports.getCandidateData = async (request, responce) =>{
  const params = request.params;

  const data_Candidate = candidateSchema.findOne({_id : params});

  try{
    if(data_Candidate){
      responce.status(200).send({
        data_Candidate
      })
    }
  }catch (error) {
    console.log("Error" , error);
    responce.status(400).send(error);
  }
}