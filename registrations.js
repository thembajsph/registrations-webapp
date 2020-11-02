
module.exports = function registrations(pool) {

    async function storeData(reg) {

        if (reg !== "") {

            let string = reg.substring(0, 2);

            const selectQuery = await pool.query('SELECT id FROM town_names WHERE town_code  = $1', [string])
            // now we must select the right id for our registrations

            let codeId = selectQuery.rows[0].id

            //to check if its a database
            let ifExists;

            if (codeId > 0) {

                ifExists = await pool.query('SELECT * from foreign_keys where reg_numbers = ($1)', [reg])

            }

            else {

                return false;

            }
            //now if if doesnt in the database , you want to insert registrations and the id

            if (ifExists.rows.length < 1) {

                await pool.query('INSERT INTO  foreign_keys (reg_numbers ,town_id  ) values($1,$2)', [reg, codeId])

            } else {

                return false
            }

        } else {

            return false
        }
    };

    async function existInDatabase(reg) {

        let insideDb = await pool.query('SELECT * FROM foreign_keys WHERE reg_numbers = ($1)', [reg])
        //to check if  exist we use rowCount
        return insideDb.rowCount;
    };

    // now we want to filter our database base on town
    async function filteredTownsOptions(id) {

        if (id === "all") {

            let allRegistrations = await pool.query("SELECT reg_numbers FROM foreign_keys");

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

        //console.log(allNumbers.rows);

        return allNumbers.rows
    };


    async function errorCheck(regNumber) {

        if (regNumber == "") {

            return "Insert a registration number, please!"

        }

    };

    async function errorGreen(regNumber) {

        var regex = /C[AYJ] \d{3,5}$/.test(regNumber) || /C[AYJ] \d+\s|-\d+$/.test(regNumber);

        if (regNumber !== "" && regex) {

            return "registration successfully added"
        }

    };

    async function resetFtn() {

        let restart = await pool.query('DELETE FROM foreign_keys');

        return restart;
    };

    async function buttonMsg() {

        var buttonpressed = false;

        if (!buttonpressed) {

            await resetFtn();

            return "database has be cleared...!"
        }

    };

    async function similar(reg) {

        let insideDb = await pool.query('SELECT * FROM foreign_keys WHERE reg_numbers = ($1)', [reg])

        // to check if it exists you check it by === 1
        return insideDb.rowCount == 1;

    };

    return {
        resetFtn,
        storeData,
        existInDatabase,
        filteredTownsOptions,
        errorCheck,
        allReg,
        errorGreen,
        buttonMsg,
        similar

    }

};



 //   console.log({ string })

  // checks in the terminal if its there of if something is there #commented out
            // console.log({ selectQuery });