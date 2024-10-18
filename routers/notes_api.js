const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
//save data
router.post("/save", async (req, res) => {
    const {
      name, password, text, fontfamily, fontsize, italic, underline, alignment 
    } = req.body;
  
    // Validate required fields
    if (!name || !password || !text || !fontfamily || !fontsize || !alignment) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const note = new Note({
        name,
        text,
        fontfamily,
        password,
        fontsize,
        italic,
        underline,
        alignment,
      });
  
      await note.save();
      console.log("Saving note...");
      res.status(201).json({ message: "Note saved successfully", note });
    } catch (error) {
      console.error("Error saving note:", error.message); // Log detailed error
      res.status(500).json({ error: "Failed to save note" });
    }
  });
  
//fetch all data based on recent time time 
router.get("/notes", async (req, res) => {
    try {
       
        const notes = await Note.find().sort({ time: -1 });  // -1 sorts by newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});
//update data
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, text, fontfamily, fontsize, italic, underline, alignment } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,  
            { name, text, fontfamily, fontsize, italic, underline, alignment }, 
            { new: true }  
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Failed to update note" });
    }
});
//delete data
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Failed to delete note" });
    }
});
module.exports = router;
