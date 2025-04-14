**Documentation:**

**Output:**

This website generates the results of calculation operations in Json format.

**Steps:**

Firstly, download git from the official git website "https://git-scm.com/" and comfirm the download by checking its version.

Now, pull the code from the previous week repository "https://github.com/vivekolladapu/sit737-2025-prac5p". 

Now, create a folder called kubernetes-configs and create deployment.yaml file and service.yaml in it.

The project structure should as mentioned below:

sit737-2025-prac6p |-- kubernetes-configs ||--(deployment.yaml) ||--(service.yaml) |--node_modules |--logs | |--(combined.log) | |--(error.log) |--server.js |-Dockerfile |--docker-compose.yml |--package.json |--package-lock.json |--README.md

Build by using docker compose and test the working of calculation operations in the website.

Push the image to the docker hub.

Now, test the current context by using "kubectl config current-context", if it not showing "docker-desktop", then change it to "docker-desktop" by using "kubectl config use-context docker-desktop".

Now, create the deployment.yaml and service.yaml to deploy the node.js application to the Kubernetes cluster by using "kubectl apply -f kubernetes-configs/".

After creating, check the pods by using "kubectl get pods" and list all the services by using "kubectl get svc".

Now, forward the port to access the application.

Now, test the application in the browser by performing all the operations.

Now create a public repository in git "sit737-2025-prac6p", and clone the repository.

Now, add all the changes by using "git add .".

After adding, commit all the changes by using "git commit -m"initial commit"".

Now, push the code by using "git push".



