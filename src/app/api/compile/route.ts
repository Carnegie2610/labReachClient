import { NextResponse } from 'next/server';
import { exec } from 'child_process';
// IMPORT 'mkdir' from fs/promises
import { writeFile, mkdtemp, mkdir } from 'fs/promises';
import path from 'path';
import os from 'os';

// This helper function is fine, but we'll use the improved one from before
function runCliCommand(command: string): Promise<{ stdout: string; stderr: string; error: Error | null }> {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({ stdout, stderr, error });
    });
  });
}

export async function POST(request: Request) {
  let tempDir: string | null = null;
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'No code provided.' }, { status: 400 });
    }

    // 1. Create a temporary directory
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'arduino-build-'));
    const sketchName = 'temp_sketch';
    const sketchDir = path.join(tempDir, sketchName);
    const sketchPath = path.join(sketchDir, `${sketchName}.ino`);

    // --- THE FIX IS HERE ---
    // We now use Node's built-in, reliable 'mkdir' function.
    // The { recursive: true } option is the equivalent of the '-p' flag.
    await mkdir(sketchDir, { recursive: true }); 
    // The previous unreliable line is removed: `await exec(`mkdir -p ${sketchDir}`);`

    // Now this line will succeed because the directory is guaranteed to exist.
    await writeFile(sketchPath, code);

    // 2. Define the arduino-cli compile command
    const fqbn = 'esp32:esp32:esp32';
    const cliPath = 'arduino-cli'; // Assuming it's in the PATH, otherwise use an absolute path
    const compileCommand = `${cliPath} compile --fqbn ${fqbn} ${sketchDir}`;
    
    // 3. Execute the command
    const { stdout, stderr, error } = await runCliCommand(compileCommand);
    
    // Check for system-level execution errors first
    if (error) {
      console.error(`CLI Execution Error:`, error);
      return NextResponse.json({ success: false, message: `Server execution error: ${error.message}` }, { status: 500 });
    }
    
    // Check for standard compilation errors
    if (stderr) {
      console.error("Compilation Failed:", stderr);
      return NextResponse.json({ success: false, message: 'Compilation failed!', output: stderr }, { status: 400 });
    }

    // 4. On success...
    console.log("Compilation Successful:", stdout);
    return NextResponse.json({ success: true, message: 'Code compiled successfully!', output: stdout });

  } catch (err) {
    console.error("Server Error in /api/compile:", err);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  } finally {
    // 5. Clean up the temporary directory in all cases
    if (tempDir) {
      try {
        await exec(`rm -rf ${tempDir}`);
      } catch (e) {
        console.error(`Failed to cleanup temp directory ${tempDir}`, e);
      }
    }
  }
}