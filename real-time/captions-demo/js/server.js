const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000
const cors = require("cors");
const fs = require("fs")
const { parseSync } = require ("subtitle")

app.use(express.json());
app.use(cors());

app.get("/vtt", (req, res) => {
  //Read the VTT text file
  const input = fs.readFileSync("./vtt/video.vtt", "utf8")
  //Parse the VTT file and return an array of cues including start time, end time, and text for each caption
  const result = parseSync(input)
  //Send the array of cues as a JSON response
  res.json(result)
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))