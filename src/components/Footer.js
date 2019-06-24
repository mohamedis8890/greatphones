import React from "react";

export default function Footer() {
  return (
    <footer className="text-muted">
      <div className="container">
        <p className="float-right">
          <a href="/">Back to top</a>
        </p>
        <p>
          This site is fictional and all the information in it may not be real.
          This is merely a practice on React Framework.
        </p>
        <p>
          Made with Love by Mo Saleh,{" "}
          <a href="https://github.com/mohamedis8890">Visit my Github Repo</a> or
          contact me on{" "}
          <a href="https://www.linkedin.com/in/mohamed-mahmoud-294a9a110/">
            LinkedIn
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
