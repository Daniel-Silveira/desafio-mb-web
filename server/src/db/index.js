import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://testmb:BHG3nTocFnCb9O43@cluster0.l4llo52.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro na conexão com o MongoDB:"));
db.once("open", () => {
  console.log("Conexão bem-sucedida com o MongoDB");
});
