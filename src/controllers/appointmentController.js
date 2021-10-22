const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Physician = require("../models/Physician");

module.exports = {
    async newAppointment(req, res){
        const {description, appointmentDate, patientId, physicianId} = req.body;
        if (!description || !appointmentDate || !patientId || !physicianId){
            res.status(400).json({
                error : "Dados obrigatórios não foram preenchidos"
            });
        }

        const appointmentExists = await Appointment.findOne({
            where: [
                {"patientId": patientId},
                {"physicianId": physicianId},
                {"appointmentDate": appointmentDate}
            ]
        });

        if(appointmentExists)
            res.status(403).json({msg:"Consulta já existente"});
        else {
            //Validar se existe o paciente e o medico informado:

            //Se os dois existirem, inserir:
            const appointment = await Appointment.create({
                description, 
                appointmentDate,
                patientId,
                physicianId
            }).catch((error)=>{
                res.status(500).json({msg:"Nao foi possivel inserir dados"});
            });
            if (appointment)
                res.status(201).json({msg:"Consulta criada com sucesso"});
            else 
                res.status(404).json({msg:"Nao foi possivel criar nova consulta"});
        }
    },

    async deleteAppointment(req, res){
        const appointmentId = req.query.id;
        const deletedAppointment = await Appointment.destroy({
            where: {id : appointmentId},
        }).catch(async (error)=>{
            const appointmentHasRef = await Appointment.findOne({
                where:{id: appointmentId},
            }).catch((error)=>{
                res.status(500).json({msg:"Erro interno no servidor"});
            });
            if(appointmentHasRef)
                return res.status(403).json({msg:"A Consulta ainda possui medico e/ou paciente relacionados"});
        });
        if(deletedAppointment !== 0)
            res.status(200).json({msg:"Consulta excluída com sucesso"});
        else res.status(404).json({msg:"Consulta não encontrada"});
    },

    async listAllAppointments(req, res){
        const appointments = await Appointment.findAll({
            order: [["description", "ASC"]]
        }).catch((error) => {
            res.status(500).json({msg: "Falha na conexão.", error: error});
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