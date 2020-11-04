module.exports = function routesFactory(registrations) {

  const root = async function (req, res) {

    res.render("index", {

      reg: await registrations.allReg(),

    });

  };

  const postRegistrations = async function (req, res) {

    try {

      let regTown = req.body.regNumbers

      regTown = regTown.toUpperCase();

      //flash warning message
      let flashMsg = await registrations.errorCheck(regTown);
      let flashGreen = await registrations.errorGreen(regTown);


      let similiar = await registrations.similar(regTown)

      //if similiar cheeckifit exist and do nothing afterwards
      if (similiar) {

        req.flash("semesies", 'registration number already exists... try again!')

        // add the rest your code here

      } else {

        req.flash("info", flashMsg);

        req.flash("green", flashGreen);

        var regex = /C[AYJ] \d{3,5}$/.test(regTown) || /C[AYJ] \d|-\d+$/.test(regTown);

        if (regTown !== "" && regex) {

          await registrations.storeData(regTown);

        }
      }

      res.render("index", {

        reg: await registrations.allReg(),
        // dont needto have keys for flash twice , do it once up there eg. ----->  wrong: flashMsg,

      })

    } catch (error) {

      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);

    }

  };

  const getRegistrations = async function (req, res) {

    try {

      res.render("index", {

        reg: await registrations.allReg()

      });

    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack)
    };

  };

  const filteredTowns = async function (req, res) {
    try {

      let town = req.query.options;



      let all = await registrations.filteredTownsOptions(town)
      //console.log(all)

      res.render("index", {
        reg: all
      });

    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack)

    }

  };

  const clearDatabase = async function (req, res) {

    try {
      let regTown = req.body.regNumbers

      let clearDb = await registrations.buttonMsg(regTown)

      req.flash("clear", clearDb);

      await registrations.resetFtn()

      res.redirect("/")

    }
    catch (error) {
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack)
    }

  };

  return {
    root,
    postRegistrations,
    getRegistrations,
    filteredTowns,
    clearDatabase

  };



        // /C[AYJ] \d+\s|/;































}