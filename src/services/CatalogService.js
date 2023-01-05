const {

    Settlement,
    Collaborator,
    Capacity,
    Dependency,
    CollaboratorHasSettlement,
   Status,
    tPostgres,
  } = require("../models/index.js");
  
  const { Sequelize } = require("sequelize");
  
  const { Op } = require("sequelize");

  
  let t;
  module.exports = {

    getAllCapacity: async () => {
    
      try {
        const capacities=await Capacity.findAll({  
          attributes: [
            "id","name"
          ],
         });   
        return capacities;
      } catch (error) {
        console.trace(error);
        await t.rollback();
        const reducer = (acc, ValidationErrorItem) => `${acc} ${
                  ValidationErrorItem.type
              }: ${
                  ValidationErrorItem.message
              }\n`;
        const errorMessage = error.errors.reduce(reducer, "Errors: \n");
        throw new Error(errorMessage);
      }
  },
    getAllDependency: async () => {
    
      try {
        const dependencies=await Dependency.findAll({  
          attributes: [
            "id","name",
          ],
          });   
        return dependencies;
      } catch (error) {
        console.trace(error);
        await t.rollback();
        const reducer = (acc, ValidationErrorItem) => `${acc} ${
                  ValidationErrorItem.type
              }: ${
                  ValidationErrorItem.message
              }\n`;
        const errorMessage = error.errors.reduce(reducer, "Errors: \n");
        throw new Error(errorMessage);
      }
  },
  getAllSettlement: async () => {
    
    try {
      const settlements=await Settlement.findAll({  
        attributes: [
          "id","settlement","d_tipo_asenta",["municipality_id", "municipalityId"]
        ],
        });   
      return settlements;
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) => `${acc} ${
                ValidationErrorItem.type
            }: ${
                ValidationErrorItem.message
            }\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
},
getAllStatus: async () => {
    
  try {
    const statuses=await Status.findAll({  
      attributes: [
        "id","name"
      ],
      where:{active:true}
      });   
    return statuses;
  } catch (error) {
    console.trace(error);
    await t.rollback();
    const reducer = (acc, ValidationErrorItem) => `${acc} ${
              ValidationErrorItem.type
          }: ${
              ValidationErrorItem.message
          }\n`;
    const errorMessage = error.errors.reduce(reducer, "Errors: \n");
    throw new Error(errorMessage);
  }
},


  };
  