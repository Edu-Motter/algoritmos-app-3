const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Physician = require("../models/Physician");

module.exports = {
    async newAppointment(req, res){
        const {description, appointmentDate, patientId, physicianId} = req.body;
        if (!description || !appointmentDate || !patientId || !physicianId){
            return res.status(403).json({
                error : "Dados obrigatórios não foram preenchidos"
            });   
        }
        //Validar se existe o paciente:
        const patientExists = await Patient.findOne({
            where: [
                {id : patientId},
            ]
        });
        if (!patientExists){
            return res.status(403).json({msg:"Paciente não encontrado, consulta não pode ser criada"});
        } 
        //Valida se existe o medico:
        const physicianExists = await Physician.findOne({
            where: [
                {id : physicianId},
            ]
        });
        if (!physicianExists){
            return res.status(403).json({msg:"Médico não encontrado, consulta não pode ser criada"});
        }

        //Valida se a consulta ja existe:
        const appointmentExists = await Appointment.findOne({
            where: [
                {"patientId": patientId},
                {"physicianId": physicianId},
                {"appointmentDate": appointmentDate}
            ]
        });
        if(appointmentExists)
            return res.status(403).json({msg:"Consulta já existente para nessa data com esse paciente e médico"});
        
        //Se os dois existirem, inserir:
        const appointment = await Appointment.create({
            description, 
            appointmentDate,
            patientId,
            physicianId
        }).catch((error)=>{
            return res.status(500).json({msg:"Erro interno no servidor"});
        });

        if (appointment)
            return res.status(201).json({msg:"Consulta criada com sucesso"});
        else 
            return res.status(404).json({msg:"Erro ao criar nova consulta"});
    },

    async deleteAppointment(req, res){
        const appointmentId = req.query.id;

        const deletedAppointment = await Appointment.destroy({
            where: {id : appointmentId},
        }).catch(async (error)=>{
            return res.status(500).json({msg:"Erro interno no servidor"});
        });

        if(deletedAppointment)
            res.status(200).json({msg:"Consulta excluída com sucesso"});
        else
            res.status(404).json({msg:"Consulta não foi encontrada"});
    },

    async listAllAppointments(req, res){
        const appointments = await Appointment.findAll({
            order: [["description", "ASC"]]
        }).catch((error) => {
            res.status(500).json({msg: "Erro interno no servidor", error: error});
        });

        if (appointments) 
            res.status(200).json({ appointments });
        else 
            res.status(404).json({msg: "Não foi possivel encontrar consultas."});
    },

    async findAppointmentByPatientId(req, res){
        const id = req.query.id;
        if (!id)
            res.status(400).json({
                msg:"Id do Paciente não foi informado"
            });

        const appointments = await Appointment.findAll({
            where : { patientId : id},
            include: {
                model: Patient,
                where: { id : id },
                required: true,
            }
        }).catch((error)=> res.status(500).json([{msg:"Erro 500 no servidor"}, {error: error}]));
        
        if(appointments){
            res.status(200).json({appointments});
        } else res.status(404).json({msg:"nao foi possivel encontar consultas para esse paciente"});
    },

    async findAppointmentByPhysicianId(req, res){
        const id = req.query.id;
        if (!id)
            res.status(400).json({
                msg:"Id do Paciente não foi informado"
            });

        const appointments = await Appointment.findAll({
            where : { physicianId : id},
            include: {
                model: Physician,
                where: { id : id },
                required: true,
            }
        }).catch((error)=> res.status(500).json([{msg:"Erro 500 no servidor"}, {error: error}]));
        
        if(appointments){
            res.status(200).json({appointments});
        } else res.status(404).json({msg:"nao foi possivel encontar consultas para esse medico"});
    }
}