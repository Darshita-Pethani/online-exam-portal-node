const { callPostApi, callGetApi,callPutApi,callDeleteApi } = require("./api");
const chai = require('chai');
const chaiHttp = require('chai-http');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1yLmRhcmtzb3VsMTAzQGdtYWlsLmNvbSIsImlhdCI6MTY2ODY4MjgzMH0.ZzuBr4VSVsKS0kqN1U7dnvcgBXMzmOPFAN2j8rokCsg";
const server = require("../server")
const API_URL = process.env.BACKEND_SERVER_LINK;
let authHeader = token ? { authorization: token } : {};

chai.should();
chai.use(chaiHttp);
/*
* Test the /GET route
*/
// describe('==> PRODUCT GET API', () => {

//     // Test Product Get api
//     describe('1) product/:id', () => {
//         it("it should GET One the Product", async () => {
//             let res = await callGetApi({url:`product/${19}`})
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('message');
//             res.body.should.have.property('data');
//             res.body.data.id.should.have.a('number');
//             res.body.data.should.be.a('object');
//         })
//         it("static", async () => {
//             chai.request(API_URL)
//             .get(`product/${19}`)
//             .set(authHeader)
//             .end((err,res)=>{
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message');
//                 res.body.should.have.property('data');
//                 res.body.data.id.should.have.a('number');
//                 res.body.data.should.be.a('object');
//             })
//         })
//     })

//     // Test Product Get api
//     context('2) product/allProducts', () => {
//         it("it should get all product", async () => {
//             await callGetApi({url:"product/allProducts"}).then((res)=>{
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message');
//                 res.body.should.have.property('data');
//             })
//         })
//     })
// });

// /*
// * Test the /POST route
// */
// describe('==> PRODUCT POST API', () => {

//     // Test Product Get api
//     describe('1) product/addProduct', () => {
//         it("it should Add product Data", async () => {
//             let send_data = {
//                 "title":"Iphone 14 pro",
//                 "price":150000,
//                 "description":"It is IPhone 14 pro Mobile",
//                 "published":true
//             }
//             callPostApi({url:"product/addProduct",body:send_data}).then((res)=>{
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message');
//                 res.body.should.have.property('data');
//             })
//         })
//     })
// });


// describe('==> PRODUCT PUT API', () => {

//     // Test Product Get api
//     describe('1) product/:id', () => {
//         it("it should Add product Data", async () => {
//             let send_data = {
//                 "title":"Iphone 14 mini",
//                 "price":100000,
//                 "description":"It is IPhone 14 mini Mobile",
//                 "published":true
//             }
//             callPutApi({url:`product/${30}`,body:send_data}).then((res)=>{
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message');
//                 res.body.should.have.property('data');
//             })
//         })
//     })
// });

describe('==> CRUD operation', () => {

    // Test Product Post api
    let productData = {};
    describe('1) CREATE product/addProduct', () => {
        it("it should Add product Data", async () => {
            let send_data = {
                "title":"Iphone 14 pro",
                "price":150000,
                "description":"It is IPhone 14 pro Mobile",
                "published":true
            }
            await callPostApi({url:"product/addProduct",body:send_data}).then((res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                productData.id = res.body.data.id
            })
        })
    })
     // Test Product Get api
    describe('2) READ product/:id', () => {
        it("it should GET One the Product", async () => {
            await callGetApi({url:`product/${productData.id}`}).then((res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.data.id.should.have.a('number');
                res.body.data.should.be.a('object');
            })
        })
    })
    // Test Product Put api
    describe('3) UPDATE product/:id', () => {
        it("it should Update product Data", async () => {
            let send_data = {
                "title":"Iphone 14 mini",
                "price":100000,
                "description":"It is IPhone 14 mini Mobile",
                "published":true
            }
            await callPutApi({url:`product/${productData.id}`,body:send_data}).then((res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
            })
        })
    })
    // Test Product Delete api
    describe('4) DELETE product/:id', () => {
        it("it should Delete product Data", async () => {
            await callDeleteApi({url:`product/${productData.id}`}).then((res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            })
        })
    })
});