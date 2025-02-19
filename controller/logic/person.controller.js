/**Dto */

const personDto = require("../../model/dto/person.dto");
const userDto = require("../../model/dto/user.dto");

/**Helper */
 
const helper = require("../helpers/general.helper")
const notHelper = require("../helpers/notification.helper")
exports.createPerson = (req,res,next) => {
    let prs = {
        name: req.body.name,
        lastName: req.body.lastName,
        identification: req.body.identification,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        city: req.body.city

    }
    personDto.create(prs,(err,data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        let user = {
            name: prs.name,
            lastName: prs.lastName,
            username: prs.identification,
            password: helper.EncryptPassword(req.body.password)

        };
        userDto.create(user,(err,u)=>{
            if(err){
                personDto.delete({_id: data._id}, (err,data)=>{
                    console.log("Deleting due to not user creation")
                })
                return res.status(400).json(
                    {
                    error: err
                    }
                );
            }
            notHelper.sendSMS(prs.phone)

            res.status(201).json(
                {
                    info:data
                }
            );
        });
    });
};

exports.updatePerson = (req,res,next) => {
    let prs = {
        name: req.body.name,
        lastName: req.body.lastName,
        identification: req.body.identification,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        city: req.body.city

    }
    personDto.update({_id:req.body.id},prs,(err,data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }   
        res.status(201).json(
                {
                    info:data
                }
            );
    });
};

exports.getAll = (req,res,next) => {
    personDto.getAll({},(err,data) => {
        if(err){
            return res.status(400).json(
                {

                    error: err
                }
            );
        }   
        res.status(200).json(
                {
                    info:data
                }
            );
    });
};

exports.getByCode = (req,res,next) => {
    personDto.getByCode({code:req.params.code},(err,data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }   
        res.status(200).json(
                {
                    info:data
                }
            );
    });
};

exports.deletePerson=()=>{
    personDto.delete({_id:req.body.id},(err,data) => {
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }   
        res.status(204).json();
    });
};






