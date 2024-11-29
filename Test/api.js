const chai = require('chai');
const chaiHttp = require('chai-http');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1yLmRhcmtzb3VsMTAzQGdtYWlsLmNvbSIsImlhdCI6MTY2ODY4MjgzMH0.ZzuBr4VSVsKS0kqN1U7dnvcgBXMzmOPFAN2j8rokCsg";
const server = require("../server")
const API_URL = process.env.BACKEND_SERVER_LINK;

chai.should();
chai.use(chaiHttp);

async function callGetApi({url, body}) {
    let authHeader = token ? { authorization: token } : {};
    return chai.request(API_URL)
        .get(url)
        .set(authHeader);
}

async function callPostApi({url, body}) {
    let authHeader = token ? { authorization: token } : {};
    return chai.request(API_URL)
        .post(url)
        .set(authHeader)
        .send(body);
}

async function callPutApi({url, body}) {
    let authHeader = token ? { authorization: token } : {};
    return chai.request(API_URL)
        .put(url)
        .set(authHeader)
        .send(body);
}

async function callDeleteApi({url, body}) {
    let authHeader = token ? { authorization: token } : {};
    return chai.request(API_URL)
        .delete(url)
        .set(authHeader);
}

module.exports = {
    callGetApi,
    callPostApi,
    callPutApi,
    callDeleteApi
}