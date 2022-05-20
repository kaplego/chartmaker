window.addEventListener("load", () => {
    /** @type {import("./ctypes").ChartConfiguration} */
    var code = defaults.line;

    var datasets = 0;

    var chart = updateCode(code);

    const table = document.getElementById("data");

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
    document.getElementById("addlabel").addEventListener("click", addLabel);
    document.getElementById("addlabelname").addEventListener("keydown", (e) => {
        if (e.code === "Enter")
            addLabel(e);
    });

    document.getElementById("addds").addEventListener("click", addDataset);
    document.getElementById("adddsname").addEventListener("keydown", (e) => {
        if (e.code === "Enter")
            addDataset(e);
    });

    code.data.datasets.forEach(ds => addDataset(null, ds));

    function addLabel(e = null) {
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        /** @type {HTMLInputElement} */
        var inp = document.getElementById("addlabelname");
        var name = inp.innerText;

        if (code.data.labels.includes(name)) return;
        code.data.labels.push(name);

        var row = document.createElement("tr");
        row.id = "labelrow-" + name;
        var element = document.createElement("td");
        element.classList.add("label", "editable-cell");
        element.id = `entry-${name.toLowerCase().replace(" ", "-").replace(/[^A-Za-z0-9-]/ig, '')}`;
        element.innerHTML = `<div role="textbox" contenteditable spellcheck="false">${name}</div><button class="edit">Remove</button><div class="loading hide"><i class="fas fa-loader fa-spin"></i></div>`;

        element.querySelector("button.edit").addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (confirm("Are you sure to delete this label ?")) {
                /** @type {HTMLDivElement} */
                var target = e.target;
                const name = target.previousElementSibling.innerText;

                const i = code.data.labels.findIndex(l => l === name);

                if (i >= 0) {
                    code.data.labels.splice(i, 1);
                    code.data.datasets.forEach(d => {
                        d.data.splice(i, 1);
                    });

                    if (table.querySelector("tbody").childElementCount === 1) table.classList.add("hide");
                    row.remove();
                }
                chart = updateCode(code, chart);
            }
        });
        element.querySelector("div[role='textbox']").addEventListener("blur", async(e) => {
            /** @type {HTMLDivElement} */
            var target = e.target;
            target.parentElement.querySelector(".loading").classList.remove("hide");
            var value = target.innerText.replace(/(^(\s*)|(\s*)$)/gm, '');
            target.innerText = value;

            var lb = code.data.labels.find(lb => lb === name);
            if (lb !== undefined && lb !== value && !code.data.labels.includes(value)) {
                code.data.labels[code.data.labels.findIndex(lb => lb === name)] = value;
                name = value;
            } else if (code.data.labels.includes(value)) {
                target.innerText = name;
            }
            await sleep(100);
            target.parentElement.querySelector(".loading").classList.add("hide");
            chart = updateCode(code, chart);
        });

        row.appendChild(element);

        code.data.datasets.forEach(d => {
            d.data.push(name === "aab" ? 1 : 0);

            let c = document.createElement("td");
            c.classList.add("editable-cell");
            c.innerHTML = `<div role="textbox" contenteditable spellcheck="false">0</div><div class="loading hide"><i class="fas fa-loader fa-spin"></i></div>`;
            c.querySelector("div[role='textbox']").addEventListener("blur", async(e) => {
                /** @type {HTMLDivElement} */
                var target = e.target;
                target.parentElement.querySelector(".loading").classList.remove("hide");
                const dsname = d.label;
                const lbname = name;
                var value = target.innerText;

                var ds = code.data.datasets.find(ds => ds.label === dsname);
                if (ds !== undefined && !Number.isNaN(Number(value)) && ds.data[code.data.labels.findIndex(l => l === lbname)] !== Number(value)) {
                    code.data.datasets.find(ds => ds.label === dsname).data[code.data.labels.findIndex(l => l === lbname)] = Number(value);
                    target.innerText = Number(value).toString();
                }
                await sleep(100);
                target.parentElement.querySelector(".loading").classList.add("hide");
                chart = updateCode(code, chart);
            });
            row.appendChild(c);
        });
        var lasttd = document.createElement("td");
        lasttd.classList.add("nb-top");
        row.appendChild(lasttd);

        document.querySelector("#data>tbody").appendChild(row);

        inp.innerText = "";

        chart = updateCode(code, chart);
    }

    /**
     * 
     * @param {SubmitEvent} e 
     * @param {Chart.ChartDataSets} dataset 
     */
    function addDataset(e = null, dataset = null) {
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        if (dataset) {
            var name = dataset.label;
        } else {
            /** @type {HTMLInputElement} */
            var inp = document.getElementById("adddsname");
            var name = inp.innerText;
            if (code.data.datasets.find(ds => ds.label === name) !== undefined) return;
        }
        /** @type {Chart.ChartDataSets} */
        var ds = {
            label: name,
            data: []
        };

        var th = document.createElement("th");
        th.classList.add("editable-cell");
        th.innerHTML = `<div role="textbox" contenteditable spellcheck="false">${name}</div><button class="edit">Remove</button><div class="loading hide"><i class="fas fa-loader fa-spin"></i></div>`;

        th.querySelector("div[role='textbox']").addEventListener("blur", async(e) => {
            /** @type {HTMLDivElement} */
            var target = e.target;
            var value = target.innerText.replace(/(^(\s*)|(\s*)$)/gm, '');
            target.innerText = value;

            if (value != name) {
                target.parentElement.querySelector(".loading").classList.remove("hide");
                var d = code.data.datasets.find(d => d.label === name);
                if (d !== undefined && name !== value && code.data.datasets.filter(d => d.label === value).length === 0) {
                    code.data.datasets.find(d => d.label === name).label = value;
                    name = value;
                } else if (code.data.datasets.filter(d => d.label === value).length !== 0) {
                    target.innerText = name;
                }
                await sleep(100);
                target.parentElement.querySelector(".loading").classList.add("hide");
                chart = updateCode(code, chart);
            }
        });

        document.querySelector("#data>thead>tr:first-child").insertBefore(th, document.querySelector("#data>thead>tr:first-child").lastElementChild);

        var tf = document.createElement("th");
        tf.classList.add("nb-left");
        document.querySelector("#data>tfoot>tr:last-child").insertBefore(tf, document.querySelector("#data>tfoot>tr:last-child").lastElementChild);

        code.data.labels.forEach(d => {
            var row = document.getElementById(`labelrow-${d}`);
            var td = document.createElement("td");
            td.id = `labelds-${name}`;
            td.classList.add("editable-cell");
            td.innerHTML = `<div role="textbox" contenteditable spellcheck="false">0</div><div class="loading hide"><i class="fas fa-loader fa-spin"></i></div>`;
            td.querySelector("div[role='textbox']").addEventListener("blur", async(e) => {
                /** @type {HTMLDivElement} */
                var target = e.target;
                target.parentElement.querySelector(".loading").classList.remove("hide");
                const dsname = name;
                const lbname = d;
                var value = target.innerText;

                var ds = code.data.datasets.find(ds => ds.label === dsname);
                if (ds !== undefined && !Number.isNaN(Number(value)) && ds.data[code.data.labels.findIndex(l => l === lbname)] !== Number(value)) {
                    code.data.datasets.find(ds => ds.label === dsname).data[code.data.labels.findIndex(l => l === lbname)] = Number(value);
                    target.innerText = Number(value).toString();
                }
                await sleep(100);
                target.parentElement.querySelector(".loading").classList.add("hide");
                chart = updateCode(code, chart);
            });
            row.insertBefore(td, row.lastElementChild);
            ds.data.push(0);
        });

        th.querySelector("button.edit").addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (confirm("Are you sure to delete this dataset ?")) {
                /** @type {HTMLDivElement} */
                var target = e.target;
                const name = target.previousElementSibling.innerText;

                const i = code.data.datasets.findIndex(l => l.label === name);

                if (i >= 0) {
                    code.data.datasets.splice(i, 1);

                    document.querySelectorAll(`#labelds-${name}`).forEach(e => e.remove());
                    tf.remove();
                    th.remove();
                }
                chart = updateCode(code, chart);
            }
        });

        if (!dataset) {
            inp.innerText = '';
            chart.data.datasets.push(ds);

            chart = updateCode(code, chart);
        }
    }

    // document.getElementById("update").addEventListener("click", async(e) => {
    //     e.preventDefault();
    //     chart = updateCode(code, chart);
    // })
});