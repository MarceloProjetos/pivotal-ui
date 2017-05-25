ADD pivotal-ui/library/package.json /opt/pivotal-ui/library/package.json
RUN cd /opt/pivotal-ui/library && yarn
RUN /opt/pivotal-ui/library && gulp build

ADD pivotal-ui/styleguide/package.json /opt/pivotal-ui/styleguide/package.json
RUN cd /opt/pivotal-ui/styleguide && yarn

ADD pivotal-ui/styleguide_new/package.json /opt/pivotal-ui/styleguide_new/package.json
RUN /opt/pivotal-ui/styleguide_new && yarn install