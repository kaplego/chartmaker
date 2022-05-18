const __ACCENT = "#ffc500";

/**
 * @param {HTMLElement} parent 
 * @param  {...HTMLElement} nodes 
 */
function elementContainsOne(parent, ...nodes)
{
    for (let node of[...nodes])
    {
        if (parent.contains(node))
        {
            return true;
        }
    }
    return false;
}

/**
 * @param {HTMLElement} element 
 * @param  {...HTMLElement} nodes 
 */
function elementIsOne(element, ...nodes)
{
    for (let node of[...nodes])
    {
        if (element == node)
        {
            return true;
        }
    }
    return false;
}

/**
 * @param {HTMLElement} parent 
 * @param  {...HTMLElement} nodes 
 */
function elementContainsAll(parent, ...nodes)
{
    for (let node of[...nodes])
    {
        if (!parent.contains(node))
        {
            return false;
        }
    }
    return true;
}

/** @param {number} ms @returns {Promise<void>} */
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}



Rainbow.extend('javascript', [{
        matches: {
            1: 'storage.type',
            2: 'const'
        },
        pattern: /\b(const )([A-Za-z_]([A-Za-z0-9_-]+)?)/g
    },
    {
        matches: {
            1: 'storage.type',
            2: 'var'
        },
        pattern: /\b(let |var )([A-Za-z_]([A-Za-z0-9_-]+)?)/g
    }
    /*,
    {
        name: 'storage.jsdoc',
        pattern: /@[a-z]+\b(?=(?:(?!\/\*)[\s\S])*\*\/)/g
    }*/
]);

// Rainbow.color();
Rainbow.extend('json', [{
    name: 'brackets1',
    pattern: /(\[|\])/g
}, {
    name: 'brackets2',
    pattern: /(\(|\))/g
}, {
    name: 'brackets3',
    pattern: /(\{|\})/g
}]);
Rainbow.extend('json', [{
    matches: {
        0: {
            name: "string",
            matches: {
                name: "constant.character.escape",
                pattern: /\\('|"){1}/g
            }
        }
    },
    pattern: /(\"|\')(\\?.)*?\1/g
}]);
Rainbow.extend('json', [{
    matches: {
        0: {
            name: 'jsonkey',
            matches: {
                name: "constant.character.escape",
                pattern: /\\('|"){1}/g
            }
        }
    },
    pattern: /(?<= |\b|\n)([A-Za-z_][A-Za-z0-9_-]*|("|')[A-Za-z_][A-Za-z0-9_-]*("|'))(?= ?:)/g
}]);
Rainbow.color();

const defaults = {
    line: {
        "type": "line",
        "data": {
            "labels": [],
            "datasets": [
            {
                "label": "Example dataset",
                "data": []
            }]
        },
        "options": {
            "plugins": {
                "legend": {
                    "display": false
                },
                "tooltip": {
                    "backgroundColor": "#f2f2f2",
                    "bodyColor": "#333",
                    "titleMarginBottom": 10,
                    "titleColor": "#333",
                    "titleFontSize": 14,
                    "borderColor": "#d3d3d3",
                    "borderWidth": 1,
                    "cornerRadius": 3,
                    "xPadding": 15,
                    "yPadding": 15,
                    "displayColors": false,
                    "intersect": false,
                    "mode": "index",
                    "caretPadding": 10
                }
            },
            "scales": {
                "x": {
                    "axis": "x",
                    "type": "category",
                    "ticks": {
                        "minRotation": 0,
                        "maxRotation": 50,
                        "mirror": false,
                        "textStrokeWidth": 0,
                        "textStrokeColor": "",
                        "padding": 3,
                        "display": true,
                        "autoSkip": true,
                        "autoSkipPadding": 3,
                        "labelOffset": 0,
                        "minor": {},
                        "major": {},
                        "align": "center",
                        "crossAlign": "near",
                        "showLabelBackdrop": false,
                        "backdropColor": "rgba(255, 255, 255, 0.75)",
                        "backdropPadding": 2,
                        "color": "#666"
                    },
                    "display": true,
                    "offset": false,
                    "reverse": false,
                    "beginAtZero": false,
                    "bounds": "ticks",
                    "grace": 0,
                    "grid": {
                        "display": true,
                        "lineWidth": 1,
                        "drawBorder": true,
                        "drawOnChartArea": true,
                        "drawTicks": true,
                        "tickLength": 8,
                        "offset": false,
                        "borderDash": [],
                        "borderDashOffset": 0,
                        "borderWidth": 1,
                        "color": "rgba(0,0,0,0.1)",
                        "borderColor": "rgba(0,0,0,0.1)"
                    },
                    "title": {
                        "display": false,
                        "text": "",
                        "padding": {
                            "top": 4,
                            "bottom": 4
                        },
                        "color": "#666"
                    },
                    "id": "x",
                    "position": "bottom"
                },
                "y": {
                    "axis": "y",
                    "type": "linear",
                    "ticks": {
                        "minRotation": 0,
                        "maxRotation": 50,
                        "mirror": false,
                        "textStrokeWidth": 0,
                        "textStrokeColor": "",
                        "padding": 3,
                        "display": true,
                        "autoSkip": true,
                        "autoSkipPadding": 3,
                        "labelOffset": 0,
                        "minor": {},
                        "major": {},
                        "align": "center",
                        "crossAlign": "near",
                        "showLabelBackdrop": false,
                        "backdropColor": "rgba(255, 255, 255, 0.75)",
                        "backdropPadding": 2,
                        "color": "#666"
                    },
                    "display": true,
                    "offset": false,
                    "reverse": false,
                    "beginAtZero": false,
                    "bounds": "ticks",
                    "grace": 0,
                    "grid": {
                        "display": true,
                        "lineWidth": 1,
                        "drawBorder": true,
                        "drawOnChartArea": true,
                        "drawTicks": true,
                        "tickLength": 8,
                        "offset": false,
                        "borderDash": [],
                        "borderDashOffset": 0,
                        "borderWidth": 1,
                        "color": "rgba(0,0,0,0.1)",
                        "borderColor": "rgba(0,0,0,0.1)"
                    },
                    "title": {
                        "display": false,
                        "text": "",
                        "padding": {
                            "top": 4,
                            "bottom": 4
                        },
                        "color": "#666"
                    },
                    "id": "y",
                    "position": "left"
                }
            }
        }
    }
};

/**
 * @param {import("chart.js").ChartConfiguration} c 
 * @param {Chart|null} oldChart
 */
function updateCode(c, oldChart = null) {
    document.querySelectorAll("#jscode>pre>:not(code)").forEach(e => e.remove());
    document.querySelector("#jscode>pre>code").classList.remove('rainbow', 'rainbow-show');
    document.querySelector("#jscode>pre>code").innerHTML = JSON.stringify(c, undefined, "    ");
    Rainbow.color();

    if (oldChart !== null && (oldChart instanceof Chart)) oldChart.destroy();

    var element = document.getElementById("chart").getContext("2d");
    return new Chart(element, c);
}