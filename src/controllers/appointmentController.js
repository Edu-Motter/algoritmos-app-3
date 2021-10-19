const Appointment = require("../models/Appointment");

module.exports = {
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
}