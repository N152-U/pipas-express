module.exports = {
    listMethodsSequelizeModel(sequelizeModel)
    {
      //Reference:
      //https://sequelize.org/master/manual/assocs.html#-code-foo-hasmany-bar---code-
      //https://gist.github.com/Ivan-Feofanov/eefe489a2131f3ec43cfa3c7feb36490
        const model = sequelizeModel
        console.log('===============================');
        console.log('Model Name: '+model.name);
        console.log('List of association methods:\n');
        for (let assoc of Object.keys(model.associations)) {
          for (let accessor of Object.keys(model.associations[assoc].accessors)) {
            console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
          }
        }
    },
    debugReq: async (req, res, next) => {
      console.log("reqDebug",req)
    },

  
}