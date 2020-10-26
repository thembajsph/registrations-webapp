
// const { lang } = require("moment");
module.exports = function registrations(pool) {

    async function storeData(reg) {

        if (reg !== "") {

            let string = reg.substring(0, 2);

           // console.log(string)


            const selectQuery = await pool.query('SELECT id FROM town_names WHERE town_code  = ($1) ', [string])
            // now we must select the right id for our registrations

            const codeId = selectQuery.rows[0].id
            console.log(codeId)
            //to check if its a database

            let ifExists;

            // console.log(ifExists
            if (codeId > 0) {

                ifExists = await pool.query('SELECT  * from foreign_keys where reg_numbers = ($1)', [reg])
            }

            else {

                return false;

            }
            //now if if doesnt i the database , you want to insert registrations and the id
         //   let InsertQuery;

            if (ifExists.rows.length < 1) {

                await pool.query('INSERT INTO  foreign_keys (reg_numbers ,town_id  ) values($1,$2)', [reg, codeId])

            } else {

                // console.log("Not inserted into database")
                return false
            }

        } else {

            return false
        }
    };


    // getting rowCount to use for flash error message
    async function existInDatabase(reg) {

        let insideDb = await pool.query('SELECT * FROM foreign_keys WHERE reg_numbers = ($1)', [reg])
        return insideDb.rowCount;
    }

    // now we want to filter our database base on town
    async function filteredTownsOptions(id) {

        if (id === "all") {

            let allRegistrations = await pool.query("SELECT reg_numbers FROM foreign_keys");
//console.log(allRegistrations.rows)
//return
            return allRegistrations.rows
        }
        else {

            const regId = await pool.query("SELECT reg_numbers FROM foreign_keys WHERE  town_id = ($1)", [id])
//console.log(regId.rows)
            return regId.rows
        }
    };



    // returning all registrations in database
    async function allReg() {

        let allNumbers = await pool.query('SELECT reg_numbers FROM foreign_keys');

        console.log(allNumbers.rows);

        return allNumbers.rows
    };


    async function errorCheck(regNumber) {

        //  var userName = await req.body.userName;

        if (regNumber === "") {

            return "Insert a registration number, please!"

        }
        else if (regNumber) {

            return "registration successfully added"
        }

    };

    return {
        storeData,
        existInDatabase,
        filteredTownsOptions,
        errorCheck,
        allReg

    }

};

