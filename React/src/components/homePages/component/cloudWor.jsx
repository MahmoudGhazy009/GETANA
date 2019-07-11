'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var d3$1 = require('d3');
var d3Cloud = require('d3-cloud');
var React = require('react');
var ResizeObserver = _interopDefault(require('resize-observer-polyfill'));
var tippy = _interopDefault(require('tippy.js'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var useEffect = React.useEffect, useRef = React.useRef, useReducer = React.useReducer;
function reducer(state, action) {
    var type = action.type, payload = action.payload;
    switch (type) {
        case 'SET_SIZE':
            return __assign({}, state, { size: payload });
        case 'SET_SELECTIONS':
            return __assign({}, state, { selections: payload });
        default:
            return state;
    }
}
function useResponsiveSVGSelection(minSize, initialSize) {
    var ref = useRef();
    var svg = useRef();
    var g = useRef();
    var _a = useReducer(reducer, {
        ref: ref,
        selections: {
            g: null,
            svg: null,
        },
        size: initialSize,
    }), state = _a[0], dispatch = _a[1];
    // set initial svg and size
    useEffect(function () {
        function updateSize(width, height) {
            svg.current.attr('height', height).attr('width', width);
            g.current.attr('transform', "translate(" + width / 2 + ", " + height / 2 + ")");
            dispatch({
                type: 'SET_SIZE',
                payload: [width, height],
            });
        }
        // set svg selections
        var element = ref.current;
        svg.current = d3$1.select(element)
            .append('svg')
            .style('display', 'block'); // inline svg leave white space
        g.current = svg.current.append('g');
        dispatch({
            type: 'SET_SELECTIONS',
            payload: {
                g: g.current,
                svg: svg.current,
            },
        });
        // update initial size
        var width = 0;
        var height = 0;
        if (initialSize !== undefined) {
            // Use initialSize if it is provided
            width = initialSize[0], height = initialSize[1];
        }
        else {
            // Use parentNode size if resized has not updated
            width = element.parentElement.offsetWidth;
            height = element.parentElement.offsetHeight;
        }
        width = Math.max(width, minSize[0]);
        height = Math.max(height, minSize[1]);
        updateSize(width, height);
        // update resize using a resize observer
        var resizeObserver = new ResizeObserver(function (entries) {
            if (!entries || !entries.length) {
                return;
            }
            if (initialSize === undefined) {
                var _a = entries[0].contentRect, width_1 = _a.width, height_1 = _a.height;
                updateSize(width_1, height_1);
            }
        });
        resizeObserver.observe(element);
        // cleanup
        return function () {
            resizeObserver.unobserve(element);
            d3$1.select(element)
                .selectAll('*')
                .remove();
        };
    }, [initialSize, minSize]);
    return state;
}

var Scale;
(function (Scale) {
    Scale["Linear"] = "linear";
    Scale["Log"] = "log";
    Scale["Sqrt"] = "sqrt";
})(Scale || (Scale = {}));
var Spiral;
(function (Spiral) {
    Spiral["Archimedean"] = "archimedean";
    Spiral["Rectangular"] = "rectangular";
})(Spiral || (Spiral = {}));

function choose(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function getDefaultColors() {
    return d3$1.range(20)
        .map(function (number) { return number.toString(); })
        .map(d3$1.scaleOrdinal(d3$1.schemeCategory10));
}
function getFontScale(words, fontSizes, scale) {
    var _a;
    var minSize = d3$1.min(words, function (word) { return word.value; });
    var maxSize = d3$1.max(words, function (word) { return word.value; });
    var Scales = (_a = {},
        _a[Scale.Linear] = d3$1.scaleLinear,
        _a[Scale.Log] = d3$1.scaleLog,
        _a[Scale.Sqrt] = d3$1.scaleSqrt,
        _a);
    var fontScale = (Scales[scale] || d3$1.scaleLinear)()
        .domain([minSize, maxSize])
        .range(fontSizes);
    return fontScale;
}
function getText(word) {
    return word.text;
}
function getFontSize(word) {
    return word.size + "px";
}
function getTransform(word) {
    var translate = "translate(" + word.x + ", " + word.y + ")";
    var rotate = typeof word.rotate === 'number' ? "rotate(" + word.rotate + ")" : '';
    return translate + rotate;
}
function rotate(rotations, rotationAngles) {
    if (rotations < 1) {
        return 0;
    }
    var angles = [];
    if (rotations === 1) {
        angles = [rotationAngles[0]];
    }
    else {
        angles = rotationAngles.slice();
        var increment = (rotationAngles[1] - rotationAngles[0]) / (rotations - 1);
        var angle = rotationAngles[0] + increment;
        while (angle < rotationAngles[1]) {
            angles.push(angle);
            angle += increment;
        }
    }
    return choose(angles);
}

var tooltipInstance;
function render(selection, words, options, callbacks) {
    var getWordColor = callbacks.getWordColor, getWordTooltip = callbacks.getWordTooltip, onWordClick = callbacks.onWordClick, onWordMouseOver = callbacks.onWordMouseOver, onWordMouseOut = callbacks.onWordMouseOut;
    var colors = options.colors, enableTooltip = options.enableTooltip, fontStyle = options.fontStyle, fontWeight = options.fontWeight;
    var fontFamily = options.fontFamily, transitionDuration = options.transitionDuration;
    function getFill(word) {
        return getWordColor ? getWordColor(word) : choose(colors);
    }
    // load words
    var vizWords = selection.selectAll('text').data(words);
    // enter transition
    vizWords
        .enter()
        .append('text')
        .on('click', onWordClick)
        .on('mouseover', function (word) {
        if (enableTooltip) {
            tooltipInstance = tippy(d3$1.event.target, {
                animation: 'scale',
                arrow: true,
                content: function () {
                    return getWordTooltip(word);
                },
            });
        }
        onWordMouseOver && onWordMouseOver(word);
    })
        .on('mouseout', function (word) {
        if (tooltipInstance) {
            tooltipInstance.destroy();
        }
        onWordMouseOut && onWordMouseOut(word);
    })
        .attr('cursor', onWordClick ? 'pointer' : 'default')
        .attr('fill', getFill)
        .attr('font-family', fontFamily)
        .attr('font-style', fontStyle)
        .attr('font-weight', fontWeight)
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(0, 0) rotate(0)')
        .transition()
        .duration(transitionDuration)
        .attr('font-size', getFontSize)
        .attr('transform', getTransform)
        .text(getText);
    // update transition
    vizWords
        .transition()
        .duration(transitionDuration)
        .attr('fill', getFill)
        .attr('font-family', fontFamily)
        .attr('font-size', getFontSize)
        .attr('transform', getTransform)
        .text(getText);
    // exit transition
    vizWords
        .exit()
        .transition()
        .duration(transitionDuration)
        .attr('fill-opacity', 0)
        .remove();
}

var useEffect$1 = React.useEffect;
var d3 = { cloud: d3Cloud };
var MAX_LAYOUT_ATTEMPTS = 10;
var SHRINK_FACTOR = 0.95;
var defaultCallbacks = {
    getWordTooltip: function (_a) {
        var text = _a.text, value = _a.value;
        return text + " (" + value + ")";
    },
};
var defaultOptions = {
    colors: getDefaultColors(),
    enableTooltip: true,
    fontFamily: 'times new roman',
    fontSizes: [4, 32],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotationAngles: [-90, 90],
    rotations: undefined,
    scale: Scale.Sqrt,
    spiral: Spiral.Archimedean,
    transitionDuration: 600,
};
function Wordcloud(_a) {
    var callbacks = _a.callbacks, maxWords = _a.maxWords, options = _a.options, minSize = _a.minSize, initialSize = _a.size, words = _a.words;
    var _b = useResponsiveSVGSelection(minSize, initialSize), ref = _b.ref, selections = _b.selections, size = _b.size;
    var selection = selections.g;
    // render viz
    useEffect$1(function () {
        var mergedCallbacks = __assign({}, defaultCallbacks, callbacks);
        var mergedOptions = __assign({}, defaultOptions, options);
        if (selection) {
            var fontFamily = mergedOptions.fontFamily, fontStyle = mergedOptions.fontStyle, fontSizes = mergedOptions.fontSizes, fontWeight = mergedOptions.fontWeight, padding = mergedOptions.padding, rotations_1 = mergedOptions.rotations, rotationAngles_1 = mergedOptions.rotationAngles, spiral = mergedOptions.spiral, scale_1 = mergedOptions.scale;
            var sortedWords_1 = words
                .concat()
                .sort(function (x, y) { return d3$1.descending(x.value, y.value); })
                .slice(0, maxWords);
            var layout_1 = d3
                .cloud()
                .size(size)
                .padding(padding)
                .words(sortedWords_1)
                .rotate(function () {
                if (rotations_1 === undefined) {
                    // default rotation algorithm
                    return (~~(Math.random() * 6) - 3) * 30;
                }
                else {
                    return rotate(rotations_1, rotationAngles_1);
                }
            })
                .spiral(spiral)
                .text(getText)
                .font(fontFamily)
                .fontStyle(fontStyle)
                .fontWeight(fontWeight);
            var draw_1 = function (fontSizes, attempts) {
                if (attempts === void 0) { attempts = 1; }
                layout_1
                    .fontSize(function (word) {
                    var fontScale = getFontScale(sortedWords_1, fontSizes, scale_1);
                    return fontScale(word.value);
                })
                    .on('end', function (computedWords) {
                    if (sortedWords_1.length !== computedWords.length &&
                        attempts <= MAX_LAYOUT_ATTEMPTS) {
                        // KNOWN ISSUE: Unable to render long words with high frequency.
                        // (https://github.com/jasondavies/d3-cloud/issues/36)
                        // Recursively layout and decrease font-sizes by a SHRINK_FACTOR.
                        // Bail out with a warning message after MAX_LAYOUT_ATTEMPTS.
                        if (attempts === MAX_LAYOUT_ATTEMPTS) {
                            console.warn("Unable to layout " + (sortedWords_1.length -
                                computedWords.length) + " word(s) after " + attempts + " attempts.  Consider: (1) Increasing the container/component size. (2) Lowering the max font size. (3) Limiting the rotation angles.");
                        }
                        var minFontSize = Math.max(fontSizes[0] * SHRINK_FACTOR, 3);
                        var maxFontSize = Math.max(fontSizes[1] * SHRINK_FACTOR, minFontSize);
                        draw_1([minFontSize, maxFontSize], attempts + 1);
                    }
                    else {
                        render(selection, computedWords, mergedOptions, mergedCallbacks);
                    }
                })
                    .start();
            };
            draw_1(fontSizes);
        }
    }, [callbacks, maxWords, options, selection, size, words]);
    return React.createElement("div", { ref: ref });
}
Wordcloud.defaultProps = {
    callbacks: defaultCallbacks,
    maxWords: 100,
    minSize: [300, 300],
    options: defaultOptions,
};

exports.defaultCallbacks = defaultCallbacks;
exports.defaultOptions = defaultOptions;
exports.default = Wordcloud;
