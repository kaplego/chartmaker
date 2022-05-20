class SelectMenu extends HTMLElement {
    constructor() {
        super();

        const _this = this;
        const iconRegex = /^<i class="fa(s|r|l|t|b) fa-[a-z0-9-]+"><\/i> ?/i;
        const nonCaptureIconRegex = /(?<=<i class="fa(s|r|l|t|b) fa-)[a-z0-9-]+(?<!"><\/i>)/i;
        (async() => {
            await sleep(1);

            const selectBtn = _this.querySelector(".select-btn"),
                options = _this.querySelectorAll(".option:not(.text)"),
                placeholder = _this.querySelector(".placeholder");

            (function() {
                let selectedopts = _this.querySelectorAll('.option[data-selected]');
                for (var opt of selectedopts) {
                    if (opt.getAttribute("data-selected") !== "false") {
                        if (placeholder.classList.contains("placeholder")) placeholder.classList.remove("placeholder");
                        placeholder.innerHTML = opt.innerHTML;
                        _this.selected = [...options].findIndex(e => (e.hasAttribute('data-value') && opt.hasAttribute('data-value') && e.getAttribute('data-value') === opt.getAttribute('data-value')) || (e.innerHTML === opt.innerHTML));
                        break;
                    }
                }
            })();

            selectBtn.addEventListener("click", () => {
                _this.classList.toggle("active");
            });

            options.forEach((option, i) => {
                option.addEventListener("click", () => {
                    if (option.hasAttribute("data-disabled") && option.getAttribute("data-disabled") !== "false") return;
                    if (placeholder.classList.contains("placeholder")) placeholder.classList.remove("placeholder");

                    const old = options[_this.selected];
                    let similar = (old.hasAttribute('data-value') && option.hasAttribute('data-value') && old.getAttribute('data-value') === option.getAttribute('data-value')) || (_this.selected === i);

                    var oldInner = old.innerHTML.replace(/\n */g, '');
                    var newInner = option.innerHTML.replace(/\n */g, '');

                    var detail = {
                        changed: !similar
                    };

                    if (similar === true)
                    {
                        detail.option = {
                            value: option.hasAttribute('data-value') ? option.getAttribute('data-value') : null,
                            text: newInner.replace(iconRegex, ''),
                            icon: nonCaptureIconRegex.test(newInner) ? newInner.match(nonCaptureIconRegex)[0] : null,
                            index: i
                        };
                    }
                    else
                    {
                        detail.old = {
                            value: old.hasAttribute('data-value') ? old.getAttribute('data-value') : null,
                            text: oldInner.replace(iconRegex, ''),
                            icon: nonCaptureIconRegex.test(oldInner) ? oldInner.match(nonCaptureIconRegex)[0] : null,
                            index: _this.selected
                        };
                        detail.new = {
                            value: option.hasAttribute('data-value') ? option.getAttribute('data-value') : null,
                            text: newInner.replace(iconRegex, ''),
                            icon: nonCaptureIconRegex.test(newInner) ? newInner.match(nonCaptureIconRegex)[0] : null,
                            index: i
                        };
                    }

                    _this.dispatchEvent(new CustomEvent("change", {
                        cancelable: false,
                        detail: detail
                    }));

                    if (similar === false) {
                        _this.selected = i;
                        placeholder.innerHTML = option.innerHTML;
                    }

                    _this.classList.remove("active");
                });
            });

            window.addEventListener("click", (event) => {
                if (_this.contains(event.target)) return;
                else _this.classList.remove("active");
            });
        })();
    }

    /**
     * @private
     * @type {number}
     */
    selected = -1;
}

customElements.define("select-menu", SelectMenu);