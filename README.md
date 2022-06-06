# AmILaude GWA Verifier
- This repo holds the source code for the desktop application `AmILaude`
## Purpose
The application is a requirement for CMSC 128. The goal is to provide a GWA Verifier that SHAC members can utilize, especially new members who are unfamiliar with the computations. Given the substantial number of students being reviewed, it tries to speed up the verification process.


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


# Setting up a LAN Network for the application

### Note: The server should be running Windows 10 OS

1.	Open XAMPP Control Panel.
2.	Proceed to Apache -> Config -> httpd.conf <br />
	![image](https://user-images.githubusercontent.com/52350611/172166616-6da6746c-e69f-46d0-a177-135030f24eed.png)  <br />
3.  Search for `Listen 80`, then change the value to `Listen 8080` and in the above line kindly put the `IP address of the server pc` with the correct `port 8080`. <br />
  ![image](https://user-images.githubusercontent.com/52350611/172166762-811352a5-8d6e-4d7a-be40-4dc7ea14de12.png)  <br />
  **NOTE: In order to know your IP address, run Command Prompt and type ipconfig. The value indicated in the IPV4 address is your IP address.**
4.  Search for `ServerName localhost: 80` and change it to `ServerName <your.ip.address>:8080`
5.	Proceed to Apache -> Config -> httpd-xampp.conf <br />
    ![image](https://user-images.githubusercontent.com/52350611/172166964-14f3b154-d9e1-4d71-b8ec-c0e0acbb5dd2.png) <br />
6.	Search for <Directory “C:/xampp/phpMyAdmin”> then change the “Require local” to “Require all granted”. <br />
    ![image](https://user-images.githubusercontent.com/52350611/172167147-b4e7160b-c5bf-42db-864a-8071a4a57f83.png) <br />
7.	Go to Config -> Service and Port Settings then change the Apache port to 8080. <br />
	![image](https://user-images.githubusercontent.com/52350611/172167218-213df5ad-472d-4e73-baae-70b1aa537e69.png)  ![image](https://user-images.githubusercontent.com/52350611/172167236-c7528e3f-f9f2-4472-89ca-b8b78781d3ca.png) <br />
8.	Open the src folder of the application then open constant.js. Change `http://localhost/gwa-verifier-backend` to `http://<your.ip.address>:8080/gwa-verifier-backend.`
9.	Either `rebuild the executable file` or `fork the repository` to have a local copy for each machine. 
10.	Type in your command prompt console the commands: `npm install` and `npm start` to open the application.
11.	You should now be able to use the application, however, if you cannot still access or at least visit the `<your.ip.address:8080>` on another machine, please proceed with the next steps.
12.	Open Windows Firewall via Control Panel -> System and Security -> Windows Defender Firewall.
13.	Click Advanced Settings on the side navigation bar on the left.
14.	Press Inbound Rules on the side navigation bar on the left then press New Rule on the Actions section on the right.
15.	Select port then click Next. <br />
  ![image](https://user-images.githubusercontent.com/52350611/172167330-ff3b1afa-a35e-42f3-8e52-677524751b09.png) <br />
16.	Add the `port number: 8080` and click Next. <br />
  ![image](https://user-images.githubusercontent.com/52350611/172167368-6cd705c7-6912-4791-9e4d-86d59878d8e2.png) <br />
17.	Continue on clicking Next until you reach the name section where you will input the name of the rule. Click Finish. <br />
  ![image](https://user-images.githubusercontent.com/52350611/172167425-6ab34fd2-7b9d-47de-8f69-10fe3259a77b.png) <br />
18.	You can now access the server’s IP address.




