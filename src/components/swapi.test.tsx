//import * as React from "react";
//import { render, fireEvent, waitFor, screen } from "@testing-library/react";
//import "@testing-library/jest-dom";
import request from "supertest";
const app = "https://swapi.dev/api/";
// https://jsonplaceholder.typicode.com/

describe("Get a Star Wars character", () => {
  it("should get Luke Skywalker", async () => {
    await request(app)
      .get("people/1/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/2/",
          "https://swapi.dev/api/films/3/",
          "https://swapi.dev/api/films/6/"
        ],
        species: [],
        vehicles: [
          "https://swapi.dev/api/vehicles/14/",
          "https://swapi.dev/api/vehicles/30/"
        ],
        starships: [
          "https://swapi.dev/api/starships/12/",
          "https://swapi.dev/api/starships/22/"
        ],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.dev/api/people/1/"
      });
  });
});
