// src/app/api/compile/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { writeFile, mkdtemp, mkdir } from 'fs/promises';
import path from 'path';
import os from 'os';

// This is the local execution helper function. It will only be used in development.
function runLocalCliCommand(command: string): Promise<{ stdout: string; stderr:string; error: Error | null }> {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({ stdout, stderr, error });
    });
  });
}

// The main handler function for the POST request
export async function POST(request: Request) {
  // --- ENVIRONMENT SWITCH ---
  // This is the core of the new logic. We check if the code is running in production.
  if (process.env.NODE_ENV === 'production') {
    // --- PRODUCTION LOGIC (for Vercel) ---
    console.log("Running in PRODUCTION mode. Forwarding to worker...");
    
    try {
      const { code } = await request.json();
      const workerUrl = process.env.COMPILATION_WORKER_URL;

      if (!workerUrl) {
        console.error("CRITICAL ERROR: COMPILATION_WORKER_URL env var is not set for production.");
        return NextResponse.json({ error: 'Compilation service is not configured.' }, { status: 500 });
      }
      
      const responseFromWorker = await fetch(`${workerUrl}/compile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      
      const result = await responseFromWorker.json();
      return NextResponse.json(result, { status: responseFromWorker.status });

    } catch (error) {
      console.error("Error forwarding request to compilation worker:", error);
      return NextResponse.json({ error: 'Failed to contact compilation service.' }, { status: 500 });
    }

  } else {
    // --- DEVELOPMENT LOGIC (for your local machine) ---
    console.log("Running in DEVELOPMENT mode. Using local arduino-cli...");

    let tempDir: string | null = null;
    try {
      const { code } = await request.json();
      if (!code) {
        return NextResponse.json({ error: 'No code provided.' }, { status: 400 });
      }

      tempDir = await mkdtemp(path.join(os.tmpdir(), 'arduino-build-'));
      const sketchName = 'temp_sketch';
      const sketchDir = path.join(tempDir, sketchName);
      const sketchPath = path.join(sketchDir, `${sketchName}.ino`);

      await mkdir(sketchDir, { recursive: true });
      await writeFile(sketchPath, code);

      const fqbn = 'esp32:esp32:esp32'; // Make sure this is your correct local board FQBN
      const cliPath = 'arduino-cli'; // Assuming it's in your system's PATH
      const compileCommand = `${cliPath} compile --fqbn ${fqbn} ${sketchDir}`;
      
      const { stdout, stderr, error } = await runLocalCliCommand(compileCommand);
      
      if (error) {
        console.error(`Local CLI Execution Error:`, error);
        return NextResponse.json({ success: false, message: `Server execution error: ${error.message}` }, { status: 500 });
      }
      
      if (stderr) {
        console.error("Local Compilation Failed:", stderr);
        return NextResponse.json({ success: false, message: 'Compilation failed!', output: stderr }, { status: 400 });
      }

      console.log("Local Compilation Successful:", stdout);
      return NextResponse.json({ success: true, message: 'Code compiled successfully!', output: stdout });

    } catch (err) {
      console.error("Server Error during local compilation:", err);
      return NextResponse.json({ error: 'An internal server error occurred locally.' }, { status: 500 });
    } finally {
      if (tempDir) {
        try {
          // Use a platform-agnostic cleanup command for better compatibility
          const cleanupCommand = os.platform() === 'win32' ? `rmdir /s /q "${tempDir}"` : `rm -rf "${tempDir}"`;
          exec(cleanupCommand);
        } catch (e) {
          console.error(`Failed to cleanup temp directory ${tempDir}`, e);
        }
      }
    }
  }
}