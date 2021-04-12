# nodejs_forge_sample


## Prerequiriments

* NodeJS installed. Instructions [HERE](https://nodejs.org/en/)
* HAPROXY installed. Instructions [HERE](http://www.haproxy.org/)
* [Autodesk Forge App](https://forge.autodesk.com/) Created. Instructions [HERE](https://forge.autodesk.com/)



## 1. Clone the project from terminal

```bash
git clone https://github.com/roger10cassares/nodejs_forge_sample.git
```

OR

Download the project `nodejs_forge_sample-master.zip` and rename the folder to match nodejs_forge_sample name. Here bellow is the example from terminal:

```bash
unzip nodejs_forge_sample-master.zip
mv nodejs_forge_sample-master.zip nodejs_forge_sample
```



## 2. Go to the Top Level Directory

Go to the top leval directory of this project and run the command to open Visual Studio Code from the terminal:

```bash
cd nodejs_forge_sample
code .
```



## 3. Create .env File

Create an .env file with the following credentials preview created and located at your [Autodesk Forge App](https://forge.autodesk.com/) at https://forge.autodesk.com/myapps/ web address.

* App information (Created on 11 Apr 2021)
* Basic information about your app.

* Client ID:YOUR_CLIENT_ID_HERE
* Client Secret: YOUR_CLIENT_SECRET_HERE

* App Name: YOUR_APP_NAME_HERE
* Description: YOUR_DESCRIPTION_HERE

* CallBack URL:http://localhost/bim/api/forge/callback/oauth


```bash
nano .env
```
The .env file must match the information described above from [Autodesk Forge App](https://forge.autodesk.com/) at https://forge.autodesk.com/myapps/.

`.env`

```env
  FORGE_CLIENT_ID=YOUR_CLIENT_ID_HERE
  FORGE_CLIENT_SECRET=YOUR_CLIENT_secret_HERE
  FORGE_CALLBACK_URL=http://localhost/bim/api/forge/callback/oauth
```



## 4. Set HAPROXY Configuration

Set the HAPROXY configuration for proxy the subpath `/bim` entry point address of this application.

Open `/etc/haproxy/haproxy.cfg` 

```bash
sudo nano /etc/haproxy/haproxy.cfg
```

Then, add the following lines:

```bash
use_backend localhost_bim if { hdr(host) -i localhost } { path -i -m beg /bim }

backend localhost_bim
    server server_localhost_bim localhost:3000/bim
```

Save and close the file with Ctrl^O, ENTER, Ctrl^X, then restart the HAPROXY Service:

```bash
sudo systemctl restart haproxy.service
```

The correspondig haproxy.cfg was provided at examples/haproxy/haproxy.cfg file.



## 5. Install the App Dependencies

Install node dependencies from `package.json` with the following command:

```bash
yarn
```



## 6. Run the nodejs App

```bash
yarn start
```



## 7. Access the nodejs App

Open the application accessing http://localhost/bim.