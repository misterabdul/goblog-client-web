import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  const helpers = new Helpers();

  renderer.paragraph = (text: string): string => {
    return '<p class="md-p">' + text + '</p>\n';
  };

  renderer.heading = (
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    raw: string,
    slugger: marked.Slugger
  ): string => {
    if (renderer.options.headerIds) {
      return (
        '<h' +
        level +
        ' class="md-h' +
        level +
        '" ' +
        ' id="' +
        renderer.options.headerPrefix +
        slugger.slug(raw) +
        '">' +
        text +
        '</h' +
        level +
        '>\n'
      );
    }

    // ignore IDs
    return '<h' + level + '>' + text + '</h' + level + '>\n';
  };

  renderer.image = (
    href: string | null,
    title: string | null,
    text: string | null
  ): string => {
    href = helpers.cleanUrl(
      renderer.options.sanitize,
      renderer.options.baseUrl,
      href
    );
    if (href === null) return text ?? '';

    let out = '<img class="md-img" src="' + href + '" alt="' + text + '"';
    if (title) out += ' title="' + title + '"';
    out += renderer.options.xhtml ? '/>' : '>';

    return out;
  };

  renderer.checkbox = (checked: boolean): string => {
    return (
      '<span class="material-icons md-checkbox-icon">' +
      (checked ? 'check_box' : 'check_box_outline_blank') +
      '</span> '
    );
  };

  renderer.list = (body: string, ordered: boolean, start: number): string => {
    const type = ordered ? 'ol' : 'ul',
      startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
    return (
      '<' + type + startatt + ' class="md-list">\n' + body + '</' + type + '>\n'
    );
  };

  renderer.listitem = (text: string): string => {
    return '<li class="md-list-item">' + text + '</li>\n';
  };

  renderer.table = (header: string, body: string): string => {
    if (body) body = '<tbody>' + body + '</tbody>';

    return (
      '<div class="md-table-container">' +
      '<table>\n' +
      '<thead>\n' +
      header +
      '</thead>\n' +
      body +
      '</table>' +
      '</div>\n'
    );
  };

  renderer.tablecell = (
    content: string,
    flags: { header: boolean; align: 'center' | 'left' | 'right' | null }
  ): string => {
    const type = flags.header ? 'th' : 'td';
    const tag = flags.align
      ? '<' + type + ' class="md-table-cell" align="' + flags.align + '">'
      : '<' + type + ' class="md-table-cell">';
    return tag + content + '</' + type + '>\n';
  };

  renderer.code = (
    code: string,
    infostring: string | undefined,
    escaped: boolean
  ): string => {
    const match = (infostring ?? '').match(/\S*/);
    const lang = match ? match[0] : '';
    if (renderer.options.highlight) {
      const out = renderer.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    code = code.replace(/\n$/, '') + '\n';

    if (!lang) {
      return (
        '<pre class="md-pre"><code>' +
        (escaped ? code : helpers.escape(code, true)) +
        '</code></pre>\n'
      );
    }

    return (
      '<pre class="md-pre"><code class="' +
      renderer.options.langPrefix +
      helpers.escape(lang, true) +
      '">' +
      (escaped ? code : helpers.escape(code, true)) +
      '</code></pre>\n'
    );
  };

  return {
    renderer: renderer,
  };
}

class Helpers {
  private nonWordAndColonTest = /[^\w:]/g;
  private originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

  public cleanUrl(
    sanitize: boolean | undefined,
    base: string | undefined,
    href: string | null
  ) {
    if (sanitize) {
      let prot;
      try {
        if (href === null) throw new Error('href is null');
        prot = decodeURIComponent(unescape(href))
          .replace(this.nonWordAndColonTest, '')
          .toLowerCase();
      } catch (e) {
        return null;
      }
      if (
        prot.indexOf('javascript:') === 0 ||
        prot.indexOf('vbscript:') === 0 ||
        prot.indexOf('data:') === 0
      ) {
        return null;
      }
    }
    if (base && !this.originIndependentUrl.test(href ?? '')) {
      href = this.resolveUrl(base, href);
    }
    try {
      href = encodeURI(href ?? '').replace(/%25/g, '%');
    } catch (e) {
      return null;
    }
    return href;
  }

  private baseUrls = {} as { [index: string]: string };
  private justDomain = /^[^:]+:\/*[^/]*$/;
  private protocol = /^([^:]+:)[\s\S]*$/;
  private domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

  public resolveUrl(base: string | undefined, href: string | null) {
    if (!this.baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (this.justDomain.test(base ?? '')) {
        this.baseUrls[' ' + base] = base + '/';
      } else {
        this.baseUrls[' ' + base] = this.rtrim(base ?? '', '/', true);
      }
    }
    base = this.baseUrls[' ' + base];
    const relativeBase = base.indexOf(':') === -1;

    if (href?.substring(0, 2) === '//') {
      if (relativeBase) {
        return href;
      }
      return base.replace(this.protocol, '$1') + href;
    } else if (href?.charAt(0) === '/') {
      if (relativeBase) {
        return href;
      }
      return base.replace(this.domain, '$1') + href;
    } else {
      return base + href;
    }
  }

  // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
  // /c*$/ is vulnerable to REDOS.
  // invert: Remove suffix of non-c chars instead. Default falsey.
  public rtrim(str: string, c: string, invert: boolean) {
    const l = str.length;
    if (l === 0) {
      return '';
    }

    // Length of suffix matching the invert condition.
    let suffLen = 0;

    // Step left until we fail to match the invert condition.
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }

    return str.substr(0, l - suffLen);
  }

  private escapeTest = /[&<>"']/;
  private escapeReplace = /[&<>"']/g;
  private escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  private escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  private escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  } as { [index: string]: string };

  private getEscapeReplacement = (ch: string): string =>
    this.escapeReplacements[ch];

  public escape(html: string, encode: boolean): string {
    if (encode) {
      if (this.escapeTest.test(html)) {
        return html.replace(this.escapeReplace, this.getEscapeReplacement);
      }
    } else {
      if (this.escapeTestNoEncode.test(html)) {
        return html.replace(
          this.escapeReplaceNoEncode,
          this.getEscapeReplacement
        );
      }
    }

    return html;
  }
}
