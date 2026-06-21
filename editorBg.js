class BgColorTool {
  constructor({ api, config }) {
    this.api = api;
    this.config = config || {};
    this.tag = 'SPAN';
    this.class = 'bg-color-tool';

    this.colors = this.config.colors || [
      { color: '#FFFF00', label: 'Yellow' },
      { color: '#90EE90', label: 'Green' },
      { color: '#ADD8E6', label: 'Blue' },
      { color: '#FFB6C1', label: 'Pink' },
      { color: '#FFA500', label: 'Orange' },
      { color: '#E6E6FA', label: 'Lavender' },
      { color: '#ffffff', label: 'White' },
      { color: 'transparent', label: 'None' },
    ];

    this.button = null;
    this.activeDropdown = null;
    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('bg-color-tool-styles')) return;
    const style = document.createElement('style');
    style.id = 'bg-color-tool-styles';
    style.textContent = `
      .bg-color-dropdown {
        position: fixed;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        padding: 8px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        width: 140px;
      }
      .bg-color-swatch {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        cursor: pointer;
        border: 2px solid #ccc;
        transition: transform 0.1s;
      }
      .bg-color-swatch:hover {
        transform: scale(1.2);
        border-color: #999;
      }
    `;
    document.head.appendChild(style);
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="15" width="18" height="4" rx="1" fill="currentColor" opacity="0.4"/>
      <path d="M12 3L6 13h12L12 3z" fill="currentColor"/>
    </svg>`;
    this.button.classList.add('ce-inline-tool');
    this.button.title = 'Background Color';
    return this.button;
  }

  surround(range) {
    this.showDropdown(range);
  }

  showDropdown(range) {
    if (this.activeDropdown) {
      this.activeDropdown.remove();
      this.activeDropdown = null;
    }

    if (!window.getSelection().toString()) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'bg-color-dropdown';

    const rect = this.button.getBoundingClientRect();
    dropdown.style.left = rect.left + 'px';
    dropdown.style.top = rect.bottom + 8 + 'px';

    this.colors.forEach(({ color, label }) => {
      const swatch = document.createElement('div');
      swatch.className = 'bg-color-swatch';
      swatch.style.backgroundColor = color;
      swatch.title = label;

      swatch.addEventListener('click', () => {
        this.applyColor(range, color);
        dropdown.remove();
        this.activeDropdown = null;
      });

      dropdown.appendChild(swatch);
    });

    document.body.appendChild(dropdown);
    this.activeDropdown = dropdown;

    setTimeout(() => {
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== this.button) {
          dropdown.remove();
          this.activeDropdown = null;
        }
      }, { once: true });
    }, 100);
  }

  applyColor(range, color) {
    const contents = range.extractContents();
    if (!contents.textContent.length) return;

    // remove existing bg color spans
    contents.querySelectorAll('span.bg-color-tool').forEach(span => {
      span.style.backgroundColor = '';
      span.classList.remove(this.class);
    });

    const span = document.createElement(this.tag);
    span.classList.add(this.class);
    if (color !== 'transparent') span.style.backgroundColor = color;
    span.appendChild(contents);
    range.insertNode(span);

    const sel = window.getSelection();
    sel.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(span);
    newRange.collapse(true);
    sel.addRange(newRange);
  }

  checkState(selection) {
    const node = selection.anchorNode;
    if (!node) return false;
    const parent = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
    return !!parent.closest('span.bg-color-tool');
  }

  static get isInline() { return true; }
  static get shortcut() { return 'CMD+SHIFT+B'; }
  static get sanitize() {
    return { span: { class: 'bg-color-tool', style: true } };
  }

  destroy() { this.activeDropdown?.remove(); }
}

export default BgColorTool;