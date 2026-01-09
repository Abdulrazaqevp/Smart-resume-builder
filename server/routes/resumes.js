import express from "express";
import Resume from "../models/Resume.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* ============================
   🔒 PROTECT ALL ROUTES
============================ */
router.use(adminAuth);

/* CREATE RESUME */
router.post("/", async (req, res) => {
  try {
    const doc = new Resume(req.body);
    await doc.save();
    res.status(201).json({ ok: true, resume: doc });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* READ ALL */
router.get("/", async (req, res) => {
  const list = await Resume.find().sort({ createdAt: -1 });
  res.json({ ok: true, list });
});

/* READ ONE */
router.get("/:id", async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  res.json({ ok: true, resume });
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
