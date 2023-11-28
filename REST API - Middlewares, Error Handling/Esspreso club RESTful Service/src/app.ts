import express, { NextFunction, Request, Response } from "express";
import freeCoffee from "./middleware/free-coffee";
import showId from "./middleware/show-id";
import verbose from "./middleware/verbose";

const server = express();

server.use(express.json());
server.use(verbose);

server.get("/api/coffees" , (request: Request, response: Response, next: NextFunction) =>{
    response.json(coffees);
});

server.get("/api/coffees/:id", (request: Request, response: Response, next: NextFunction) =>{
    const id = +request.params.id;
    const coffee = coffees.find(c => c.id === id);
    response.json(coffee);
});

server.post("/api/coffees", freeCoffee,(request: Request, response: Response, next: NextFunction) =>{
    const coffee = request.body;
    coffee.id = coffees[coffees.length - 1].id +1;
    coffees.push(coffee);
    response.json(coffee);
});

server.put("/api/coffees/:id", showId ,(request: Request, response: Response, next: NextFunction) =>{
    request.body.id = +request.params.id;
    const coffee = request.body;
    const index = coffees.findIndex(c => c.id === coffee.id);
    coffees[index] = coffee;
    response.json(coffee)
});

server.patch("/api/coffees/:id" , (request : Request, response: Response, next: NextFunction) => {
    request.body.id = +request.params.id;
    const partialCoffee = request.body;
    const dbCoffee = coffees.find(k => k.id === partialCoffee.id);
    for(const prop in partialCoffee){
       dbCoffee[prop] = partialCoffee[prop];
    }
    response.json(dbCoffee);
});

server.delete("/api/coffees/:id", (request: Request, response: Response, next: NextFunction) =>{
    const id = +request.params.id;
    const index = coffees.findIndex(c => c.id === id);
    coffees.splice(index, 1);
    response.sendStatus(204);
});

server.get("/api/coffees-by-intensity/:int", (request: Request, response: Response, next: NextFunction) =>{
    const intensity = +request.params.int;
    const coffeeInRange = coffees.filter(c => c.intensity <= intensity);
    response.json(coffeeInRange);
});

// Upload server to the air:
server.listen(4000, () => console.log("Listening on http://localhost:4000"));

const coffees = [
    { id: 1, coffeeType: "Vanilla", price: 5.45, intensity: 2},
    { id: 2, coffeeType: "Espresso", price: 3.05, intensity: 5},
    { id: 3, coffeeType: "Caramel", price: 4.75, intensity: 3},
];
