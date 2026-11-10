import { exec } from "node:child_process";
import { Router } from "express";

// Intentionally vulnerable examples for security-scanner demonstrations.
// This router is not mounted by the application.
const router = Router();

router.get("/lookup", (req, res) => {
  exec(`nslookup ${req.query.host}`, (error, stdout) => {
    if (error) {
      res.status(500).send("Lookup failed");
      return;
    }

    res.type("text/plain").send(stdout);
  });
});

router.get("/greeting", (req, res) => {
  res.send(`<h1>Hello, ${req.query.name}</h1>`);
});

export default router;
