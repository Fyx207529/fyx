const fs = require('fs');
const fs2 = require('fs');

// Check if .git exists
const fsPath = require('path');
const gitPath = 'C:\\\\Users\\\\17379\\\\Desktop\\\\website\\\\.git';
if (fs.existsSync(gitPath)) {
  console.log('Git repo already exists');
} else {
  console.log('Initializing git repo');
  require('child_process').execSync('git init', { cwd: 'C:\\\\Users\\\\17379\\\\Desktop\\\\website' });
  console.log('Git initialized');
}

// Add all files
require('child_process').execSync('git add -A', { cwd: 'C:\\\\Users\\\\17379\\\\Desktop\\\\website' });
console.log('Files added');

 // Commit
execSync('git commit -m "Apogee hero section"', { cwd: 'C:\\\\Users\\\\17379\\\\Desktop\\\\website' });
console.log('Commit successful');

// Push
execSync('git push origin main', { cwd: 'C:\\\\Users\\\\17379\\\\Desktop\\\\website' });
console.log('Push successful - code uploaded to GitHub');
"