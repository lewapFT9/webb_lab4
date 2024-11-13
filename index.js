"use strict";

const express = require("express");
const app = express();

// define endpoint for exercise 1 here
app.get("/math/circle", (req, res) => {
  const r = req.query;
  if (!r) {
    return res.status(400).send("Missing Required GET parameters");
  }
  const area = r.r * r.r * Math.PI;
  const circumference = 2 * Math.PI * r.r;
  res.json({ area, circumference });
});

//TODO2
app.get("/math/rectangle", (req, res) => {
  const { width, height } = req.query;
  if (!width || !height) {
    return res.status(400).send("Missing Required GET parameters");
  }
  const area = 2 * width + 2 * height;
  const circumference = width * height;
  res.json({ area, circumference });
});

//TODO3
app.get("/math/power", (req, res) => {
  const { base, exponent } = req.query;
  if (!base || !base) {
    return res.status(400).send("Missing Required GET parameters");
  }
  const result = Math.pow(base, exponent);
  res.json(result);
});

//4.1
app.get("/math/power2", (req, res) => {
  const { base, exponent, root } = req.query;
  if (!base || !exponent) {
    return res.status(400).send("Missing Required GET parameters");
  }
  const result = Math.pow(base, exponent);
  if (root == "true") {
    const rootResult = Math.sqrt(result);
    res.json({ result, rootResult });
  } else {
    res.json(result);
  }
});

// 4.2.1

let categories = ["funnyJoke", "lameJoke"];
let funnyJoke = [
  {
    joke: "Dlaczego komputer poszedł do lekarza?",
    response: "Bo złapał wirusa!",
  },
  {
    joke: "Dlaczego komputer nie może być głodny?",
    response: "Bo ma pełen dysk!",
  },
  {
    joke: "Co mówi jeden bit do drugiego?",
    response: "Trzymaj się, zaraz się przestawiamy!",
  },
];
let lameJoke = [
  {
    joke: "Dlaczego programiści preferują noc?",
    response: "Bo w nocy jest mniej bugów!",
  },
  {
    joke: "Jak nazywa się bardzo szybki programista?",
    response: "Błyskawiczny kompilator!",
  },
];

app.get("/jokebook/categories", (req, res) => {
  res.json(categories);
});

app.get("/jokebook/joke", (req, res) => {
  const category = req.query;
  if (!category) {
    return res.status(400).send("Missing Required GET parameters");
  }
  if (category.category === "funnyJoke") {
    const randomJoke = funnyJoke[Math.floor(Math.random() * funnyJoke.length)];
    res.json(randomJoke);
  } else if (category.category === "lameJoke") {
    const randomJoke = lameJoke[Math.floor(Math.random() * lameJoke.length)];
    res.json(randomJoke);
  } else {
    const message = `no jokes for category ${category.category}`;
    res.type("text").send(message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
