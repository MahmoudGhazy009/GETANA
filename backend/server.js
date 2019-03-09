const express = require("express");
const app = express();
app.use(express.json());

const c = [{ id: 1, search: "l" }];
app.post("/api/HashTag", (req, res) => {
  const customer = {
    id: c.length + 1,
    search: req.body.search
  };
  c.push(customer);
  {
    console.log(c[c.length - 1]["search"], "opopo");

    res.send(c);
  }
});

const port = 3001;
app.listen(port, () => console.log(`server started on port ${port}`));
