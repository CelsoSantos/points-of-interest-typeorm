import app from "./app";
import request from "supertest";
import { shutdownServer } from "./server"
import { HttpStatusCode } from "./utils/HttpStatusCodes.enum"
import { AppDataSource } from "./db/data-source";
// import { dataInit } from "./db/data-init";

// beforeAll(async () => {
//   await shutdown();
// })

// beforeEach(() => {
//   // shutdown();
//   startServer()
// })

// afterEach(async () => {
//   shutdown();
// })

afterAll(async () => {
  AppDataSource.destroy();
  shutdownServer();
})

jest.useFakeTimers({legacyFakeTimers: true});

describe("GET /", () => {
  it('responds with "Hello! My name is Celso Santos"', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe(
      "Hello! My name is Celso Santos"
    );
  });
});


describe("GET /health", () => {
  it('responds with a 200 OK', async () => {
    const response = await request(app).get("/health")
    expect(response.status).toBe(HttpStatusCode.OK);
    expect(response.text).toBe("OK");
  });
});

describe("GET /points-of-interest", () => {
  it('responds with the X number of POIs, where X is the page size', async () => {
    const response = await request(app).get("/points-of-interest")
    expect(response.status).toBe(HttpStatusCode.OK);
    // expect(response.body.length).toBe(10); // Default size: 10
    // let poi = response.body[0];
    // expect(poi.id).toBe("7737cc63-4024-4626-984d-5dadabf784ff")
    //TODO: Make checks
  });

  // it('responds with the requested POI detailed information', async () => {
  //   const response = await request(app).get("/points-of-interest/:id") //TODO: Check the param value
  //   expect(response.status).toBe(200);
  //   expect(response.body.length).toBe(5);
  //   let poi = response.body[0];
  //   //TODO: Make checks
  // });
});
