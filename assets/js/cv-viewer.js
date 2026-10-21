/* Renders the CV PDF inside #cv-viewer with PDF.js (assets/pdfjs/), so it can be
   read and scrolled on any device, including phones that cannot show PDFs inline.
   Links inside the PDF (email, DOIs, etc.) stay clickable, and the +/- buttons zoom.
   If PDF.js is unavailable, it falls back to the browser's own PDF viewer. */
(function () {
  var box = document.getElementById('cv-viewer');
  if (!box) return;
  var src = box.getAttribute('data-src');
  var zoomBox = document.getElementById('cv-zoom');
  var zoomLabel = document.getElementById('cv-zoom-level');
  var ZOOMS = [1, 1.25, 1.5, 2, 2.5];
  var zoomIndex = 0;
  var pdfDoc = null;
  var renderedWidth = 0;
  var renderToken = 0;

  function fallback() {
    if (zoomBox) zoomBox.hidden = true;
    box.innerHTML = '';
    var frame = document.createElement('iframe');
    frame.src = src + '#view=FitH';
    frame.title = 'CV (PDF)';
    box.appendChild(frame);
  }

  if (!window.pdfjsLib) { fallback(); return; }
  pdfjsLib.GlobalWorkerOptions.workerSrc = box.getAttribute('data-worker');

  function addLinks(page, viewport, holder) {
    page.getAnnotations().then(function (annots) {
      annots.forEach(function (a) {
        if (a.subtype !== 'Link' || !a.url) return;
        var r = viewport.convertToViewportRectangle(a.rect);
        var link = document.createElement('a');
        link.href = a.url;
        if (!/^mailto:/i.test(a.url)) { link.target = '_blank'; link.rel = 'noopener'; }
        link.title = a.url.replace(/^mailto:/i, '');
        link.style.left = (Math.min(r[0], r[2]) / viewport.width * 100) + '%';
        link.style.top = (Math.min(r[1], r[3]) / viewport.height * 100) + '%';
        link.style.width = (Math.abs(r[2] - r[0]) / viewport.width * 100) + '%';
        link.style.height = (Math.abs(r[3] - r[1]) / viewport.height * 100) + '%';
        holder.appendChild(link);
      });
    });
  }

  function renderAll() {
    var token = ++renderToken;
    var style = getComputedStyle(box);
    var fitWidth = box.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    if (fitWidth <= 0) return Promise.resolve();
    renderedWidth = box.clientWidth;
    var zoom = ZOOMS[zoomIndex];
    var ratio = Math.min(window.devicePixelRatio || 1, 2.5);
    var keepTop = box.scrollHeight > 0 ? box.scrollTop / box.scrollHeight : 0;
    var jobs = [];
    for (var n = 1; n <= pdfDoc.numPages; n++) {
      jobs.push(pdfDoc.getPage(n).then(function (page) {
        var base = page.getViewport({ scale: 1 });
        var cssWidth = Math.floor(fitWidth * zoom);
        var viewport = page.getViewport({ scale: (cssWidth / base.width) * ratio });
        var holder = document.createElement('div');
        holder.className = 'cv-page';
        holder.style.width = cssWidth + 'px';
        var canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.setAttribute('aria-hidden', 'true');
        holder.appendChild(canvas);
        addLinks(page, viewport, holder);
        return page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport })
          .promise.then(function () { return holder; });
      }));
    }
    return Promise.all(jobs).then(function (holders) {
      if (token !== renderToken) return;   // a newer render has started
      var frag = document.createDocumentFragment();
      holders.forEach(function (h) { frag.appendChild(h); });
      box.innerHTML = '';
      box.appendChild(frag);
      box.scrollTop = keepTop * box.scrollHeight;
      if (zoomLabel) zoomLabel.textContent = Math.round(zoom * 100) + '%';
    });
  }

  function setZoom(step) {
    var next = Math.max(0, Math.min(ZOOMS.length - 1, zoomIndex + step));
    if (next === zoomIndex || !pdfDoc) return;
    zoomIndex = next;
    renderAll();
  }

  var zin = document.getElementById('cv-zoom-in');
  var zout = document.getElementById('cv-zoom-out');
  if (zin) zin.addEventListener('click', function () { setZoom(1); });
  if (zout) zout.addEventListener('click', function () { setZoom(-1); });

  pdfjsLib.getDocument(src).promise.then(function (doc) {
    pdfDoc = doc;
    if (zoomBox) zoomBox.hidden = false;
    return renderAll();
  }).catch(fallback);

  var timer = null;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (pdfDoc && Math.abs(box.clientWidth - renderedWidth) > 40) renderAll();
    }, 250);
  });
})();
