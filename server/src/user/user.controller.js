import User from "../models/user.js";
import { services } from "./user.service.js";

export const controller = {
  create: async (req, res) => {
    try {
      const { accountType } = req.body;

      const PJ = ["cnpj", "initialDate", "socialName"];
      const PF = ["cpf", "birthDate", "name"];

      const missingFields = [];

      if (accountType === "PJ") {
        PJ.forEach((key) => {
          const value = req.body[key];
          !value && missingFields(key);
        });
      }

      if (accountType === "PF") {
        PF.forEach((key) => {
          const value = req.body[key];
          !value && missingFields(key);
        });
      }

      if (!!missingFields.length) {
        return res.status(400).json({
          error: `Campos obrigatórios ausentes: ${missingFields.join(", ")}`,
        });
      }

      services.create(req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAll: async (_, res) => {
    try {
      const users = await User.find();

      res.status(200).json(users);
    } catch (error) {
      console.log("error", error);
    }
  },
};
