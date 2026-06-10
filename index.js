import http from "http";
import fs from "fs";

const FILE = "./data/notes.json";

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (pathname === "/api/home" && req.method === "GET") {
    const data = fs.readFileSync(FILE, "utf-8");

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(data);
  } else if (pathname === "/add-note" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newNote = JSON.parse(body);

      const data = fs.readFileSync(FILE, "utf-8");
      const notes = JSON.parse(data);

      const updatedNotes = [...notes, newNote];

      fs.writeFileSync(FILE, JSON.stringify(updatedNotes, null, 2));

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: true,
          notes: updatedNotes,
        }),
      );
    });
  } else if (pathname === "/edit-note" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newNote = JSON.parse(body);

      const data = fs.readFileSync(FILE, "utf-8");
      const notes = JSON.parse(data);

      const updatedNotes = notes.map((note) =>
        note.id === newNote.id
          ? { ...note, title: newNote.title, text: newNote.text }
          : note,
      );

      fs.writeFileSync(FILE, JSON.stringify(updatedNotes, null, 2));

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: true,
          notes: updatedNotes,
        }),
      );
    });
  } else if (pathname === "/remove-note" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newNote = JSON.parse(body);
      const id = newNote.id;

      const data = fs.readFileSync(FILE, "utf-8");
      const notes = JSON.parse(data);

      const updatedNotes = notes.filter((note) => note.id !== id);

      fs.writeFileSync(FILE, JSON.stringify(updatedNotes, null, 2));

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: true,
          notes: updatedNotes,
        }),
      );
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("Not Found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
