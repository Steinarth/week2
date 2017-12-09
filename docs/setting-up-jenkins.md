Setting up Jenkins on AWS
==========

* Create an EC2 instance, and create a security group that supports the following inbound rules:
  * HTTP, port 80, (select an appropriate source, not 0.0.0.0 unless you have no other option)
  * Custom TCP Rule, port 8080
  * SSH, port 22
* ssh into the EC2 machine, ssh -i my-ec2-key-pair.pem ec2-user@<EC2-INSTANCE-PUBLIC-IP-ADDRESS>
* Install Java 8
  * sudo yum install java-1.8.0
  * sudo yum remove java-1.7.0-openjdk
* Install jenkins
  * sudo yum update
  * sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo
  * sudo rpm --import http://pkg.jenkins-ci.org/redhat-stable/jenkins-ci.org.key
  * sudo yum install jenkins
  * sudo service jenkins start
  * sudo chkconfig jenkins on
* Install Docker
  * sudo yum install -y ecs-init
  * sudo gpasswd -a jenkins docker
  * sudo service docker start
  * sudo chkconfig docker on
* Install Git
  * sudo yum install git
* Create a key to log-in to github
  * sudo su -s /bin/bash jenkins
  * cd /var/lib/jenkins/
  * ssh-keygen
  * cat .ssh/id_rsa.pub
  * Copy the .pub key and add it to your github account (profile_pic --> settings --> SSH and GPG keys)
  * reboot the instance : sudo reboot
* Open your browser at: PUBLIC_DNS_NAME:8080
  * You should see the Jenkins front page
  * if you are not prompted to enter password and create a new account run sudo vim /var/lib/jenkins/config.xml and change <useSecurity>true</> to false, then reload the jenkins link and press login-in, then you should see (not correct credentials...) and press create new account.
* Configuring Jenkins
  * Manage Jenkins --> Setup security
  * Check Enable security
  * Check logged-in users can do anything
  * Save
* Create a Jenkins file in your projects root(github) called Jenkinsfile
* Create your first pipeline
  * create new item --> pick pipeline --> Configure
  * Set definition as Pipeline script from SCM, SCM: git
  * Add your repository url(ssh)
  * Create new credentials: Kind:SSH username with private key, Add github username, privateKey: From the jenkins master ~/.ssh
  * Save

For Jenkins to be able to pull the newest commit from github we need to set up Web-hooks that notify Jenkins when we have pushed to github: Good description of it here: https://medium.com/@marc_best/trigger-a-jenkins-build-from-a-github-push-b922468ef1ae
