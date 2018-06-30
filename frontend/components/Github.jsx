import React from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export const GithubIcon = () => (
  <Icon>
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="white">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  </Icon>
);

export const GithubLink = (props) => (
  <a
    href={REPOSITORY_HOME}
    {...props}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Tooltip title="See github page">
      <IconButton variant="fab" component="span">
        <GithubIcon />
      </IconButton>
    </Tooltip>
  </a>
);

export const GithubRibbon = () => (
  <a href={REPOSITORY_HOME}>
    <img
      style={{ position: "absolute", top: 0, right: 0, border: 0 }}
      src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
      alt="Fork me on GitHub"
    />
  </a>
);
