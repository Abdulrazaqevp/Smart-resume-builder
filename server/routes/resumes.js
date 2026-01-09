import express from "express";
import Resume from "../models/Resume.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

/* ============================
   PUBLIC: SAVE RESUME
============================ */
router.post("/", adminAuth, async (req, res) => {
  try {
    const doc = new Resume(req.body);
    await doc.save();
    res.status(201).json({ ok: true, resume: doc });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ============================
   🔒 ADMIN ONLY ROUTES
============================ */
router.use(adminAuth); // 🔥 THIS LINE IS CRITICAL

router.get("/", adminAuth, async (req, res) => {
  const list = await Resume.find().sort({ createdAt: -1 });
  res.json({ ok: true, list });
});

router.get("/:id", async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  res.json(resume);
});

router.delete("/:id", async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
