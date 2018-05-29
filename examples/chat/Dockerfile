# https://docs.docker.com/engine/examples/running_ssh_service/
FROM ubuntu:16.04

ENV workdir /root/chat
ENV devServerPort 3001
ENV serverPort 3000

RUN apt-get update && apt-get install -y openssh-server curl vim
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN mkdir /var/run/sshd
RUN echo 'root:root' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

# NOTE to edit files in host, do
# $ docker run -v "$PWD":/root/chat [other options...]
WORKDIR ${workdir}
ADD . ${workdir}

EXPOSE ${devServerPort}
EXPOSE ${serverPort}

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
