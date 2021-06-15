function addLink() {
  let body_element = document.getElementsByTagName('body')[0];
  let selection;
  selection = window.getSelection();
  let source = document.location.pathname.substring(3, 0)==='/ru' ? ' Источник: ' : ' Source: '
  let pagelink = `<br><br>${source}<a href="${document.location.href}">fairspin.info</a><br><br>`;
  let copytext = selection + pagelink;
  let newdiv = document.createElement('div');
  newdiv.style.position = 'absolute';
  newdiv.style.left = '-99999px';
  body_element.appendChild(newdiv);
  newdiv.innerHTML = copytext;
  selection.selectAllChildren(newdiv);
  window.setTimeout(function () {
    body_element.removeChild(newdiv);
  }, 0);
}
document.oncopy = addLink;
