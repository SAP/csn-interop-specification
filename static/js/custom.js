/* global window document location */
/* eslint-disable no-console */
// Little script to highlight the links and definitions that were navigated to
window.addEventListener(
  "DOMContentLoaded",
  () => {
    locationHashChanged();
    console.debug("Loaded");
  },
  false,
);
window.addEventListener("hashchange", locationHashChanged, false);
function locationHashChanged() {
  document.querySelectorAll(".highlight").forEach((dfn) => {
    dfn.classList.remove("highlight");
  });
  const highlightedElementId = location.hash.split("#")[1];
  console.debug("highlighting", highlightedElementId);
  const highlightedElement = document.getElementById(highlightedElementId);
  if (highlightedElement) {
    highlightedElement.classList.add("highlight");
    if (highlightedElement.getElementsByTagName("a")[0]) {
      addAnchorTitle(highlightedElement.getElementsByTagName("a")[0].title);
    } else {
      addAnchorTitle(highlightedElement.textContent);
    }
  }
}

function addAnchorTitle(anchorTitle) {
  const split = document.title.split(" | ");
  anchorTitle = anchorTitle.replace("Direct link to ", "");
  document.title = `${anchorTitle} | ${split[split.length - 1]} | ${split[split.length - 2]}`;
}
