const os = require('os');
const express = require("express");
//dd
const app = express();

const port = process.env.PORT || 3001

app.use(express.static("src/public"));

app.get("/api/invoice.json", (req, res) => {
  res.json({
    id: "d471c483-f15f-490b-adb3-7c5821b6d955",
    lineItems: [
      { description: "If we synthesize the microchip, we can get to the IB transmitter through the bluetooth AI monitor!", price: 21.23 },
      {
        description:
          "Generating the bus won't do anything, we need to compress the cross-platform JSON card!",
        price: 10.71
      }
    ],
    email: "austinhackett@durgan.org",
    fullName: "Delaney Howell",
    company: "Kassulke Group",
    createdAt: "1967-10-11",
    dueAt: "2007-02-08"
  });
});

app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});
