window.addEventListener("load", () => {
    /** @type {import("./ctypes").ChartConfiguration} */
    var code = defaults.line;

    var chart = updateCode(code);

    document.getElementById("chart-type").addEventListener("change",
        /** @param {Event & {detail: {old: {value: string|null, text: string, icon: string|null, index: number}, new: {value: string|null, text: string, icon: string|null, index: number}, changed: boolean}}} e */
        (e) => {
            if (e.detail.changed === true)
                var opt = e.detail.new;
            else
                return;

            if (opt.value && opt.value == "line") {
                code = defaults.line;
            }
        }
    );
    document.getElementById("addlabel").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        /** @type {HTMLInputElement} */
        var inp = document.getElementById("addlabelname");

        if (inp.value !== "" && !code.data.labels.includes(inp.value)) {
            code.data.labels.push(inp.value);
            code.data.datasets.forEach(d => {
                d.data.push(inp.value === "aab" ? 1 : 0);
            });

            var element = document.createElement("div");
            element.classList.add("label");
            element.id = `entry-${inp.value.toLowerCase().replace(" ", "-").replace(/[^A-Za-z0-9-]/ig, '')}`;
            element.innerHTML = `<span class="name">${inp.value}</span><button class="removelabel">Remove</button>`;

            element.querySelector("button.removelabel").addEventListener("click", (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();

                if (confirm("Are you sure to delete this label ?")) {
                    /** @type {HTMLDivElement} */
                    var target = e.target;
                    const name = target.parentElement.querySelector("span.name").innerText;

                    const i = code.data.labels.findIndex(l => l === name);

                    code.data.labels.splice(i, 1);
                    code.data.datasets.forEach(d => {
                        d.data.splice(i, 1);
                    });

                    target.parentElement.remove();
                }
            });

            document.getElementById("data").appendChild(element);

            inp.value = "";
        }
    });

    document.getElementById("update").addEventListener("click", async(e) => {
        e.preventDefault();
        chart = updateCode(code, chart);
    })
});