---
---

// ^ that up there is frontmatter tags so that Jekyll will process this file and
// replace {{ site.baseurl }} correctly. Without the frontmatter tags, Jekyll
// copies the file unedited.

const addHeadingLinks = () => {
  const ids = new Set();

  const slugify = (str) => {
    let idx = "";
    let slug = str.toLowerCase().replace(/[^a-z0-9]/gi, "-");

    let id = `${slug}${idx ? "-" : ""}${idx}`;

    while (ids.has(id)) {
      idx = idx ? idx + 1 : 1;
      id = `${slug}${idx ? "-" : ""}${idx}`;
    }

    ids.add(id);

    return id;
  };

  const headings = document.querySelectorAll(
    "main h1, main h2, main h3, main h4, main h5, main h6"
  );
  for (const heading of headings) {
    if (!heading.id) {
      heading.id = slugify(heading.innerText);
    }

    heading.innerHTML = `${heading.innerText} <a href="#${heading.id}" aria-hidden="true" tabindex="-1" class="usa-link heading-link--symbol">#</a>`;
  }
};

const markExternalLinks = () => {
  const externalLinkIcon = document.createElement("img");
  externalLinkIcon.setAttribute(
    "src",
    `{{ site.baseurl }}/assets/uswds/img/usa-icons/launch.svg`
  );
  externalLinkIcon.setAttribute("alt", "(external link)");
  externalLinkIcon.setAttribute("style", "width: 1rem;");

  Array.from(document.querySelectorAll("main a[href]"))
    .filter((a) => {
      const href = a.getAttribute("href");
      return (
        !href.startsWith(window.location.origin) &&
        !/^[/#]/.test(a.getAttribute("href"))
      );
    })
    .forEach((a) => a.appendChild(externalLinkIcon.cloneNode()));
};

const configurePrivateEye = () => {
  PrivateEye({
    defaultMessage: "This link is private to GSA.",
    ignoreUrls: [
      "gsa-tts.slack.com",
      "anywhere.gsa.gov",
      "bookit.gsa.gov",
      "calendar.gsa.gov",
      "connect.gsa.gov",
      "docs.google.com",
      "drive.google.com",
      "ea.gsa.gov",
      "email.gsa.gov",
      "gcims.gsa.gov",
      "github.com/18F/Accessibility_Reviews",
      "github.com/18F/blog-drafts",
      "github.com/18F/codereviews",
      "github.com/18F/DevOps",
      "github.com/18F/Infrastructure",
      "github.com/18F/security-incidents",
      "github.com/18F/staffing-and-resources",
      "github.com/18F/team-api.18f.gov",
      "github.com/18F/writing-lab",
      "gkey.gsa.gov",
      "gsa-tts.slack.com",
      "gsa.my.salesforce.com",
      "gsaolu.gsa.gov",
      "hrprod.hr.gsa.gov",
      "insite.gsa.gov",
      "mail.gsa.gov",
      "meet.gsa.gov",
      "pages-internal.18f.gov",
      "tock.18f.gov",
    ],
  });
};

document.addEventListener(
  "DOMContentLoaded",
  function () {
    configurePrivateEye();
    addHeadingLinks();
    markExternalLinks();
  },
  false
);
