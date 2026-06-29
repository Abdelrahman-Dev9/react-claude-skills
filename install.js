const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "skills");

// Walk up from node_modules to find the project root
const projectRoot = process.cwd();

const dest = path.join(projectRoot, "skills");

function copyDir(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const srcPath = path.join(from, entry.name);
    const destPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(dest)) {
  console.log("✅ skills/ folder already exists — skipping copy.");
} else {
  copyDir(src, dest);
  console.log(`✅ Skills copied to: ${dest}`);
  console.log("📁 Folder structure:");
  for (const entry of fs.readdirSync(dest, { withFileTypes: true })) {
    if (entry.isDirectory()) console.log(`   └── ${entry.name}/SKILL.md`);
  }
}
