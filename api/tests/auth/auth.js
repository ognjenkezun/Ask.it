const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const User = require('../../db/models').User;

const authService = require('../../services/auth/auth');
// const authService = require('../../services/auth/auth');
// const authController = require('../../controllers/auth/auth');


describe('Authentication', () => {
    // let mockAuth = sinon.mock(authService);
    // let mockDBUser = sinon.mock(User);

	describe('Register', () => {

        const registeringData = { 
            firstName: 'aaaaaaaaaaaaa',
            lastName: 'aaaaaa',
            email: 'aaaaaaaaaaaaaaa@aaaa.aaa',
            password: '123aaa321aaa'
        };

        const response = {
            token: "dadadadsa",
            user: {
                firstName: 'aaaaaaaaaaaaa',
                lastName: 'aaaaaa',
                email: 'aaaaaaaaaaaaaaa@aaaa.aaa',
                password: '123aaa321aaa'
            }
        }

        it ('Should be registered', () => {
            const stub = sinon.stub(authService, "register").returns(registeringData);
            console.log("STUB ==> ", stub);
            // const mck = await authService.register(registeringData)
            expect(stub.calledOnce).to.be.true;
            // let res = mockAuth.expects("register")
            //                   .withArgs(registeringData)
            //                   .once();
            
            //console.log('res => ', res);

            //expects(res).expec
            // expect(mockAuth.register(registeringData)).to.have.property('token');
            //mockAuth.x
        });

        // mockAuth.restore();
        // mockAuth.verify();
	});

	describe('Login', () => {

	});
});

// describe('API', () => {
//     describe('GET /', () => {
//         let fakeServer;

//         beforeEach(() => {
//             fakeServer = createFakeServer();
//         });

//         it ('Should return the object', (done) => {
//             chai.request(fakeServer)
//                 .get("/")
//                 .end((err, res) => {
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);

//                     expect(res.body).to.be.a('object');

//                     expect(res.body).to.have.property('message');

//                     expect(res.body).to.have.property('value');
//                     expect(res.body.value).to.be.a('number');

//                     expect(res.body).to.have.property('odds');
//                     expect(res.body.odds).to.be.a('array').with.lengthOf(5);
//                     expect(res.body.odds).to.be.an('array').that.does.not.include(2);
//                     expect(res.body.odds).to.deep.include(5);
//                     expect(res.body.odds).to.have.ordered.members([1, 3, 5, 7, 9]).but.not.have.ordered.members([3, 1]);
                    
//                     expect(res.body).to.have.property('person');
//                     expect(res.body.person).to.have.property('id');
//                     expect(res.body.person).to.have.property('name');
//                     expect(res.body.person.name).to.be.string;
//                     expect(res.body.person.name).to.deep.equal('Sam Barros');

//                     done();
//                 });
//         });
//     });
// });

// describe('Authentication', () => {
// 	describe('Register', () => {
// 	});

// 	describe('Login', () => {
// 	});
// });