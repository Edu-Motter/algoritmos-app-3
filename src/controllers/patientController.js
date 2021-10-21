const Patient = require("../models/Patient");
const Physician = require("../models/Physician");
const Sequelize = require("sequelize");

module.exports = {
    async listAllPatients(req, res){
        const patients = await Patient.findAll({
            order: [["name", "ASC"]]
        }).catch((error) => {
            res.status(500).json({msg: "Falha na conexão.", error: error});
        });

        if (patients) 
            res.status(200).json({ patients });
        else 
            res.status(404).json({msg: "Não foi possivel encontrar pacientes."});
    },

    async newPatient(req, res){
        const {name, email, phone} = req.body;
        if (!name || !email || !phone){
            res.status(400).json({
                msg:"Dados obrigatorio nao foram preenchidos"
            });
        }

        const isPatientNew = await Patient.findOne({
            where: {email},
        });

        if(isPatientNew)
            res.status(403).json({msg:"Paciente ja cadastrado"});
        else {
            const patient = await Patient.create({
                name, 
                email, 
                phone,
            }).catch((error)=>{
                res.status(500).json({msg:"Nao foi possivel inserir dados"});
            });
            if (patient)
                res.status(201).json({msg:"Novo paciente adicionado"});
            else 
                res.status(404).json({msg:"nao foi possivel cadastrar novo paciente"});
        }
    },

    async searchPatientByName(req, res){
        const name = req.body.name;
        if (!name)
            res.status(400).json({
                msg:"parametro obrigatorio vazio",
            });
        const Op = Sequelize.Op;
        const patients = await Patient.findAll({
            where: {name:{ [Op.like]: "%" + name + "%" } },
        });
        console.log(patients);
        if (patients) {
            if (patients == "")
                res.status(404).json({msg:"Nao ha pacientes com esse nome"});
            else res.status(200).json({patients});
        } else res.status(404).json({msg:"nao foi possivel encontrar o paciente"});
    },

    async searchPatientByPhysician (req, res){
        const physicianId = req.params.physicianId;
        if (!physicianId)
            res.status(400).json({
                msg:"campo medico vazio"
            });

        const patients = await Patient.findAll({
            where: { physicianId },
        }).catch((error)=> res.status(500).json({msg:"falha na conexao"}));
        if(patients){
            if(patients == "")
                res.status(404).json({msg:"nao ha pacientes para esse medico"});
            else res.status(200).json({patients});
        } else res.status(404).json({msg:"nao foi possivel encontar pacientes"});
        
    }
    ,
    async updatePatient(req, res){
        const patientId = req.body.id;
        const patient = req.body;
        if (!patientId) res.status(400).json({msg:"ID do paciente vazio"});
        else {
            const patientExists = await Patient.findByPk(patientId);
            if (!patientExists)
                res.status(404).json({msg:"paciente nao encontrado"});
            else {
                if (patient.name || patient.email){
                    await Patient.update(patient,{
                        where : {id:patientId}
                    });
                    return res.status(200).json({msg:"paciente atualizdo com sucesso"});
                } else return res.status(400).json({msg:"campos obrigatorios nao preenchidos"});
            }
        }

    }
    
}