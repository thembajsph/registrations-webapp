module.exports = function routesFactory(registrations) {


  const root = async function (req, res) {

    res.render("index", {

      reg: await registrations.allReg(),

    });

  };


  const postRegistrations = async function (req, res) {

    try {

      let regTown = req.body.regNumbers
      // console.log(regTown);
      regTown = regTown.toUpperCase();

      //flash warning message
      let flashMsg = await registrations.errorCheck(regTown);

      // console.log(flashMsg);

      req.flash("info", flashMsg);

      var regex = /C[AYJ] \d{3,5}$/.test(regTown) || /C[AYJ] \d+\s|-\d+$/.test(regTown);

      if (regTown !== "" && regex) {

        await registrations.storeData(regTown);
        // console.log(regTown)

      }

      res.render("index", {

        reg: await registrations.allReg(),
        wrong: flashMsg,

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


































}