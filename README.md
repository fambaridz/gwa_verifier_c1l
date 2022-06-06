# Amilaude App
- This repo holds the source code for the desktop application `Amilaude`

# Building the App
### On windows:
Prerequisite: 
1. Please install [https://wixtoolset.org/](https://wixtoolset.org/)
2. After installing wix-toolset, update your PC's PATH variables by adding "C:\Program Files (x86)\WiX Toolset v3.11\bin" to your `path`. Kindly google how to update your path variable
3. After updating your path variable, kindly restart your pc
4. After restarting your pc, install all dependencies by running `npm install` inside the `gwa-verifier-app` directory
5. After that, run `npm run make` to create the .msi file
6. Navigate to output inside gwa-verifier-app/out/make/wix/x64 in your Explorer.exe app (the file navigation app inside windows) and install the application (just run the gwa-verifier-app.msi). The installation should be automatic.
7. After installing, run the app by opening your start menu and look for it

### On linux
1. Run `npm install` and run `npm run make`
2. Find the .deb file inside gwa-verifier-app/out/make/
3. Install the .deb file by running `sudo dpkg -i <filename>.dkpg`