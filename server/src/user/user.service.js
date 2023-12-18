import User from "../models/user.js";

export const services = {
  create: async (req, res) => {
    try {
      const user = new User(req.body);

      await user.save();

      res.status(201).json({ message: "Registro bem-sucedido" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
