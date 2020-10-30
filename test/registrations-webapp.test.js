const assert = require("assert");
//const registrations = require("../registrations");

const pg = require("pg");
// const { reset } = require("nodemon");
const registrations = require("../registrations");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/registrations_tests';
const pool = new Pool({
    connectionString
});

let instance = registrations(pool);


describe("The registrations webapp", async function () {


    beforeEach(async function () {

        await pool.query("DELETE FROM foreign_keys")
    });


    it("should be able to add a new registration number", async function () {

        await instance.storeData("CA 124 133");
        await instance.storeData("CJ 333 456");
        await instance.storeData("CY 777 485");

        assert.deepEqual[{ reg_number: "CA 124 133" }, { reg_number: "CJ 333 456" }, { reg_number: "CY 777 485" }], await instance.allReg();

    });


    it("should return (all) registration numbers in the database", async function () {


        await instance.storeData("CA 222 364")


        assert.deepEqual([{ reg_numbers: 'CA 222 364' }], await instance.filteredTownsOptions("1"));

    });


    it("should not add duplicate registration numbers into the database", async function () {


        await instance.storeData("CA 222-365")
        await instance.storeData("CA 222-365")

        assert.deepEqual([{ reg_numbers: 'CA 222-365' }], await instance.allReg());

    });


    it("should return all registrations starting with CY", async function () {


        await instance.storeData("CY 555 123");
        await instance.storeData("CY 523 456");
        await instance.storeData("CJ 888 678");

        assert.deepEqual([{ reg_numbers: "CY 555 123" }, { reg_numbers: "CY 523 456" }], await instance.filteredTownsOptions("3"))
    });




    it("should be able to use flash and return a message if the input is not valid", async function () {

        assert.equal("Insert a registration number, please!", await instance.errorCheck(''));

    });

    it("should be able to use flash and return a message if the input is valid", async function () {

        // await instance.storeData("CY 456 789");

        assert.equal("registration successfully added", await instance.errorCheck('CY 456 789'));

    });


})

after(function () {
    pool.end();


});






















































// it("should be able get the number of the registration from storage", function () {
    //     let instance = numberReg()
    //     instance.broughBackArray()

    //     instance.storeArray("CA 123 456")
    //     instance.storeArray("CY 456 789")
    //     instance.storeArray("CJ 147 756")

    //     assert.deepEqual(["CA 123 456", "CY 456 789", "CJ 147 756"], instance.broughBackArray());

    // });


    // it("should be able take in a different language and return message", async function () {


    //     var message = await instance.language("Isixhosa", "Themba");
    //     var message2 = await instance.language("English", "Themba");
    //     var message3 = await instance.language("Afrikaans", "Sipho");


    //     assert.equal(message, "Molo, Themba" + " !");
    //     assert.equal(message2, "Hello, Themba" + " !");
    //     assert.equal(message3, "Hallo, Sipho" + " !");

    // });


    // it("should be able check if no name is updated and return undefined or empty", async function () {

    //     let instance = greetings(pool);

    //     assert.equal(undefined, await instance.getCountForUser('sipho'));

    // });

    // it("should be able check count for specific  user", async function () {

    //     let instance = greetings(pool);

    //     //await instance.existDbAndCount();

    //     await instance.enterName("Thabie");
    //     await instance.enterName("zweli");

    //     assert.deepEqual(await instance.getCountForUser("zweli"), 1);

    // });


    // it("should be able to reset the counter back to zero", async function () {

    //     let instance = greetings(pool);


    //     await instance.enterName("Hloni");
    //     await instance.enterName("Tau");

    //     await instance.resetFtn()
    //     assert.deepEqual([], await instance.getName());

    // });



