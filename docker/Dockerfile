FROM trion/ng-cli:9.1.6

MAINTAINER trion development GmbH "info@trion.de"
ARG CHROME_VERSION=<unset>

LABEL chrome=$CHROME_VERSION

USER root

COPY xvfb-chromium /usr/bin/xvfb-chromium
COPY xvfb-chromium-webgl /usr/bin/xvfb-chromium-webgl
COPY display-chromium /usr/bin/display-chromium

RUN apt-get update \
    && apt-get install -y \
      xvfb \
      libosmesa6 \
      libgconf-2-4 \
      wget \
 && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
 && (dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install; rm google-chrome-stable_current_amd64.deb; apt-get clean; rm -rf /var/lib/apt/lists/* ) \
 && mv /usr/bin/google-chrome /usr/bin/google-chrome.real  \
 && mv /opt/google/chrome/chrome /opt/google/chrome/google-chrome.real  \
 && rm /etc/alternatives/google-chrome \
 && ln -s /opt/google/chrome/google-chrome.real /etc/alternatives/google-chrome \
 && ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome \
 && ln -s /usr/bin/xvfb-chromium /usr/bin/chromium-browser \
 && ln -s /usr/lib/x86_64-linux-gnu/libOSMesa.so.6 /opt/google/chrome/libosmesa.so


USER $USER_ID
