"""
Medcare Hospital Management System - Combined Dev Runner
Starts Django REST Backend (port 8000) and Vite React Frontend (port 5173).
"""

import subprocess
import sys
import os
import time

def main():
    root = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root, "backend")
    frontend_dir = os.path.join(root, "frontend")

    print("=" * 60)
    print("🏥  MEDCARE HOSPITAL MANAGEMENT SYSTEM WITH AI CHATBOT")
    print("=" * 60)
    print("Starting Django Backend on http://127.0.0.1:8000 ...")

    # Start Django
    backend_proc = subprocess.Popen(
        [sys.executable, "manage.py", "runserver", "0.0.0.0:8000"],
        cwd=backend_dir
    )

    time.sleep(2)

    print("Starting React Frontend on http://localhost:5173 ...")
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=frontend_dir
    )

    print("\n✓ Both services are up!")
    print("  • Frontend UI: http://localhost:5173")
    print("  • Backend API: http://127.0.0.1:8000/api/")
    print("  • Admin Panel: http://127.0.0.1:8000/admin/")
    print("\nPress Ctrl+C to terminate both servers.")

    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\nStopping servers...")
        backend_proc.terminate()
        frontend_proc.terminate()

if __name__ == "__main__":
    main()
