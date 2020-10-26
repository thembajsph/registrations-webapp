const assert = require("assert");
const greetings = require("../");

const pg = require("pg");
const { reset } = require("nodemon");
const registrations = require("../registrations");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/registrations-tests';
const pool = new Pool({
    connectionString
});

let instance = registrations(pool); registrations


describe("The registrations webapp", async function () {


    beforeEach(async function () {
        await pool.query("delete from town_names");
        await pool.query("delete from foreign_keys")
    });

    it("should be able to add a new registration number", async function () {

        await instance.storeData("CA 124 133");
        await instance.storeData("CJ 333 456");
        await instance.storeData("CY 777 485");

        assert.deepEqual[{ reg_number: "CA 124 133" }, { reg_number: "CJ 333 456" }, { reg_number: "CY 777 485" }], await instance.allReg();

    });

    it("should be able check if it exist in database number of the registration", async function () {

        await instance.storeData("CA 123 556");
        await instance.storeData("CY 456 325");
        await instance.storeData("CJ 147 816");

        assert.deepInclude(["CA 123 556", "CY 456 325", "CJ 147 816"], "CA 123 556");
        assert.deepInclude(["CA 123 556", "CY 456 325", "CJ 147 816"], "CJ 147 816");
        assert.deepInclude(["CA 123 556", "CY 456 325", "CJ 147 816"], "CY 456 325");
    });


    it("should be able take in a filter based on town and return town's registration number", async function () {

        var capeTown = await instance.storeData("CA 123 456")
        var bellville = await instance.storeData("CY 456 789")
        var paarl = await instance.storeData("CJ 147 756")

        assert.deepEqual(capeTown, instance.filteredTownsOptions("CA"));
        assert.deepEqual(bellville, instance.filteredTownsOptions("CY"));
        assert.deepEqual(paarl, instance.filteredTownsOptions("CJ"));

    });

});


it("should be able to use flash and return a message if the input is not valid", async function () {

    assert.equal(assert.deepEqual(["Insert a registration number, please!"], instance.errorCheck()));

});

it("should be able to use flash and return a message if the input is valid", async function () {

    instance.storeData("CY 456 789");

    assert.equal(assert.deepEqual(["registration successfully added"], instance.errorCheck()));

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



