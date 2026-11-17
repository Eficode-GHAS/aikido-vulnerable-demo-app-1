import { exec } from "node:child_process";
import { Router } from "express";
import fs from "node:fs";

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

// ==================== OPEN REDIRECT ====================
router.get("/redirect", (req, res) => {
  const redirectUrl = req.query.url;
  res.redirect(redirectUrl);
});

router.get("/go", (req, res) => {
  const target = req.query.target;
  res.redirect(302, target);
});

router.get("/read-config", (req, res) => {
  const file = req.query.file;
  const content = fs.readFileSync(`/config/${file}`, "utf-8");
  res.json({ content });
});

router.get("/admin-panel", (req, res) => {
  res.json({ adminData: "sensitive information" });
});

router.delete("/user/:id", (req, res) => {
  res.json({ deleted: true });
});

router.get("/random", (req, res) => {
  const token = Math.random().toString(36).substring(7);
  res.json({ token });
});

router.post("/hash-password", (req, res) => {
  const password = req.body.password;
  const hash = crypto.createHash("md5").update(password).digest("hex");
  res.json({ hash });
});

export default router;
