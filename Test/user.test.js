const { callPostApi, callGetApi } = require("./api");
/*
* Test the /GET API
*/
describe('==> USER GET API', () => {

    // Test Product Get api
    describe('1) user/user_list', () => {
        it("call Api and response status check", async () => {
            await callGetApi({url:"user/user_list",message:"call Api and response status check"}).then((res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
            })
        })
        it("Response data should be a object/array", async () => {
            await callGetApi({url:"user/user_list",message:"Response data should be a object/array"}).then((res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
            })
        })
    })
});

