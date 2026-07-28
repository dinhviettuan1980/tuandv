(function () {
  var COOKIE_NAME = 'tdv_identity';

  function readCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  var raw = readCookie(COOKIE_NAME);
  if (!raw) return;

  var identity;
  try {
    identity = JSON.parse(raw);
  } catch (e) {
    return;
  }
  if (!identity || !identity.name) return;

  var style = document.createElement('style');
  style.textContent =
    '#tdv-ecosystem-badge{position:fixed;left:14px;bottom:14px;z-index:2147483647;' +
    'display:flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;border-radius:999px;' +
    'background:#171a21;border:1px solid #262b35;color:#e8eaed;' +
    'font:13px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;' +
    'box-shadow:0 6px 18px rgba(0,0,0,.35);text-decoration:none;}' +
    '#tdv-ecosystem-badge:hover{border-color:#5eb594}' +
    '#tdv-ecosystem-badge img{width:22px;height:22px;border-radius:50%;object-fit:cover}' +
    '#tdv-ecosystem-badge .tdv-initial{width:22px;height:22px;border-radius:50%;background:#5eb594;' +
    'color:#0f1115;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px}';
  document.head.appendChild(style);

  var badge = document.createElement('a');
  badge.id = 'tdv-ecosystem-badge';
  badge.href = 'https://tuandv.id.vn/';
  badge.title = 'Từ hệ sinh thái tuandv.id.vn';

  if (identity.avatar) {
    var img = document.createElement('img');
    img.src = identity.avatar;
    img.alt = '';
    badge.appendChild(img);
  } else {
    var initial = document.createElement('span');
    initial.className = 'tdv-initial';
    initial.textContent = identity.name.trim().charAt(0).toUpperCase();
    badge.appendChild(initial);
  }

  var nameEl = document.createElement('span');
  nameEl.textContent = identity.name;
  badge.appendChild(nameEl);

  document.body.appendChild(badge);
})();
