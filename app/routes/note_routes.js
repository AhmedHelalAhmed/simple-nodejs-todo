var ObjectID = require("mongodb").ObjectID;

module.exports = function (app, db) {
  app.get("/notes", (req, res) => {
    // You'll create your note here.
    res.send("Hello get");
  });

  app.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    // db.collection('notes').findOne(details, (err, item) => { if (err) { res.send({ 'error': 'An error has occurred' }); } else { res.send(item); } });
    let doc = await db.collection("notes").findOne(details);
    res.send(doc);
  });

  app.put("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = { text: req.body.body, title: req.body.title };
    let ress = await db
      .collection("notes")
      .update({ _id: new ObjectID(id) }, note);
    console.log("resresresres", ress);
    res.send(note);
  });

  app.post("/notes", async (req, res) => {
    // You'll create your note here.
    console.log(req.body);
    const note = { text: req.body.body, title: req.body.title };
    //db
    let ress = await db.collection("notes").insert(note);
    console.log("resresresres", ress.ops[0]);
    res.send(note);
  });
};
