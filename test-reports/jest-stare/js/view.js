(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = 'MODULE_NOT_FOUND'), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function(r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = 'function' == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const chalk = require('chalk');
        class Constants {}
        exports.Constants = Constants;
        Constants.NAME = 'jest-stare';
        Constants.LOGO =
          chalk.green('**  ') +
          chalk.green('jest') +
          chalk.yellow('-') +
          chalk.red('stare');
        Constants.SUFFIX = chalk.green('\t**');
        Constants.DEFAULT_RESULTS_DIR = './' + Constants.NAME;
        Constants.HTML_EXTENSION = '.html';
        Constants.MAIN_HTML = 'index' + Constants.HTML_EXTENSION;
        Constants.JEST_STARE_JS = 'view.js';
        Constants.REPORTER_WRITTING = ' will write each completed run to ';
        Constants.RESULTS_RAW = 'jest-results.json';
        Constants.JEST_STARE_CSS = Constants.NAME + '.css';
        Constants.TEMPLATE_HTML = 'template.html';
        Constants.CSS_DIR = 'css/';
        Constants.JS_DIR = 'js/';
        Constants.IMAGE_SNAPSHOT_DIFF_DIR = 'image_snapshot_diff/';
        Constants.TEST_RESULTS_PROCESSOR = '--testResultsProcessor';
        Constants.REPORTERS = '--reporters';
        Constants.LOG_MESSAGE = ': wrote output report to ';
        Constants.MERGE_MESSAGE = ': will merge with ';
        Constants.NO_INPUT =
          Constants.NAME + ' was called without input results';
        Constants.NO_CLI_INPUT =
          Constants.NAME + ' CLI was called without input JSON file to read';
        Constants.OVERRIDE_JEST_STARE_CONFIG =
          Constants.NAME + ' was called with programmatic config';
      },
      { chalk: 21 }
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        class Constants {}
        exports.Constants = Constants;
        Constants.PASSED_LABEL = 'Passed';
        Constants.FAILED_LABEL = 'Failed';
        Constants.PENDING_LABEL = 'Pending';
        Constants.OBSOLETE_SNAPSHOT_TEST_LABEL = 'Obsolete Test';
        Constants.CHANGED_LABEL = 'Changed';
        Constants.ADDED_LABEL = 'Added';
        Constants.UPDATED_SNAPSHOT_TEST_LABEL = 'Updated Snapshot Test';
        Constants.REMOVED_OBSOLETE_SNAPSHOT_FILE_LABEL =
          'Removed Obsolete Snapshot File';
        Constants.OBSOLETE_SNAPSHOT_FILE_LABEL = 'Obsolete File';
        Constants.TEST_STATUS_PASS = 'passed';
        Constants.TEST_STATUS_FAIL = 'failed';
        Constants.TEST_STATUS_PEND = 'pending';
        Constants.OBSOLETE_SNAPSHOT_FILE = '#f8f9fa';
        Constants.OBSOLETE_SNAPSHOT_TEST = '#ffc107';
        Constants.ADDED = '#007bff';
        Constants.UPDATED_SNAPSHOT_TEST = '#17a2b8';
        Constants.REMOVED_OBSOLETE_SNAPSHOT_FILE = '#343a40';
        Constants.CHANGED = '#6c757d';
        Constants.PASS_RAW = '28a745';
        Constants.PASS = '#' + Constants.PASS_RAW;
        Constants.FAIL_RAW = 'dc3545';
        Constants.FAIL = '#' + Constants.FAIL_RAW;
        Constants.PENDING_RAW = 'ffc107';
        Constants.PENDING = '#' + Constants.PENDING_RAW;
        Constants.PASSED_TEST = 'passed-test';
        Constants.FAILED_TEST = 'failed-test';
        Constants.PENDING_TEST = 'pending-test';
      },
      {}
    ],
    3: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const $ = require('jquery');
        const Switch_1 = require('./navigation/Switch');
        const Constants_1 = require('./Constants');
        const Status_1 = require('./charts/Status');
        const Doughnut_1 = require('./charts/Doughnut');
        const TestSuite_1 = require('./suites/TestSuite');
        const TestSummary_1 = require('./summary/TestSummary');
        const util_1 = require('util');
        class Render {
          static init() {
            document.addEventListener('DOMContentLoaded', () => {
              const config = JSON.parse($('#test-config').text());
              const results = JSON.parse($('#test-results').text());
              try {
                const globalConfig = JSON.parse(
                  $('#test-global-config').text()
                );
                const regex = new RegExp(
                  Render.escapeRegExp(globalConfig.rootDir),
                  'g'
                );
                results.testResults.forEach(testResult => {
                  testResult.testFilePath = testResult.testFilePath.replace(
                    regex,
                    ''
                  );
              } catch (e) {}
              Render.show(results, config);
            });
          }
          static escapeRegExp(str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
          }
          static show(results, config) {
            const labels = [
              Constants_1.Constants.PASSED_LABEL,
              Constants_1.Constants.FAILED_LABEL
            ];
            const backgroundColor = [
              Constants_1.Constants.PASS,
              Constants_1.Constants.FAIL
            ];
            Render.setReportTitle(config);
            Render.setReportHeadline(config);
            Render.setCoverageLink(config);
            if (!config.disableCharts) {
              const suitesData = Render.buildChartsData(
                results.numPassedTestSuites,
                results.numFailedTestSuites,
                results.numPendingTestSuites
              );
              Doughnut_1.Doughnut.createChart(
                $('#test-suites-canvas'),
                suitesData
              );
              const testsChart = Render.buildChartsData(
                results.numPassedTests,
                results.numFailedTests,
                results.numPendingTests
              );
              Doughnut_1.Doughnut.createChart(
                $('#tests-assets-canvas'),
                testsChart
              );
              let snapshotChart = Render.buildChartsData(
                results.snapshot.matched,
                results.snapshot.unmatched
              );
              snapshotChart = Render.addSnapshotChartData(
                results,
                snapshotChart
              );
              Doughnut_1.Doughnut.createChart(
                $('#snapshots-canvas'),
                snapshotChart
              );
            this.updateStatusArea(results);
            const tableHtml = TestSuite_1.TestSuite.create(results);
            $('#loading-info').hide();
            $('#test-results').replaceWith($(tableHtml));
            if (config.reportSummary) {
              const testSummary = TestSummary_1.TestSummary.create(results);
              $('#test-summary').replaceWith($(testSummary));
            if (config.hidePassing) {
              $('#lab-passoff-switch').prop('checked', false);
              $(`.${Constants_1.Constants.PASSED_TEST}`).hide();
            }
            if (config.hideFailing) {
              $('#lab-failoff-switch').prop('checked', false);
              $(`.${Constants_1.Constants.FAILED_TEST}`).hide();
            }
            if (config.hidePending) {
              $('#lab-pendingoff-switch').prop('checked', false);
              $(`.${Constants_1.Constants.PENDING_TEST}`).hide();
            }
            if (config.hideFailing && config.hidePassing) {
              $(
                `.${Constants_1.Constants.FAILED_TEST}\\.${Constants_1.Constants.PASSED_TEST}`
              ).hide();
            }
            if (config.hidePending && config.hidePassing) {
              $(
                `.${Constants_1.Constants.PASSED_TEST}\\.${Constants_1.Constants.PENDING_TEST}`
              ).hide();
            }
            if (config.hideFailing && config.hidePending) {
              $(
                `.${Constants_1.Constants.FAILED_TEST}\\.${Constants_1.Constants.PENDING_TEST}`
              ).hide();
            }
            if (
              config.hideFailing &&
              config.hidePassing &&
              config.hidePending
            ) {
              $(
                `.${Constants_1.Constants.FAILED_TEST}\\.${Constants_1.Constants.PASSED_TEST}\\.${Constants_1.Constants.PENDING_TEST}`
              ).hide();
            }
            const allCheckArray = new Array();
            allCheckArray.push($('#lab-passoff-switch'));
            allCheckArray.push($('#lab-failoff-switch'));
            allCheckArray.push($('#lab-pendingoff-switch'));
            const allStylesArray = [
              Constants_1.Constants.PASSED_TEST,
              Constants_1.Constants.FAILED_TEST,
              Constants_1.Constants.PENDING_TEST
            ];
            const allSwitchArray = [
              '#lab-passoff-switch',
              '#lab-failoff-switch',
              '#lab-pendingoff-switch'
            ];
            allStylesArray.forEach((style, index) => {
              const checksMinusCurrentOne = allCheckArray.slice();
              checksMinusCurrentOne.splice(index, 1);
              const stylesMinusCurrentOne = allStylesArray.slice();
              stylesMinusCurrentOne.splice(index, 1);
              const switchElement = new Switch_1.Switch(
                $(allSwitchArray[index]),
                $('.' + style),
                style,
                checksMinusCurrentOne,
                stylesMinusCurrentOne
              );
            });
          }
          static updateStatusArea(results) {
            Status_1.Status.setResultsClass(
              $('#test-suites-results'),
              results.numPassedTestSuites,
              results.numTotalTestSuites -
                results.numPassedTestSuites -
                results.numPendingTestSuites
            );
            Status_1.Status.setResultsClass(
              $('#tests-assets-results'),
              results.numPassedTests,
              results.numTotalTests -
                results.numPassedTests -
                results.numPendingTests
            );
            Status_1.Status.setResultsClass(
              $('#snapshots-results'),
              results.snapshot.matched,
              results.snapshot.unmatched
            );
            if (
              results.snapshot.added === 0 &&
              results.snapshot.matched === 0 &&
              results.snapshot.unchecked === 0 &&
              results.snapshot.unmatched === 0 &&
              results.snapshot.updated === 0
            ) {
              $('#snapshots-group').hide();
            }
          }
          static setReportTitle(config) {
            const tabTitle = !util_1.isNullOrUndefined(config.reportTitle)
              ? config.reportTitle
              : 'jest-stare!';
            document.title = tabTitle;
          }
          static setReportHeadline(config) {
            const brandTitle = !util_1.isNullOrUndefined(config.reportHeadline)
              ? config.reportHeadline
              : 'jest-stare';
            const a = $('#navbar-title');
            a.text(brandTitle);
          }
          static setCoverageLink(config) {
            if (!util_1.isNullOrUndefined(config.coverageLink)) {
              const a = $('#coverage-link');
              a.addClass('active');
              a.removeClass('disabled');
              a.attr('href', config.coverageLink);
            }
          }
          static buildChartsData(passedTests, failedTests, pendingTests) {
            const chartData = {
              labels: [],
              backgroundColor: [],
              data: []
            };
            if (passedTests > 0) {
              chartData.labels.push(Constants_1.Constants.PASSED_LABEL);
              chartData.backgroundColor.push(Constants_1.Constants.PASS);
              chartData.data.push(passedTests);
            }
            if (failedTests > 0) {
              chartData.labels.push(Constants_1.Constants.FAILED_LABEL);
              chartData.backgroundColor.push(Constants_1.Constants.FAIL);
              chartData.data.push(failedTests);
            }
            if (pendingTests > 0) {
              chartData.labels.push(Constants_1.Constants.PENDING_LABEL);
              chartData.backgroundColor.push(Constants_1.Constants.PENDING);
              chartData.data.push(pendingTests);
            }
            return chartData;
          }
          static addSnapshotChartData(results, snapshotChart) {
            if (results.snapshot.filesAdded > 0) {
              snapshotChart.labels.push(Constants_1.Constants.ADDED_LABEL);
              snapshotChart.backgroundColor.push(Constants_1.Constants.ADDED);
              snapshotChart.data.push(results.snapshot.filesAdded);
            if (results.snapshot.unchecked > 0) {
              if (results.snapshot.didUpdate) {
                snapshotChart.labels.push(
                  Constants_1.Constants.UPDATED_SNAPSHOT_TEST_LABEL
                );
                snapshotChart.backgroundColor.push(
                  Constants_1.Constants.UPDATED_SNAPSHOT_TEST
                );
                snapshotChart.data.push(results.snapshot.unchecked);
              } else {
                snapshotChart.labels.push(
                  Constants_1.Constants.OBSOLETE_SNAPSHOT_TEST_LABEL
                );
                snapshotChart.backgroundColor.push(
                  Constants_1.Constants.OBSOLETE_SNAPSHOT_TEST
                );
              }
            if (results.snapshot.updated > 0) {
              snapshotChart.labels.push(Constants_1.Constants.CHANGED_LABEL);
              snapshotChart.backgroundColor.push(Constants_1.Constants.CHANGED);
              snapshotChart.data.push(results.snapshot.updated);
            if (results.snapshot.filesRemoved > 0) {
              if (results.snapshot.didUpdate) {
                snapshotChart.labels.push(
                  Constants_1.Constants.REMOVED_OBSOLETE_SNAPSHOT_FILE_LABEL
                );
                snapshotChart.backgroundColor.push(
                  Constants_1.Constants.REMOVED_OBSOLETE_SNAPSHOT_FILE
                );
              } else {
                snapshotChart.labels.push(
                  Constants_1.Constants.OBSOLETE_SNAPSHOT_FILE_LABEL
                );
                snapshotChart.backgroundColor.push(
                  Constants_1.Constants.OBSOLETE_SNAPSHOT_FILE
                );
                snapshotChart.data.push(results.snapshot.filesRemoved);
              }
            return snapshotChart;
          }
        exports.Render = Render;
      },
      {
        './Constants': 2,
        './charts/Doughnut': 4,
        './charts/Status': 5,
        './navigation/Switch': 8,
        './suites/TestSuite': 9,
        './summary/TestSummary': 11,
        jquery: 98,
        util: 105
      }
    ],
    4: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const chart_js_1 = require('chart.js');
        class Doughnut {
          static createChart(canvas, chartData) {
            const doughnut = 'doughnut';
            const config = {
              type: doughnut,
              data: {
                  {
                    backgroundColor: chartData.backgroundColor,
                    data: chartData.data
                  }
              }
            };
            Doughnut.buildCanvas(canvas.get(0), config);
          }
          static buildCanvas(canvas, config) {
            const doughnut = new chart_js_1.Chart(canvas, config);
          }
        exports.Doughnut = Doughnut;
      },
      { 'chart.js': 24 }
    ],
    5: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        class Status {
          static setResultsClass(statusElement, passed, failed) {
            const total = passed + failed;
            if (total === 0) {
              statusElement.addClass('list-group-item-info');
            } else {
              if (passed === 0) {
                statusElement.addClass('list-group-item-danger');
              } else if (passed === total) {
                statusElement.addClass('list-group-item-success');
              } else {
                statusElement.addClass('list-group-item-warning');
              }
          }
        exports.Status = Status;
      },
      {}
    ],
    6: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const $ = require('jquery');
        const Constants_1 = require('../../processor/Constants');
        const AnsiParser = require('ansi-parser');
        class ImageSnapshotDifference {
          static containsDiff(jestFailureMessage) {
            let isFailure = false;
            for (const indicator of ImageSnapshotDifference.DIFF_INDICATOR) {
              if (jestFailureMessage.indexOf(indicator) >= 0) {
              }
            return isFailure;
          }
          static generate(jestFailureMessage) {
            const imageDiffFilename = ImageSnapshotDifference.parseDiffImageName(
              jestFailureMessage
            );
            const errorMessage = ImageSnapshotDifference.parseDiffError(
              jestFailureMessage
            );
            const diffDiv = document.createElement('div');
            diffDiv.className = 'image-snapshot-diff';
            const diffMessage = document.createElement('span');
            diffMessage.textContent = errorMessage;
            diffMessage.className = 'text-muted';
            diffDiv.appendChild(diffMessage);
            const diffImageLink = document.createElement('a');
            diffImageLink.href =
              Constants_1.Constants.IMAGE_SNAPSHOT_DIFF_DIR + imageDiffFilename;
            diffDiv.appendChild(diffImageLink);
            const diffImage = document.createElement('img');
            diffImage.src =
              Constants_1.Constants.IMAGE_SNAPSHOT_DIFF_DIR + imageDiffFilename;
            diffImageLink.appendChild(diffImage);
            return $(diffDiv).get(0);
          }
          static parseDiffImagePath(jestFailureMessage) {
            const match = ImageSnapshotDifference.DIFF_IMAGE.exec(
              jestFailureMessage
            );
            if (match) {
              return AnsiParser.removeAnsi(match[1]).trim();
            }
            return null;
          }
          static parseDiffImageName(jestFailureMessage) {
            const path = ImageSnapshotDifference.parseDiffImagePath(
              jestFailureMessage
            );
            if (path) {
              return path.replace(/^.*[\\\/]/, '');
            }
          }
          static parseDiffError(jestFailureMessage) {
            const match = ImageSnapshotDifference.DIFF_DETAILS.exec(
              jestFailureMessage
            );
            if (match) {
              return match[1];
            }
            return null;
          }
        exports.ImageSnapshotDifference = ImageSnapshotDifference;
        ImageSnapshotDifference.DIFF_INDICATOR = [
          'different from snapshot',
          'image to be the same size'
        ];
        ImageSnapshotDifference.DIFF_IMAGE = /See diff for details:\s*((.*?)\.png)/;
        ImageSnapshotDifference.DIFF_DETAILS = /Error: (.*)/;
      },
      { '../../processor/Constants': 1, 'ansi-parser': 14, jquery: 98 }
    ],
    7: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const diff2html = require('diff2html');
        const $ = require('jquery');
        class TestDifference {
          static containsDiff(jestFailureMessage) {
            return (
              jestFailureMessage.search(TestDifference.DIFF_INDICATOR) >= 0
            );
          }
          static generate(jestFailureMessage) {
            const jestDiff = TestDifference.isolateDiff(jestFailureMessage);
            const diffHtml = diff2html.Diff2Html.getPrettyHtml(jestDiff, {
              inputFormat: 'diff',
              showFiles: false,
              outputFormat: 'side-by-side',
              matching: 'lines'
            });
            return $(diffHtml).get(0);
          }
          static isolateDiff(jestFailureMessage) {
            const beginIndex = jestFailureMessage.search(
              TestDifference.DIFF_INDICATOR
            );
            const endIndex = jestFailureMessage.search(
              TestDifference.DIFF_END_INDICATOR
            );
            let isolated = jestFailureMessage.substring(beginIndex, endIndex);
            let snapshotChanges = 0;
            let receivedChanges = 0;
            const changeLines = isolated.split(/\r?\n/g);
            for (const line of changeLines) {
              if (/^- /.test(line)) {
              } else if (/^\+ /.test(line)) {
              }
            const changesIndicator = `\n@@ -0,${snapshotChanges} +0,${receivedChanges} @@\n`;
            isolated = isolated.replace('- Snapshot', '--- Snapshot');
            isolated = isolated.replace(
              '+ Received\n',
              '+++ Received' + changesIndicator
            );
            return isolated;
          }
        exports.TestDifference = TestDifference;
        TestDifference.DIFF_INDICATOR = /- Snapshot\s*\n\s*\+ Received/g;
        TestDifference.DIFF_END_INDICATOR = /(at .*? \(.*?:[0-9]+:[0-9]+\)\s)/g;
      },
      { diff2html: 84, jquery: 98 }
    ],
    8: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const util_1 = require('util');
        class Switch {
          constructor(
            checkBox,
            divClass,
            divClassName,
            addtnlCheckBoxArray,
            addtnlClassNameArray
          ) {
            this.activateFilters(
              checkBox,
              divClass,
              divClassName,
              addtnlCheckBoxArray,
              addtnlClassNameArray
            );
          }
          static mixStatus(currentStatus, oldStatus) {
            const statusArray = oldStatus.split(Switch.JOIN_CHAR);
            statusArray.push(currentStatus);
            const sortedUniqueStatusArray = [...new Set(statusArray)].sort();
            return sortedUniqueStatusArray.join(Switch.JOIN_CHAR);
          }
          activateFilters(
            checkBox,
            divClass,
            divClassName,
            addtnlCheckBoxArray,
            addtnlClassNameArray
          ) {
            checkBox.change(() => {
              if (checkBox.is(':checked')) {
                  addtnlCheckBoxArray.forEach((addtnlCheckBox, index) => {
                    const mixedDualClass = Switch.mixStatus(
                      addtnlClassNameArray[index],
                      divClassName
                    );
                    const mixedClassDiv = $('.' + mixedDualClass);
                    mixedClassDiv.show();
                  });
                  const mixedClass = Switch.mixStatus(
                    addtnlClassNameArray[0],
                    divClassName
                  );
                  const allMixedClass = Switch.mixStatus(
                    addtnlClassNameArray[1],
                    mixedClass
                  );
                  const allMixedClassDiv = $('.' + allMixedClass);
                  allMixedClassDiv.show();
              } else {
                  let allUnchecked = true;
                  addtnlCheckBoxArray.forEach((addtnlCheckBox, index) => {
                    if (!addtnlCheckBox.is(':checked')) {
                      const mixedClass = Switch.mixStatus(
                        addtnlClassNameArray[index],
                        divClassName
                      );
                      const mixedClassDiv = $('.' + mixedClass);
                      mixedClassDiv.hide();
                    } else {
                      allUnchecked = false;
                  });
                  if (allUnchecked) {
                    const mixedClass = Switch.mixStatus(
                      addtnlClassNameArray[0],
                      divClassName
                    );
                    const allMixedClass = Switch.mixStatus(
                      addtnlClassNameArray[1],
                      mixedClass
                    );
                    const allMixedClassDiv = $('.' + allMixedClass);
                    allMixedClassDiv.hide();
                  }
              }
            });
          }
        }
        exports.Switch = Switch;
        Switch.JOIN_CHAR = '\\.';
      },
      { util: 105 }
    ],
    9: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const Constants_1 = require('../Constants');
        const Test_1 = require('../tests-assets/Test');
        class TestSuite {
          static create(results) {
            const elements = [];
            results.testResults.forEach(testResult => {
              if (testResult.testResults == null) {
                console.error('Unexpected testResults field missing');
                  console.warn(
                    'Attempting to use assertionResults: results are unpredictable'
                  );
                  testResult.testResults = testResult.assertionResults;
              }
              let testStatusClass;
              const testSectionStatus = new Map();
              for (const result of testResult.testResults) {
                testStatusClass = TestSuite.asignStatus(
                  testStatusClass,
                  result,
                  testSectionStatus
                );
              }
              if (testStatusClass === undefined) {
              }
              const div = document.createElement('div');
              div.classList.add(
                'my-3',
                'p-3',
                'bg-white',
                'rounded',
                'box-shadow',
                testStatusClass
              );
              const h5 = document.createElement('h5');
              h5.classList.add('border-bottom', 'pb-2', 'mb-0', 'display-5');
              h5.textContent = testResult.testFilePath;
              div.id = testResult.testFilePath;
              div.appendChild(h5);
              const divMap = new Map();
              testResult.testResults.forEach(test => {
                  test.ancestorTitles.forEach((title, index) => {
                    const titlesCopy = test.ancestorTitles.slice();
                    titlesCopy.splice(index + 1);
                    const key = titlesCopy.join(TestSuite.JOIN_CHAR);
                    if (divMap.has(key)) {
                      divMap.get(key).appendChild(element);
                    } else {
                      const nestDiv = document.createElement('div');
                      const statusClass =
                        testSectionStatus.get(key) ||
                        Constants_1.Constants.PASSED_TEST;
                      nestDiv.classList.add(
                        'my-3',
                        'p-3',
                        'bg-white',
                        'rounded',
                        'box-shadow',
                        statusClass
                      );
                      const h6 = document.createElement('h6');
                      h6.classList.add(
                        'border-bottom',
                        'pb-2',
                        'mb-0',
                        'display-6'
                      );
                      h6.textContent = title;
                      nestDiv.appendChild(h6);
                      nestDiv.appendChild(element);
                      nestDiv.id = key;
                      divMap.set(key, nestDiv);
                      if (index === 0) {
                        div.appendChild(nestDiv);
                      } else {
                        titlesCopy.pop();
                        const parentKey = titlesCopy.join(TestSuite.JOIN_CHAR);
                        divMap.get(parentKey).appendChild(nestDiv);
                      }
                    }
                  });
                } else {
                  div.appendChild(element);
              });
              elements.push(div);
            return elements;
          }
          static asignStatus(testStatusClass, result, testSectionStatus) {
            const currentStatus = TestSuite.getStatusClassFromJestStatus(
              result.status
            );
            if (!testStatusClass) {
              testStatusClass = currentStatus;
            } else if (testStatusClass !== currentStatus) {
              testStatusClass = TestSuite.mixStatus(
                currentStatus,
                testStatusClass
              );
            } else {
              testStatusClass = currentStatus;
            }
            for (let index = 0; index < result.ancestorTitles.length; index++) {
              const titlesCopy = result.ancestorTitles.slice();
              titlesCopy.splice(index + 1);
              const key = titlesCopy.join(TestSuite.JOIN_CHAR);
              if (testSectionStatus.has(key)) {
                  testSectionStatus.set(
                    key,
                    TestSuite.mixStatus(currentStatus, testStatusClass)
                  );
                } else {
                  testSectionStatus.set(key, currentStatus);
              } else {
              }
            return testStatusClass;
          }
          static getStatusClassFromJestStatus(jestStatus) {
            if (jestStatus === Constants_1.Constants.TEST_STATUS_PEND) {
              return Constants_1.Constants.PENDING_TEST;
            } else if (jestStatus === Constants_1.Constants.TEST_STATUS_FAIL) {
              return Constants_1.Constants.FAILED_TEST;
            } else {
              return Constants_1.Constants.PASSED_TEST;
            }
          }
          static mixStatus(currentStatus, oldStatus) {
            const statusArray = oldStatus.split(TestSuite.JOIN_CHAR);
            statusArray.push(currentStatus);
            const sortedUniqueStatusArray = [...new Set(statusArray)].sort();
            return sortedUniqueStatusArray.join(TestSuite.JOIN_CHAR);
          }
        exports.TestSuite = TestSuite;
        TestSuite.JOIN_CHAR = '.';
      },
      { '../Constants': 2, '../tests/Test': 12 }
    ],
    10: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const Constants_1 = require('../Constants');
        class Test {
          static create(innerTestResult) {
            const containerDiv = document.createElement('div');
            const anchor = document.createElement('a');
            anchor.href =
              '#' + innerTestResult.title.replace(/\s+/g, '-').toLowerCase();
            const testName = document.createElement('span');
            testName.textContent = innerTestResult.title;
            anchor.appendChild(
              Test.getSimbolSpanFromStatus(innerTestResult.status)
            );
            anchor.appendChild(testName);
            containerDiv.appendChild(anchor);
            return containerDiv;
          }
          static getSimbolSpanFromStatus(status) {
            const span = document.createElement('span');
            span.classList.add('summary-test-label', 'test');
            if (status === Constants_1.Constants.TEST_STATUS_PASS) {
              span.textContent = '✓';
              span.classList.add('pass');
            }
            if (status === Constants_1.Constants.TEST_STATUS_PEND) {
              span.textContent = 'O';
              span.classList.add('pending');
            }
            if (status === Constants_1.Constants.TEST_STATUS_FAIL) {
              span.textContent = 'X';
              span.classList.add('fail');
            }
            return span;
          }
        exports.Test = Test;
      },
      { '../Constants': 2 }
    ],
    11: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const Test_1 = require('./Test');
        class TestSummary {
          static create(results) {
            const elements = [];
            const div = document.createElement('div');
            div.classList.add(
              'my-3',
              'p-3',
              'bg-white',
              'rounded',
              'box-shadow',
              'summary'
            );
            const h5 = document.createElement('h5');
            h5.classList.add(
              'border-bottom',
              'pb-2',
              'display-5',
              'summary-title'
            );
            h5.textContent = 'Summary';
            div.appendChild(h5);
            div.id = 'test-summary';
            elements.push(div);
            results.testResults.forEach(testResult => {
              if (testResult.testResults == null) {
                console.error('Unexpected testResults field missing');
                  console.warn(
                    'Attempting to use assertionResults: results are unpredictable'
                  );
                  testResult.testResults = testResult.assertionResults;
                }
              }
              const divMap = new Map();
              const testTitleDiv = document.createElement('div');
              testTitleDiv.classList.add('summary-test-suite');
              const testFileLink = document.createElement('a');
              const passingTestsCount =
                '[' +
                testResult.numPassingTests +
                '/' +
                testResult.testResults.length +
                ']';
              const isPass =
                testResult.testResults.length -
                  (testResult.numPassingTests + testResult.numPendingTests) ===
                0;
              const testStatus = document.createElement('strong');
              testStatus.classList.add('summary-test-label');
              if (isPass) {
                testStatus.classList.add('pass');
                testStatus.textContent = 'PASS';
              } else {
                testStatus.classList.add('fail');
                testStatus.textContent = 'FAIL';
              }
              const testFileLine = document.createElement('strong');
              testFileLine.classList.add('summary-test-label', 'path');
              testFileLine.textContent = testResult.testFilePath;
              const testCount = document.createElement('strong');
              testCount.classList.add('summary-test-count');
              testCount.textContent = passingTestsCount;
              testFileLink.href = '#' + testResult.testFilePath;
              testFileLink.appendChild(testStatus);
              testFileLink.appendChild(testFileLine);
              testFileLink.appendChild(testCount);
              testTitleDiv.appendChild(testFileLink);
              div.appendChild(testTitleDiv);
              testResult.testResults.forEach(test => {
              });
            return elements;
          }
        }
        exports.TestSummary = TestSummary;
        TestSummary.JOIN_CHAR = '.';
      },
      { './Test': 10 }
    ],
    12: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const Constants_1 = require('../Constants');
        const AnsiParser = require('ansi-parser');
        const TestDifference_1 = require('../diff/TestDifference');
        const ImageSnapshotDifference_1 = require('../diff/ImageSnapshotDifference');
        class Test {
          static create(innerTestResult) {
            let color = Constants_1.Constants.PASS_RAW;
            let testStatusClass = Constants_1.Constants.PASSED_TEST;
            let failed = false;
            switch (innerTestResult.status) {
              case Constants_1.Constants.TEST_STATUS_FAIL:
              case Constants_1.Constants.TEST_STATUS_PEND:
              case Constants_1.Constants.TEST_STATUS_PASS:
              default:
            }
            const firstDiv = document.createElement('div');
            firstDiv.classList.add(
              'media',
              'text-muted',
              'pt-3',
              testStatusClass
            );
            const img = document.createElement('img');
            img.classList.add('mr-2', 'rounded');
            img.alt = '';
            img.setAttribute(
              'data-src',
              'holder.js/32x32?theme=thumb&bg=' +
                color +
                '&fg=' +
                color +
                '&size=1'
            );
            firstDiv.appendChild(img);
            const secondDiv = document.createElement('div');
            secondDiv.classList.add(
              'media-body',
              'pb-3',
              'mb-0',
              'small',
              'lh-125',
              'border-bottom',
              'overflow-auto'
            );
            firstDiv.appendChild(secondDiv);
            const thirdDiv = document.createElement('div');
            thirdDiv.classList.add(
              'd-flex',
              'justify-content-between',
              'align-items-center',
              'w-100'
            );
            secondDiv.appendChild(thirdDiv);
            const strong = document.createElement('strong');
            strong.classList.add('text-gray-dark');
            strong.textContent = innerTestResult.title;
            const titleId = innerTestResult.title
              .replace(/\s+/g, '-')
              .toLowerCase();
            thirdDiv.appendChild(strong);
            const small = document.createElement('small');
            small.classList.add('d-block', 'text-right', 'mt-3');
            const conversionValu = 1000;
            small.textContent = innerTestResult.duration / conversionValu + 's';
            thirdDiv.appendChild(small);
            const span = document.createElement('span');
            span.classList.add('d-block', 'mb-2');
            span.textContent = innerTestResult.status;
            secondDiv.appendChild(span);
            if (failed) {
              const failMessage = AnsiParser.removeAnsi(
                innerTestResult.failureMessages[0]
              );
              const failMessageSplit = failMessage.split('\n');
              let show = true;
              if (
                failMessage.search(
                  TestDifference_1.TestDifference.DIFF_INDICATOR
                ) >= 0
              ) {
                const diffHtml = TestDifference_1.TestDifference.generate(
                  failMessage
                );
              }
              if (
                ImageSnapshotDifference_1.ImageSnapshotDifference.containsDiff(
                  failMessage
                )
              ) {
                const diffHtml = ImageSnapshotDifference_1.ImageSnapshotDifference.generate(
                  failMessage
                );
              }
              const collapseDiv = document.createElement('div');
              collapseDiv.classList.add(
                'd-flex',
                'justify-content-between',
                'align-items-center',
                'w-100'
              );
              const worthlessDiv = document.createElement('div');
              secondDiv.appendChild(collapseDiv);
              collapseDiv.appendChild(worthlessDiv);
              const button = document.createElement('button');
              button.classList.add('btn', 'btn-light', 'btn-sm');
              button.type = 'button';
              button.setAttribute('data-toggle', 'collapse');
              button.setAttribute('data-target', '#' + titleId);
              button.setAttribute('aria-expanded', 'false');
              button.setAttribute('aria-controls', titleId);
              button.textContent = 'raw';
              collapseDiv.appendChild(button);
              const pre = document.createElement('pre');
              secondDiv.appendChild(pre);
              pre.classList.add('collapse');
              if (show) {
                pre.classList.add('show');
              }
              pre.id = titleId;
              const code = document.createElement('code');
              pre.appendChild(code);
              failMessageSplit.forEach((entry, index) => {
                const codeSpan = document.createElement('span');
                if (entry[0] === '+') {
                  codeSpan.setAttribute(
                    'style',
                    'color:' + Constants_1.Constants.PASS
                  );
                  codeSpan.textContent = entry;
                } else if (entry[0] === '-') {
                  codeSpan.setAttribute(
                    'style',
                    'color:' + Constants_1.Constants.FAIL
                  );
                  codeSpan.textContent = entry;
                } else {
                  codeSpan.textContent = entry;
                }
                const spanDiv = document.createElement('div');
              });
            }
            firstDiv.id = titleId;
            return firstDiv;
          }
        exports.Test = Test;
      },
      {
        '../Constants': 2,
        '../diff/ImageSnapshotDifference': 6,
        '../diff/TestDifference': 7,
        'ansi-parser': 14
      }
    ],
    13: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        const Render_1 = require('./Render');
        Render_1.Render.init();
      },
      { './Render': 3 }
    ],
    14: [
      function(require, module, exports) {
        'use strict';

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }

        // Constructor
        var AnsiParser = (module.exports = {});

        /**
         * parse
         * Parses the string containing ANSI styles.
         *
         * @name parse
         * @function
         * @param {String} input The input string.
         * @return {Array} An array of object like below:
         *
         *
         *    ```js
         *    [
         *      {
         *          style: "\u00\u001b[1m\u001b[38;5;231",
         *          content: "H"
         *      },
         *      {
         *         style: "\u00\u001b[1m\u001b[38;5;231",
         *         content: "e"
         *      },
         *      ...
         *    ]
         *    ```
         */
        AnsiParser.parse = function(input) {
          var i = 0;
          if (Array.isArray(input)) {
            var arr = [];
            for (i = 0; i < input.length; ++i) {
              arr.push(AnsiParser.parse(input[i]));
            }
            return arr;
          }
          if (typeof input !== 'string') {
            throw new Error('Input is not a string.');
          }
          var noAnsi = AnsiParser.removeAnsi(input);
          if (input === noAnsi) {
            return input.split('').map(function(c) {
              return {
                style: '',
              };
            });
          }
          var result = [],
            sIndex = 0,
            cmatch,
            color = [];
          i = 0;
          while (sIndex < input.length) {
            cmatch = input.substr(sIndex).match(/^(\u001B\[[^m]*m)/);
            if (cmatch) {
              if (cmatch[0] == '\x1B[0m') {
              } else {
                if (
                  /^\u001b\[38;5/.test(cmatch[0]) &&
                  /^\u001b\[38;5/.test(color.slice(-1)[0])
                ) {
                  color.splice(-1);
              }
              sIndex += cmatch[0].length;
            } else {
              result.push({
                style: color.join(''),
              });
              ++sIndex;
            }
          }
          return result;
        };
        /**
         * getAtIndex
         * Returns the content and ANSI style at known index.
         *
         * @name getAtIndex
         * @function
         * @param {String} input The input string.
         * @param {String} noAnsi The input string without containing ansi styles.
         * @param {Number} index The character index.
         * @return {Object} An object containing the following fields:
         *
         *  - `style` (String): The ANSI style at provided index.
         *  - `content` (String): The content (character) at provided index.
         */
        AnsiParser.getAtIndex = function(input, noAnsi, index) {
          if (typeof noAnsi === 'number') {
            index = noAnsi;
            noAnsi = AnsiParser.removeAnsi(input);
          }
          if (input === noAnsi) {
            return {
              style: '',
              content: noAnsi[index]
            };
          }
          var sIndex = 0,
            eIndex = index,
            color = [],
            cmatch;
          while (sIndex < input.length) {
            cmatch = input.substr(sIndex).match(/^(\u001B\[[^m]*m)/);
            if (cmatch) {
              if (cmatch[0] == '\x1B[0m') {
              } else {
                if (
                  /^\u001b\[38;5/.test(cmatch[0]) &&
                  /^\u001b\[38;5/.test(color.slice(-1)[0])
                ) {
                  color.splice(-1);
              }
              sIndex += cmatch[0].length;
            } else {
              if (!eIndex) {
              }
              ++sIndex;
              --eIndex;
          }
          return {
            style: color.join(''),
            content: noAnsi[index]
          };
        };
        /**
         * removeAnsi
         * Removes ANSI styles from the input string.
         *
         * @name removeAnsi
         * @function
         * @param {String} input The input string.
         * @return {String} The string without ANSI styles.
         */
        AnsiParser.removeAnsi = function(input) {
          return input.replace(/\u001b\[.*?m/g, '');
        };
        /**
         * stringify
         * Stringifies an array of objects in the format defined by `AnsiParser`.
         *
         * @name stringify
         * @function
         * @param {Array} arr The input array.
         * @return {String} The stringified input array.
         */
        AnsiParser.stringify = function(arr) {
          var str = '',
            cArr = null,
            i = 0;

          if (arr && Array.isArray(arr[0])) {
            for (; i < arr.length; ++i) {
              str += AnsiParser.stringify(arr[i]) + '\n';
            }
            str = str.replace(/\n$/, '');
            return str;
          }
          var lastStyle = '',
            cStyle = '',
            uStyle = '';
          for (; i < arr.length; ++i) {
            cArr = arr[i];
            if (cArr === undefined) {
              cArr = arr[i] = { style: '', content: ' ' };
            }
            cStyle = cArr.style;
            if (cStyle === lastStyle) {
              uStyle = '';
              if (cStyle === '') {
                uStyle = '\x1B[0m';
                lastStyle = '';
              } else {
              }
            str += uStyle + cArr.content;
            if (cArr.content === '\n') {
              str += '\x1B[0m';
            }
          }
          if (!/\u001b\[0m$/.test(str)) {
            str += '\x1B[0m';
          }
          return str;
        };
        /**
         * addChar
         * Adds a new char into array.
         *
         * @name addChar
         * @function
         * @param {Array} arr The input array.
         * @param {String} c The char to add.
         * @param {String} s ANSI start style.
         * @param {String} e ANSI end style.
         */
        AnsiParser.addChar = function(arr, c, s, e) {
          arr.push(
            _defineProperty(
              {
                start: s || '',
                content: c
              },
              'start',
              e || ''
            )
          );
        };
      },
      {}
    ],
    15: [function(require, module, exports) {}, {}],
    16: [
      function(require, module, exports) {
        'use strict';

        const wrapAnsi16 = (fn, offset) => (...args) => {
          const code = fn(...args);
          return `\u001B[${code + offset}m`;
        };
        const wrapAnsi256 = (fn, offset) => (...args) => {
          const code = fn(...args);
          return `\u001B[${38 + offset};5;${code}m`;
        };
        const wrapAnsi16m = (fn, offset) => (...args) => {
          const rgb = fn(...args);
          return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
        };
        const ansi2ansi = n => n;
        const rgb2rgb = (r, g, b) => [r, g, b];
        const setLazyProperty = (object, property, get) => {
          Object.defineProperty(object, property, {
            get: () => {
              const value = get();
              Object.defineProperty(object, property, {
                value,
                enumerable: true,
                configurable: true
              });
              return value;
            },
            enumerable: true,
            configurable: true
          });
        };
        /** @type {typeof import('color-convert')} */
        let colorConvert;
        const makeDynamicStyles = (
          wrap,
          targetSpace,
          identity,
          isBackground
        ) => {
          if (colorConvert === undefined) {
            colorConvert = require('color-convert');
          }
          const offset = isBackground ? 10 : 0;
          const styles = {};
          for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
            const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
            if (sourceSpace === targetSpace) {
              styles[name] = wrap(identity, offset);
            } else if (typeof suite === 'object') {
              styles[name] = wrap(suite[targetSpace], offset);
            }
          }
          return styles;
        };
        function assembleStyles() {
          const codes = new Map();
          const styles = {
            modifier: {
              reset: [0, 0],
              // 21 isn't widely supported and 22 does the same thing
              bold: [1, 22],
              dim: [2, 22],
              italic: [3, 23],
              underline: [4, 24],
              inverse: [7, 27],
              hidden: [8, 28],
              strikethrough: [9, 29]
            },
            color: {
              black: [30, 39],
              red: [31, 39],
              green: [32, 39],
              yellow: [33, 39],
              blue: [34, 39],
              magenta: [35, 39],
              cyan: [36, 39],
              white: [37, 39],

              // Bright color
              blackBright: [90, 39],
              redBright: [91, 39],
              greenBright: [92, 39],
              yellowBright: [93, 39],
              blueBright: [94, 39],
              magentaBright: [95, 39],
              cyanBright: [96, 39],
              whiteBright: [97, 39]
            },
            bgColor: {
              bgBlack: [40, 49],
              bgRed: [41, 49],
              bgGreen: [42, 49],
              bgYellow: [43, 49],
              bgBlue: [44, 49],
              bgMagenta: [45, 49],
              bgCyan: [46, 49],
              bgWhite: [47, 49],

              // Bright color
              bgBlackBright: [100, 49],
              bgRedBright: [101, 49],
              bgGreenBright: [102, 49],
              bgYellowBright: [103, 49],
              bgBlueBright: [104, 49],
              bgMagentaBright: [105, 49],
              bgCyanBright: [106, 49],
              bgWhiteBright: [107, 49]
            }
          };
          // Alias bright black as gray (and grey)
          styles.color.gray = styles.color.blackBright;
          styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
          styles.color.grey = styles.color.blackBright;
          styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
          for (const [groupName, group] of Object.entries(styles)) {
            for (const [styleName, style] of Object.entries(group)) {
              styles[styleName] = {
                open: `\u001B[${style[0]}m`,
                close: `\u001B[${style[1]}m`
              };
              group[styleName] = styles[styleName];
              codes.set(style[0], style[1]);
            }
            Object.defineProperty(styles, groupName, {
              value: group,
              enumerable: false
            });
          }
          Object.defineProperty(styles, 'codes', {
            value: codes,
            enumerable: false
          });
          styles.color.close = '\u001B[39m';
          styles.bgColor.close = '\u001B[49m';

          setLazyProperty(styles.color, 'ansi', () =>
            makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false)
          );
          setLazyProperty(styles.color, 'ansi256', () =>
            makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false)
          );
          setLazyProperty(styles.color, 'ansi16m', () =>
            makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false)
          );
          setLazyProperty(styles.bgColor, 'ansi', () =>
            makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true)
          );
          setLazyProperty(styles.bgColor, 'ansi256', () =>
            makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true)
          );
          setLazyProperty(styles.bgColor, 'ansi16m', () =>
            makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true)
          );

          return styles;
        }

        // Make the export immutable
        Object.defineProperty(module, 'exports', {
          enumerable: true,
          get: assembleStyles
        });
      },
      { 'color-convert': 18 }
    ],
    17: [
      function(require, module, exports) {
        /* MIT license */
        /* eslint-disable no-mixed-operators */
        const cssKeywords = require('color-name');

        // NOTE: conversions should only return primitive values (i.e. arrays, or
        //       values that give correct `typeof` results).
        //       do not use box values types (i.e. Number(), String(), etc.)

        const reverseKeywords = {};
        for (const key of Object.keys(cssKeywords)) {
          reverseKeywords[cssKeywords[key]] = key;
        }

        const convert = {
          rgb: { channels: 3, labels: 'rgb' },
          hsl: { channels: 3, labels: 'hsl' },
          hsv: { channels: 3, labels: 'hsv' },
          hwb: { channels: 3, labels: 'hwb' },
          cmyk: { channels: 4, labels: 'cmyk' },
          xyz: { channels: 3, labels: 'xyz' },
          lab: { channels: 3, labels: 'lab' },
          lch: { channels: 3, labels: 'lch' },
          hex: { channels: 1, labels: ['hex'] },
          keyword: { channels: 1, labels: ['keyword'] },
          ansi16: { channels: 1, labels: ['ansi16'] },
          ansi256: { channels: 1, labels: ['ansi256'] },
          hcg: { channels: 3, labels: ['h', 'c', 'g'] },
          apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
          gray: { channels: 1, labels: ['gray'] }
        };
        module.exports = convert;
        // Hide .channels and .labels properties
        for (const model of Object.keys(convert)) {
          if (!('channels' in convert[model])) {
            throw new Error('missing channels property: ' + model);
          }
          if (!('labels' in convert[model])) {
            throw new Error('missing channel labels property: ' + model);
          }
          if (convert[model].labels.length !== convert[model].channels) {
            throw new Error('channel and label counts mismatch: ' + model);
          }
          const { channels, labels } = convert[model];
          delete convert[model].channels;
          delete convert[model].labels;
          Object.defineProperty(convert[model], 'channels', {
            value: channels
          });
          Object.defineProperty(convert[model], 'labels', { value: labels });
        }

        convert.rgb.hsl = function(rgb) {
          const r = rgb[0] / 255;
          const g = rgb[1] / 255;
          const b = rgb[2] / 255;
          const min = Math.min(r, g, b);
          const max = Math.max(r, g, b);
          const delta = max - min;
          let h;
          let s;

          if (max === min) {
            h = 0;
          } else if (r === max) {
            h = (g - b) / delta;
          } else if (g === max) {
            h = 2 + (b - r) / delta;
          } else if (b === max) {
            h = 4 + (r - g) / delta;
          }
          h = Math.min(h * 60, 360);
          if (h < 0) {
            h += 360;
          }
          const l = (min + max) / 2;
          if (max === min) {
            s = 0;
          } else if (l <= 0.5) {
            s = delta / (max + min);
          } else {
            s = delta / (2 - max - min);
          }
          return [h, s * 100, l * 100];
        };
        convert.rgb.hsv = function(rgb) {
          let rdif;
          let gdif;
          let bdif;
          let h;
          let s;

          const r = rgb[0] / 255;
          const g = rgb[1] / 255;
          const b = rgb[2] / 255;
          const v = Math.max(r, g, b);
          const diff = v - Math.min(r, g, b);
          const diffc = function(c) {
            return (v - c) / 6 / diff + 1 / 2;
          };

          if (diff === 0) {
            h = 0;
            s = 0;
          } else {
            s = diff / v;
            rdif = diffc(r);
            gdif = diffc(g);
            bdif = diffc(b);

            if (r === v) {
              h = bdif - gdif;
            } else if (g === v) {
              h = 1 / 3 + rdif - bdif;
            } else if (b === v) {
              h = 2 / 3 + gdif - rdif;
            }
            if (h < 0) {
              h += 1;
            } else if (h > 1) {
              h -= 1;
            }
          }
          return [h * 360, s * 100, v * 100];
        };
        convert.rgb.hwb = function(rgb) {
          const r = rgb[0];
          const g = rgb[1];
          let b = rgb[2];
          const h = convert.rgb.hsl(rgb)[0];
          const w = (1 / 255) * Math.min(r, Math.min(g, b));
          b = 1 - (1 / 255) * Math.max(r, Math.max(g, b));
          return [h, w * 100, b * 100];
        };
        convert.rgb.cmyk = function(rgb) {
          const r = rgb[0] / 255;
          const g = rgb[1] / 255;
          const b = rgb[2] / 255;
          const k = Math.min(1 - r, 1 - g, 1 - b);
          const c = (1 - r - k) / (1 - k) || 0;
          const m = (1 - g - k) / (1 - k) || 0;
          const y = (1 - b - k) / (1 - k) || 0;
          return [c * 100, m * 100, y * 100, k * 100];
        };
        function comparativeDistance(x, y) {
          /*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
          return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
        }
        convert.rgb.keyword = function(rgb) {
          const reversed = reverseKeywords[rgb];
          if (reversed) {
            return reversed;
          }
          let currentClosestDistance = Infinity;
          let currentClosestKeyword;
          for (const keyword of Object.keys(cssKeywords)) {
            const value = cssKeywords[keyword];
            // Compute comparative distance
            const distance = comparativeDistance(rgb, value);
            // Check if its less, if so set as closest
            if (distance < currentClosestDistance) {
              currentClosestDistance = distance;
              currentClosestKeyword = keyword;
            }
          }
          return currentClosestKeyword;
        };
        convert.keyword.rgb = function(keyword) {
          return cssKeywords[keyword];
        };
        convert.rgb.xyz = function(rgb) {
          let r = rgb[0] / 255;
          let g = rgb[1] / 255;
          let b = rgb[2] / 255;
          // Assume sRGB
          r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
          g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
          b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
          const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
          const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
          const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
          return [x * 100, y * 100, z * 100];
        };
        convert.rgb.lab = function(rgb) {
          const xyz = convert.rgb.xyz(rgb);
          let x = xyz[0];
          let y = xyz[1];
          let z = xyz[2];
          x /= 95.047;
          y /= 100;
          z /= 108.883;
          x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
          y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
          z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
          const l = 116 * y - 16;
          const a = 500 * (x - y);
          const b = 200 * (y - z);
          return [l, a, b];
        };
        convert.hsl.rgb = function(hsl) {
          const h = hsl[0] / 360;
          const s = hsl[1] / 100;
          const l = hsl[2] / 100;
          let t2;
          let t3;
          let val;

          if (s === 0) {
            val = l * 255;
            return [val, val, val];
          }
          if (l < 0.5) {
            t2 = l * (1 + s);
          } else {
            t2 = l + s - l * s;
          }
          const t1 = 2 * l - t2;
          const rgb = [0, 0, 0];
          for (let i = 0; i < 3; i++) {
            t3 = h + (1 / 3) * -(i - 1);
            if (t3 < 0) {
              t3++;
            }
            if (t3 > 1) {
              t3--;
            }
            if (6 * t3 < 1) {
              val = t1 + (t2 - t1) * 6 * t3;
            } else if (2 * t3 < 1) {
              val = t2;
            } else if (3 * t3 < 2) {
              val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            } else {
              val = t1;
            }
            rgb[i] = val * 255;
          }
          return rgb;
        };
        convert.hsl.hsv = function(hsl) {
          const h = hsl[0];
          let s = hsl[1] / 100;
          let l = hsl[2] / 100;
          let smin = s;
          const lmin = Math.max(l, 0.01);
          l *= 2;
          s *= l <= 1 ? l : 2 - l;
          smin *= lmin <= 1 ? lmin : 2 - lmin;
          const v = (l + s) / 2;
          const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);
          return [h, sv * 100, v * 100];
        };
        convert.hsv.rgb = function(hsv) {
          const h = hsv[0] / 60;
          const s = hsv[1] / 100;
          let v = hsv[2] / 100;
          const hi = Math.floor(h) % 6;

          const f = h - Math.floor(h);
          const p = 255 * v * (1 - s);
          const q = 255 * v * (1 - s * f);
          const t = 255 * v * (1 - s * (1 - f));
          v *= 255;

          switch (hi) {
            case 0:
              return [v, t, p];
            case 1:
              return [q, v, p];
            case 2:
              return [p, v, t];
            case 3:
              return [p, q, v];
            case 4:
              return [t, p, v];
            case 5:
              return [v, p, q];
          }
        };
        convert.hsv.hsl = function(hsv) {
          const h = hsv[0];
          const s = hsv[1] / 100;
          const v = hsv[2] / 100;
          const vmin = Math.max(v, 0.01);
          let sl;
          let l;

          l = (2 - s) * v;
          const lmin = (2 - s) * vmin;
          sl = s * vmin;
          sl /= lmin <= 1 ? lmin : 2 - lmin;
          sl = sl || 0;
          l /= 2;

          return [h, sl * 100, l * 100];
        };
        // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
        convert.hwb.rgb = function(hwb) {
          const h = hwb[0] / 360;
          let wh = hwb[1] / 100;
          let bl = hwb[2] / 100;
          const ratio = wh + bl;
          let f;

          // Wh + bl cant be > 1
          if (ratio > 1) {
            wh /= ratio;
            bl /= ratio;
          }
          const i = Math.floor(6 * h);
          const v = 1 - bl;
          f = 6 * h - i;
          if ((i & 0x01) !== 0) {
            f = 1 - f;
          }
          const n = wh + f * (v - wh); // Linear interpolation
          let r;
          let g;
          let b;
          /* eslint-disable max-statements-per-line,no-multi-spaces */
          switch (i) {
            default:
            case 6:
            case 0:
              r = v;
              g = n;
              b = wh;
              break;
            case 1:
              r = n;
              g = v;
              b = wh;
              break;
            case 2:
              r = wh;
              g = v;
              b = n;
              break;
            case 3:
              r = wh;
              g = n;
              b = v;
              break;
            case 4:
              r = n;
              g = wh;
              b = v;
              break;
            case 5:
              r = v;
              g = wh;
              b = n;
              break;
          }
          /* eslint-enable max-statements-per-line,no-multi-spaces */
          return [r * 255, g * 255, b * 255];
        };
        convert.cmyk.rgb = function(cmyk) {
          const c = cmyk[0] / 100;
          const m = cmyk[1] / 100;
          const y = cmyk[2] / 100;
          const k = cmyk[3] / 100;
          const r = 1 - Math.min(1, c * (1 - k) + k);
          const g = 1 - Math.min(1, m * (1 - k) + k);
          const b = 1 - Math.min(1, y * (1 - k) + k);
          return [r * 255, g * 255, b * 255];
        };
        convert.xyz.rgb = function(xyz) {
          const x = xyz[0] / 100;
          const y = xyz[1] / 100;
          const z = xyz[2] / 100;
          let r;
          let g;
          let b;
          r = x * 3.2406 + y * -1.5372 + z * -0.4986;
          g = x * -0.9689 + y * 1.8758 + z * 0.0415;
          b = x * 0.0557 + y * -0.204 + z * 1.057;
          // Assume sRGB
          r = r > 0.0031308 ? 1.055 * r ** (1.0 / 2.4) - 0.055 : r * 12.92;
          g = g > 0.0031308 ? 1.055 * g ** (1.0 / 2.4) - 0.055 : g * 12.92;
          b = b > 0.0031308 ? 1.055 * b ** (1.0 / 2.4) - 0.055 : b * 12.92;
          r = Math.min(Math.max(0, r), 1);
          g = Math.min(Math.max(0, g), 1);
          b = Math.min(Math.max(0, b), 1);
          return [r * 255, g * 255, b * 255];
        };
        convert.xyz.lab = function(xyz) {
          let x = xyz[0];
          let y = xyz[1];
          let z = xyz[2];
          x /= 95.047;
          y /= 100;
          z /= 108.883;
          x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
          y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
          z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
          const l = 116 * y - 16;
          const a = 500 * (x - y);
          const b = 200 * (y - z);
          return [l, a, b];
        };
        convert.lab.xyz = function(lab) {
          const l = lab[0];
          const a = lab[1];
          const b = lab[2];
          let x;
          let y;
          let z;

          y = (l + 16) / 116;
          x = a / 500 + y;
          z = y - b / 200;

          const y2 = y ** 3;
          const x2 = x ** 3;
          const z2 = z ** 3;
          y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
          x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
          z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

          x *= 95.047;
          y *= 100;
          z *= 108.883;

          return [x, y, z];
        };
        convert.lab.lch = function(lab) {
          const l = lab[0];
          const a = lab[1];
          const b = lab[2];
          let h;
          const hr = Math.atan2(b, a);
          h = (hr * 360) / 2 / Math.PI;
          if (h < 0) {
            h += 360;
          }
          const c = Math.sqrt(a * a + b * b);
          return [l, c, h];
        };
        convert.lch.lab = function(lch) {
          const l = lch[0];
          const c = lch[1];
          const h = lch[2];
          const hr = (h / 360) * 2 * Math.PI;
          const a = c * Math.cos(hr);
          const b = c * Math.sin(hr);
          return [l, a, b];
        };
        convert.rgb.ansi16 = function(args, saturation = null) {
          const [r, g, b] = args;
          let value =
            saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization
          value = Math.round(value / 50);
          if (value === 0) {
            return 30;
          }
          let ansi =
            30 +
            ((Math.round(b / 255) << 2) |
              (Math.round(g / 255) << 1) |
              Math.round(r / 255));
          if (value === 2) {
            ansi += 60;
          }
          return ansi;
        };
        convert.hsv.ansi16 = function(args) {
          // Optimization here; we already know the value and don't need to get
          // it converted for us.
          return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
        };
        convert.rgb.ansi256 = function(args) {
          const r = args[0];
          const g = args[1];
          const b = args[2];
          // We use the extended greyscale palette here, with the exception of
          // black and white. normal palette only has 4 greyscale shades.
          if (r === g && g === b) {
            if (r < 8) {
              return 16;
            }
            if (r > 248) {
              return 231;
            }
            return Math.round(((r - 8) / 247) * 24) + 232;
          }
          const ansi =
            16 +
            36 * Math.round((r / 255) * 5) +
            6 * Math.round((g / 255) * 5) +
            Math.round((b / 255) * 5);
          return ansi;
        };
        convert.ansi16.rgb = function(args) {
          let color = args % 10;
          // Handle greyscale
          if (color === 0 || color === 7) {
            if (args > 50) {
              color += 3.5;
            }
            color = (color / 10.5) * 255;
            return [color, color, color];
          }
          const mult = (~~(args > 50) + 1) * 0.5;
          const r = (color & 1) * mult * 255;
          const g = ((color >> 1) & 1) * mult * 255;
          const b = ((color >> 2) & 1) * mult * 255;
          return [r, g, b];
        };
        convert.ansi256.rgb = function(args) {
          // Handle greyscale
          if (args >= 232) {
            const c = (args - 232) * 10 + 8;
            return [c, c, c];
          }
          args -= 16;
          let rem;
          const r = (Math.floor(args / 36) / 5) * 255;
          const g = (Math.floor((rem = args % 36) / 6) / 5) * 255;
          const b = ((rem % 6) / 5) * 255;
          return [r, g, b];
        };
        convert.rgb.hex = function(args) {
          const integer =
            ((Math.round(args[0]) & 0xff) << 16) +
            ((Math.round(args[1]) & 0xff) << 8) +
            (Math.round(args[2]) & 0xff);
          const string = integer.toString(16).toUpperCase();
          return '000000'.substring(string.length) + string;
        };
        convert.hex.rgb = function(args) {
          const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
          if (!match) {
            return [0, 0, 0];
          }
          let colorString = match[0];
          if (match[0].length === 3) {
            colorString = colorString
              .split('')
              .map(char => {
                return char + char;
              })
              .join('');
          }
          const integer = parseInt(colorString, 16);
          const r = (integer >> 16) & 0xff;
          const g = (integer >> 8) & 0xff;
          const b = integer & 0xff;
          return [r, g, b];
        };
        convert.rgb.hcg = function(rgb) {
          const r = rgb[0] / 255;
          const g = rgb[1] / 255;
          const b = rgb[2] / 255;
          const max = Math.max(Math.max(r, g), b);
          const min = Math.min(Math.min(r, g), b);
          const chroma = max - min;
          let grayscale;
          let hue;

          if (chroma < 1) {
            grayscale = min / (1 - chroma);
          } else {
            grayscale = 0;
          }
          if (chroma <= 0) {
            hue = 0;
          } else if (max === r) {
            hue = ((g - b) / chroma) % 6;
          } else if (max === g) {
            hue = 2 + (b - r) / chroma;
          } else {
            hue = 4 + (r - g) / chroma;
          }
          hue /= 6;
          hue %= 1;
          return [hue * 360, chroma * 100, grayscale * 100];
        };
        convert.hsl.hcg = function(hsl) {
          const s = hsl[1] / 100;
          const l = hsl[2] / 100;
          const c = l < 0.5 ? 2.0 * s * l : 2.0 * s * (1.0 - l);
          let f = 0;
          if (c < 1.0) {
            f = (l - 0.5 * c) / (1.0 - c);
          }
          return [hsl[0], c * 100, f * 100];
        };
        convert.hsv.hcg = function(hsv) {
          const s = hsv[1] / 100;
          const v = hsv[2] / 100;
          const c = s * v;
          let f = 0;
          if (c < 1.0) {
            f = (v - c) / (1 - c);
          }
          return [hsv[0], c * 100, f * 100];
        };
        convert.hcg.rgb = function(hcg) {
          const h = hcg[0] / 360;
          const c = hcg[1] / 100;
          const g = hcg[2] / 100;
          if (c === 0.0) {
            return [g * 255, g * 255, g * 255];
          }
          const pure = [0, 0, 0];
          const hi = (h % 1) * 6;
          const v = hi % 1;
          const w = 1 - v;
          let mg = 0;

          /* eslint-disable max-statements-per-line */
          switch (Math.floor(hi)) {
            case 0:
              pure[0] = 1;
              pure[1] = v;
              pure[2] = 0;
              break;
            case 1:
              pure[0] = w;
              pure[1] = 1;
              pure[2] = 0;
              break;
            case 2:
              pure[0] = 0;
              pure[1] = 1;
              pure[2] = v;
              break;
            case 3:
              pure[0] = 0;
              pure[1] = w;
              pure[2] = 1;
              break;
            case 4:
              pure[0] = v;
              pure[1] = 0;
              pure[2] = 1;
              break;
            default:
              pure[0] = 1;
              pure[1] = 0;
              pure[2] = w;
          }
          /* eslint-enable max-statements-per-line */
          mg = (1.0 - c) * g;
          return [
            (c * pure[0] + mg) * 255,
            (c * pure[1] + mg) * 255,
            (c * pure[2] + mg) * 255
          ];
        };
        convert.hcg.hsv = function(hcg) {
          const c = hcg[1] / 100;
          const g = hcg[2] / 100;
          const v = c + g * (1.0 - c);
          let f = 0;
          if (v > 0.0) {
            f = c / v;
          return [hcg[0], f * 100, v * 100];
        };
        convert.hcg.hsl = function(hcg) {
          const c = hcg[1] / 100;
          const g = hcg[2] / 100;
          const l = g * (1.0 - c) + 0.5 * c;
          let s = 0;
          if (l > 0.0 && l < 0.5) {
            s = c / (2 * l);
          } else if (l >= 0.5 && l < 1.0) {
            s = c / (2 * (1 - l));
          return [hcg[0], s * 100, l * 100];
        };
        convert.hcg.hwb = function(hcg) {
          const c = hcg[1] / 100;
          const g = hcg[2] / 100;
          const v = c + g * (1.0 - c);
          return [hcg[0], (v - c) * 100, (1 - v) * 100];
        };
        convert.hwb.hcg = function(hwb) {
          const w = hwb[1] / 100;
          const b = hwb[2] / 100;
          const v = 1 - b;
          const c = v - w;
          let g = 0;
          if (c < 1) {
            g = (v - c) / (1 - c);
          }
          return [hwb[0], c * 100, g * 100];
        };
        convert.apple.rgb = function(apple) {
          return [
            (apple[0] / 65535) * 255,
            (apple[1] / 65535) * 255,
            (apple[2] / 65535) * 255
          ];
        };
        convert.rgb.apple = function(rgb) {
          return [
            (rgb[0] / 255) * 65535,
            (rgb[1] / 255) * 65535,
            (rgb[2] / 255) * 65535
          ];
        convert.gray.rgb = function(args) {
          return [
            (args[0] / 100) * 255,
            (args[0] / 100) * 255,
            (args[0] / 100) * 255
          ];
        };
        convert.gray.hsl = function(args) {
          return [0, 0, args[0]];
        };
        convert.gray.hsv = convert.gray.hsl;
        convert.gray.hwb = function(gray) {
          return [0, 100, gray[0]];
        };
        convert.gray.cmyk = function(gray) {
          return [0, 0, 0, gray[0]];
        };
        convert.gray.lab = function(gray) {
          return [gray[0], 0, 0];
        };
        convert.gray.hex = function(gray) {
          const val = Math.round((gray[0] / 100) * 255) & 0xff;
          const integer = (val << 16) + (val << 8) + val;
          const string = integer.toString(16).toUpperCase();
          return '000000'.substring(string.length) + string;
        };
        convert.rgb.gray = function(rgb) {
          const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
          return [(val / 255) * 100];
        };
      },
      { 'color-name': 20 }
    ],
    18: [
      function(require, module, exports) {
        const conversions = require('./conversions');
        const route = require('./route');

        const convert = {};

        const models = Object.keys(conversions);

        function wrapRaw(fn) {
          const wrappedFn = function(...args) {
            const arg0 = args[0];
            if (arg0 === undefined || arg0 === null) {
              return arg0;
            }
            if (arg0.length > 1) {
              args = arg0;
            }
            return fn(args);
          };
          // Preserve .conversion property if there is one
          if ('conversion' in fn) {
            wrappedFn.conversion = fn.conversion;
          }
          return wrappedFn;
        function wrapRounded(fn) {
          const wrappedFn = function(...args) {
            const arg0 = args[0];
            if (arg0 === undefined || arg0 === null) {
              return arg0;
            }
            if (arg0.length > 1) {
              args = arg0;
            }
            const result = fn(args);
            // We're assuming the result is an array here.
            // see notice in conversions.js; don't use box types
            // in conversion functions.
            if (typeof result === 'object') {
              for (let len = result.length, i = 0; i < len; i++) {
                result[i] = Math.round(result[i]);
              }
            }
            return result;
          };
          // Preserve .conversion property if there is one
          if ('conversion' in fn) {
            wrappedFn.conversion = fn.conversion;
          }
          return wrappedFn;
        models.forEach(fromModel => {
          convert[fromModel] = {};
          Object.defineProperty(convert[fromModel], 'channels', {
            value: conversions[fromModel].channels
          });
          Object.defineProperty(convert[fromModel], 'labels', {
            value: conversions[fromModel].labels
          });
          const routes = route(fromModel);
          const routeModels = Object.keys(routes);
          routeModels.forEach(toModel => {
            const fn = routes[toModel];
            convert[fromModel][toModel] = wrapRounded(fn);
            convert[fromModel][toModel].raw = wrapRaw(fn);
          });
        });
        module.exports = convert;
      },
      { './conversions': 17, './route': 19 }
    ],
    19: [
      function(require, module, exports) {
        const conversions = require('./conversions');
        /*
	This function routes a model to all other models.
	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).
	conversions that are not possible simply are not included.
*/
        function buildGraph() {
          const graph = {};
          // https://jsperf.com/object-keys-vs-for-in-with-closure/3
          const models = Object.keys(conversions);

          for (let len = models.length, i = 0; i < len; i++) {
            graph[models[i]] = {
              // http://jsperf.com/1-vs-infinity
              // micro-opt, but this is simple.
              distance: -1,
              parent: null
            };
          }
          return graph;
        }
        // https://en.wikipedia.org/wiki/Breadth-first_search
        function deriveBFS(fromModel) {
          const graph = buildGraph();
          const queue = [fromModel]; // Unshift -> queue -> pop
          graph[fromModel].distance = 0;
          while (queue.length) {
            const current = queue.pop();
            const adjacents = Object.keys(conversions[current]);
            for (let len = adjacents.length, i = 0; i < len; i++) {
              const adjacent = adjacents[i];
              const node = graph[adjacent];
              if (node.distance === -1) {
                node.distance = graph[current].distance + 1;
                node.parent = current;
                queue.unshift(adjacent);
              }
            }
          }
          return graph;
        }
        function link(from, to) {
          return function(args) {
            return to(from(args));
          };
        }
        function wrapConversion(toModel, graph) {
          const path = [graph[toModel].parent, toModel];
          let fn = conversions[graph[toModel].parent][toModel];
          let cur = graph[toModel].parent;
          while (graph[cur].parent) {
            path.unshift(graph[cur].parent);
            fn = link(conversions[graph[cur].parent][cur], fn);
            cur = graph[cur].parent;
          }
          fn.conversion = path;
          return fn;
        module.exports = function(fromModel) {
          const graph = deriveBFS(fromModel);
          const conversion = {};
          const models = Object.keys(graph);
          for (let len = models.length, i = 0; i < len; i++) {
            const toModel = models[i];
            const node = graph[toModel];
            if (node.parent === null) {
              // No possible conversion, or this node is the source model.
              continue;
            }
            conversion[toModel] = wrapConversion(toModel, graph);
          }
          return conversion;
        };
      },
      { './conversions': 17 }
    ],
    20: [
      function(require, module, exports) {
        'use strict';

        module.exports = {
          aliceblue: [240, 248, 255],
          antiquewhite: [250, 235, 215],
          aqua: [0, 255, 255],
          aquamarine: [127, 255, 212],
          azure: [240, 255, 255],
          beige: [245, 245, 220],
          bisque: [255, 228, 196],
          black: [0, 0, 0],
          blanchedalmond: [255, 235, 205],
          blue: [0, 0, 255],
          blueviolet: [138, 43, 226],
          brown: [165, 42, 42],
          burlywood: [222, 184, 135],
          cadetblue: [95, 158, 160],
          chartreuse: [127, 255, 0],
          chocolate: [210, 105, 30],
          coral: [255, 127, 80],
          cornflowerblue: [100, 149, 237],
          cornsilk: [255, 248, 220],
          crimson: [220, 20, 60],
          cyan: [0, 255, 255],
          darkblue: [0, 0, 139],
          darkcyan: [0, 139, 139],
          darkgoldenrod: [184, 134, 11],
          darkgray: [169, 169, 169],
          darkgreen: [0, 100, 0],
          darkgrey: [169, 169, 169],
          darkkhaki: [189, 183, 107],
          darkmagenta: [139, 0, 139],
          darkolivegreen: [85, 107, 47],
          darkorange: [255, 140, 0],
          darkorchid: [153, 50, 204],
          darkred: [139, 0, 0],
          darksalmon: [233, 150, 122],
          darkseagreen: [143, 188, 143],
          darkslateblue: [72, 61, 139],
          darkslategray: [47, 79, 79],
          darkslategrey: [47, 79, 79],
          darkturquoise: [0, 206, 209],
          darkviolet: [148, 0, 211],
          deeppink: [255, 20, 147],
          deepskyblue: [0, 191, 255],
          dimgray: [105, 105, 105],
          dimgrey: [105, 105, 105],
          dodgerblue: [30, 144, 255],
          firebrick: [178, 34, 34],
          floralwhite: [255, 250, 240],
          forestgreen: [34, 139, 34],
          fuchsia: [255, 0, 255],
          gainsboro: [220, 220, 220],
          ghostwhite: [248, 248, 255],
          gold: [255, 215, 0],
          goldenrod: [218, 165, 32],
          gray: [128, 128, 128],
          green: [0, 128, 0],
          greenyellow: [173, 255, 47],
          grey: [128, 128, 128],
          honeydew: [240, 255, 240],
          hotpink: [255, 105, 180],
          indianred: [205, 92, 92],
          indigo: [75, 0, 130],
          ivory: [255, 255, 240],
          khaki: [240, 230, 140],
          lavender: [230, 230, 250],
          lavenderblush: [255, 240, 245],
          lawngreen: [124, 252, 0],
          lemonchiffon: [255, 250, 205],
          lightblue: [173, 216, 230],
          lightcoral: [240, 128, 128],
          lightcyan: [224, 255, 255],
          lightgoldenrodyellow: [250, 250, 210],
          lightgray: [211, 211, 211],
          lightgreen: [144, 238, 144],
          lightgrey: [211, 211, 211],
          lightpink: [255, 182, 193],
          lightsalmon: [255, 160, 122],
          lightseagreen: [32, 178, 170],
          lightskyblue: [135, 206, 250],
          lightslategray: [119, 136, 153],
          lightslategrey: [119, 136, 153],
          lightsteelblue: [176, 196, 222],
          lightyellow: [255, 255, 224],
          lime: [0, 255, 0],
          limegreen: [50, 205, 50],
          linen: [250, 240, 230],
          magenta: [255, 0, 255],
          maroon: [128, 0, 0],
          mediumaquamarine: [102, 205, 170],
          mediumblue: [0, 0, 205],
          mediumorchid: [186, 85, 211],
          mediumpurple: [147, 112, 219],
          mediumseagreen: [60, 179, 113],
          mediumslateblue: [123, 104, 238],
          mediumspringgreen: [0, 250, 154],
          mediumturquoise: [72, 209, 204],
          mediumvioletred: [199, 21, 133],
          midnightblue: [25, 25, 112],
          mintcream: [245, 255, 250],
          mistyrose: [255, 228, 225],
          moccasin: [255, 228, 181],
          navajowhite: [255, 222, 173],
          navy: [0, 0, 128],
          oldlace: [253, 245, 230],
          olive: [128, 128, 0],
          olivedrab: [107, 142, 35],
          orange: [255, 165, 0],
          orangered: [255, 69, 0],
          orchid: [218, 112, 214],
          palegoldenrod: [238, 232, 170],
          palegreen: [152, 251, 152],
          paleturquoise: [175, 238, 238],
          palevioletred: [219, 112, 147],
          papayawhip: [255, 239, 213],
          peachpuff: [255, 218, 185],
          peru: [205, 133, 63],
          pink: [255, 192, 203],
          plum: [221, 160, 221],
          powderblue: [176, 224, 230],
          purple: [128, 0, 128],
          rebeccapurple: [102, 51, 153],
          red: [255, 0, 0],
          rosybrown: [188, 143, 143],
          royalblue: [65, 105, 225],
          saddlebrown: [139, 69, 19],
          salmon: [250, 128, 114],
          sandybrown: [244, 164, 96],
          seagreen: [46, 139, 87],
          seashell: [255, 245, 238],
          sienna: [160, 82, 45],
          silver: [192, 192, 192],
          skyblue: [135, 206, 235],
          slateblue: [106, 90, 205],
          slategray: [112, 128, 144],
          slategrey: [112, 128, 144],
          snow: [255, 250, 250],
          springgreen: [0, 255, 127],
          steelblue: [70, 130, 180],
          tan: [210, 180, 140],
          teal: [0, 128, 128],
          thistle: [216, 191, 216],
          tomato: [255, 99, 71],
          turquoise: [64, 224, 208],
          violet: [238, 130, 238],
          wheat: [245, 222, 179],
          white: [255, 255, 255],
          whitesmoke: [245, 245, 245],
          yellow: [255, 255, 0],
          yellowgreen: [154, 205, 50]
        };
      },
      {}
    ],
    21: [
      function(require, module, exports) {
        'use strict';
        const ansiStyles = require('ansi-styles');
        const {
          stdout: stdoutColor,
          stderr: stderrColor
        } = require('supports-color');
        const {
          stringReplaceAll,
          stringEncaseCRLFWithFirstIndex
        } = require('./util');

        // `supportsColor.level` → `ansiStyles.color[name]` mapping
        const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

        const styles = Object.create(null);

        const applyOptions = (object, options = {}) => {
          if (options.level > 3 || options.level < 0) {
            throw new Error(
              'The `level` option should be an integer from 0 to 3'
            );
          }
          // Detect level if not set manually
          const colorLevel = stdoutColor ? stdoutColor.level : 0;
          object.level =
            options.level === undefined ? colorLevel : options.level;
        };
        class ChalkClass {
          constructor(options) {
            return chalkFactory(options);
          }
        }
        const chalkFactory = options => {
          const chalk = {};
          applyOptions(chalk, options);
          chalk.template = (...arguments_) =>
            chalkTag(chalk.template, ...arguments_);
          Object.setPrototypeOf(chalk, Chalk.prototype);
          Object.setPrototypeOf(chalk.template, chalk);
          chalk.template.constructor = () => {
            throw new Error(
              '`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.'
            );
          };
          chalk.template.Instance = ChalkClass;
          return chalk.template;
        };
        function Chalk(options) {
          return chalkFactory(options);
        for (const [styleName, style] of Object.entries(ansiStyles)) {
          styles[styleName] = {
            get() {
              const builder = createBuilder(
                this,
                createStyler(style.open, style.close, this._styler),
                this._isEmpty
              );
              Object.defineProperty(this, styleName, { value: builder });
              return builder;
            }
          };
        }
        styles.visible = {
          get() {
            const builder = createBuilder(this, this._styler, true);
            Object.defineProperty(this, 'visible', { value: builder });
            return builder;
          }
        };
        const usedModels = [
          'rgb',
          'hex',
          'keyword',
          'hsl',
          'hsv',
          'hwb',
          'ansi',
          'ansi256'
        ];
        for (const model of usedModels) {
          styles[model] = {
            get() {
              const { level } = this;
              return function(...arguments_) {
                const styler = createStyler(
                  ansiStyles.color[levelMapping[level]][model](...arguments_),
                  ansiStyles.color.close,
                  this._styler
                );
                return createBuilder(this, styler, this._isEmpty);
              };
            }
          };
        }

        for (const model of usedModels) {
          const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
          styles[bgModel] = {
            get() {
              const { level } = this;
              return function(...arguments_) {
                const styler = createStyler(
                  ansiStyles.bgColor[levelMapping[level]][model](...arguments_),
                  ansiStyles.bgColor.close,
                  this._styler
                );
                return createBuilder(this, styler, this._isEmpty);
              };
            }
          };
        }

        const proto = Object.defineProperties(() => {}, {
          ...styles,
          level: {
            enumerable: true,
            get() {
              return this._generator.level;
            },
            set(level) {
              this._generator.level = level;
            }
          }
        });
        const createStyler = (open, close, parent) => {
          let openAll;
          let closeAll;
          if (parent === undefined) {
            openAll = open;
            closeAll = close;
          } else {
            openAll = parent.openAll + open;
            closeAll = close + parent.closeAll;
          }
          return {
            open,
            close,
            openAll,
            closeAll,
            parent
          };
        };
        const createBuilder = (self, _styler, _isEmpty) => {
          const builder = (...arguments_) => {
            // Single argument is hot path, implicit coercion is faster than anything
            // eslint-disable-next-line no-implicit-coercion
            return applyStyle(
              builder,
              arguments_.length === 1
                ? '' + arguments_[0]
                : arguments_.join(' ')
            );
          };

          // `__proto__` is used because we must return a function, but there is
          // no way to create a function with a different prototype
          builder.__proto__ = proto; // eslint-disable-line no-proto

          builder._generator = self;
          builder._styler = _styler;
          builder._isEmpty = _isEmpty;

          return builder;
        };
        const applyStyle = (self, string) => {
          if (self.level <= 0 || !string) {
            return self._isEmpty ? '' : string;
          }
          let styler = self._styler;
          if (styler === undefined) {
            return string;
          }
          const { openAll, closeAll } = styler;
          if (string.indexOf('\u001B') !== -1) {
            while (styler !== undefined) {
              // Replace any instances already present with a re-opening code
              // otherwise only the part of the string until said closing code
              // will be colored, and the rest will simply be 'plain'.
              string = stringReplaceAll(string, styler.close, styler.open);
              styler = styler.parent;
            }
          // We can move both next actions out of loop, because remaining actions in loop won't have
          // any/visible effect on parts we add here. Close the styling before a linebreak and reopen
          // after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
          const lfIndex = string.indexOf('\n');
          if (lfIndex !== -1) {
            string = stringEncaseCRLFWithFirstIndex(
              string,
              closeAll,
              openAll,
              lfIndex
            );
          }
          return openAll + string + closeAll;
        };
        let template;
        const chalkTag = (chalk, ...strings) => {
          const [firstString] = strings;
          if (!Array.isArray(firstString)) {
            // If chalk() was called by itself or with a string,
            // return the string itself as a string.
            return strings.join(' ');
          }
          const arguments_ = strings.slice(1);
          const parts = [firstString.raw[0]];
          for (let i = 1; i < firstString.length; i++) {
            parts.push(
              String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
              String(firstString.raw[i])
            );
          }
          if (template === undefined) {
            template = require('./templates');
          }
          return template(chalk, parts.join(''));
        };
        Object.defineProperties(Chalk.prototype, styles);

        const chalk = Chalk(); // eslint-disable-line new-cap
        chalk.supportsColor = stdoutColor;
        chalk.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 }); // eslint-disable-line new-cap
        chalk.stderr.supportsColor = stderrColor;

        // For TypeScript
        chalk.Level = {
          None: 0,
          Basic: 1,
          Ansi256: 2,
          TrueColor: 3,
          0: 'None',
          1: 'Basic',
          2: 'Ansi256',
          3: 'TrueColor'
        };
        module.exports = chalk;
      },
      {
        './templates': 22,
        './util': 23,
        'ansi-styles': 16,
        'supports-color': 103
      }
    ],
    22: [
      function(require, module, exports) {
        'use strict';
        const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
        const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
        const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
        const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.)|([^\\])/gi;

        const ESCAPES = new Map([
          ['n', '\n'],
          ['r', '\r'],
          ['t', '\t'],
          ['b', '\b'],
          ['f', '\f'],
          ['v', '\v'],
          ['0', '\0'],
          ['\\', '\\'],
          ['e', '\u001B'],
          ['a', '\u0007']
        ]);

        function unescape(c) {
          const u = c[0] === 'u';
          const bracket = c[1] === '{';

          if (
            (u && !bracket && c.length === 5) ||
            (c[0] === 'x' && c.length === 3)
          ) {
            return String.fromCharCode(parseInt(c.slice(1), 16));
          }
          if (u && bracket) {
            return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
          }
          return ESCAPES.get(c) || c;
        function parseArguments(name, arguments_) {
          const results = [];
          const chunks = arguments_.trim().split(/\s*,\s*/g);
          let matches;
          for (const chunk of chunks) {
            const number = Number(chunk);
            if (!Number.isNaN(number)) {
              results.push(number);
            } else if ((matches = chunk.match(STRING_REGEX))) {
              results.push(
                matches[2].replace(ESCAPE_REGEX, (m, escape, character) =>
                  escape ? unescape(escape) : character
                )
              );
            } else {
              throw new Error(
                `Invalid Chalk template style argument: ${chunk} (in style '${name}')`
              );
            }
          }
          return results;
        function parseStyle(style) {
          STYLE_REGEX.lastIndex = 0;
          const results = [];
          let matches;
          while ((matches = STYLE_REGEX.exec(style)) !== null) {
            const name = matches[1];
            if (matches[2]) {
              const args = parseArguments(name, matches[2]);
              results.push([name].concat(args));
            } else {
              results.push([name]);
          return results;
        function buildStyle(chalk, styles) {
          const enabled = {};
          for (const layer of styles) {
            for (const style of layer.styles) {
              enabled[style[0]] = layer.inverse ? null : style.slice(1);
            }
          }
          let current = chalk;
          for (const [styleName, styles] of Object.entries(enabled)) {
            if (!Array.isArray(styles)) {
              continue;
            }
            if (!(styleName in current)) {
              throw new Error(`Unknown Chalk style: ${styleName}`);
            }
            current =
              styles.length > 0
                ? current[styleName](...styles)
                : current[styleName];
          }
          return current;
        }

        module.exports = (chalk, temporary) => {
          const styles = [];
          const chunks = [];
          let chunk = [];

          // eslint-disable-next-line max-params
          temporary.replace(
            TEMPLATE_REGEX,
            (m, escapeCharacter, inverse, style, close, character) => {
              if (escapeCharacter) {
                chunk.push(unescape(escapeCharacter));
              } else if (style) {
                const string = chunk.join('');
                chunk = [];
                chunks.push(
                  styles.length === 0
                    ? string
                    : buildStyle(chalk, styles)(string)
                );
                styles.push({ inverse, styles: parseStyle(style) });
              } else if (close) {
                if (styles.length === 0) {
                  throw new Error(
                    'Found extraneous } in Chalk template literal'
                  );
                }
                chunks.push(buildStyle(chalk, styles)(chunk.join('')));
                chunk = [];
                styles.pop();
              } else {
                chunk.push(character);
              }
            }
          );
          chunks.push(chunk.join(''));
          if (styles.length > 0) {
            const errMsg = `Chalk template literal is missing ${
              styles.length
            } closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
            throw new Error(errMsg);
          }
          return chunks.join('');
        };
      },
      {}
    ],
    23: [
      function(require, module, exports) {
        'use strict';

        const stringReplaceAll = (string, substring, replacer) => {
          let index = string.indexOf(substring);
          if (index === -1) {
            return string;
          }
          const substringLength = substring.length;
          let endIndex = 0;
          let returnValue = '';
          do {
            returnValue +=
              string.substr(endIndex, index - endIndex) + substring + replacer;
            endIndex = index + substringLength;
            index = string.indexOf(substring, endIndex);
          } while (index !== -1);

          returnValue += string.substr(endIndex);
          return returnValue;
        };
        const stringEncaseCRLFWithFirstIndex = (
          string,
          prefix,
          postfix,
          index
        ) => {
          let endIndex = 0;
          let returnValue = '';
          do {
            const gotCR = string[index - 1] === '\r';
            returnValue +=
              string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) +
              prefix +
              (gotCR ? '\r\n' : '\n') +
              postfix;
            endIndex = index + 1;
            index = string.indexOf('\n', endIndex);
          } while (index !== -1);

          returnValue += string.substr(endIndex);
          return returnValue;
        };
        module.exports = {
          stringReplaceAll,
          stringEncaseCRLFWithFirstIndex
        };
      },
      {}
    ],
    24: [
      function(require, module, exports) {
        /**
         * @namespace Chart
         */
        var Chart = require('./core/core')();

        Chart.helpers = require('./helpers/index');

        // @todo dispatch these helpers into appropriated helpers/helpers.* file and write unit tests-assets!
        require('./core/core.helpers')(Chart);

        Chart.Animation = require('./core/core.animation');
        Chart.animationService = require('./core/core.animations');
        Chart.defaults = require('./core/core.defaults');
        Chart.Element = require('./core/core.element');
        Chart.elements = require('./elements/index');
        Chart.Interaction = require('./core/core.interaction');
        Chart.layouts = require('./core/core.layouts');
        Chart.platform = require('./platforms/platform');
        Chart.plugins = require('./core/core.plugins');
        Chart.Scale = require('./core/core.scale');
        Chart.scaleService = require('./core/core.scaleService');
        Chart.Ticks = require('./core/core.ticks');
        Chart.Tooltip = require('./core/core.tooltip');

        require('./core/core.controller')(Chart);
        require('./core/core.datasetController')(Chart);

        require('./scales/scale.linearbase')(Chart);
        require('./scales/scale.category')(Chart);
        require('./scales/scale.linear')(Chart);
        require('./scales/scale.logarithmic')(Chart);
        require('./scales/scale.radialLinear')(Chart);
        require('./scales/scale.time')(Chart);

        // Controllers must be loaded after elements
        // See Chart.core.datasetController.dataElementType
        require('./controllers/controller.bar')(Chart);
        require('./controllers/controller.bubble')(Chart);
        require('./controllers/controller.doughnut')(Chart);
        require('./controllers/controller.line')(Chart);
        require('./controllers/controller.polarArea')(Chart);
        require('./controllers/controller.radar')(Chart);
        require('./controllers/controller.scatter')(Chart);

        require('./charts/Chart.Bar')(Chart);
        require('./charts/Chart.Bubble')(Chart);
        require('./charts/Chart.Doughnut')(Chart);
        require('./charts/Chart.Line')(Chart);
        require('./charts/Chart.PolarArea')(Chart);
        require('./charts/Chart.Radar')(Chart);
        require('./charts/Chart.Scatter')(Chart);

        // Loading built-in plugins
        var plugins = require('./plugins');
        for (var k in plugins) {
          if (plugins.hasOwnProperty(k)) {
            Chart.plugins.register(plugins[k]);
        Chart.platform.initialize();
        module.exports = Chart;
        if (typeof window !== 'undefined') {
          window.Chart = Chart;
        }
        // DEPRECATIONS
        /**
         * Provided for backward compatibility, not available anymore
         * @namespace Chart.Legend
         * @deprecated since version 2.1.5
         * @todo remove at version 3
         * @private
         */
        Chart.Legend = plugins.legend._element;

        /**
         * Provided for backward compatibility, not available anymore
         * @namespace Chart.Title
         * @deprecated since version 2.1.5
         * @todo remove at version 3
         * @private
         */
        Chart.Title = plugins.title._element;

        /**
         * Provided for backward compatibility, use Chart.plugins instead
         * @namespace Chart.pluginService
         * @deprecated since version 2.1.5
         * @todo remove at version 3
         * @private
         */
        Chart.pluginService = Chart.plugins;

        /**
         * Provided for backward compatibility, inheriting from Chart.PlugingBase has no
         * effect, instead simply create/register plugins via plain JavaScript objects.
         * @interface Chart.PluginBase
         * @deprecated since version 2.5.0
         * @todo remove at version 3
         * @private
         */
        Chart.PluginBase = Chart.Element.extend({});

        /**
         * Provided for backward compatibility, use Chart.helpers.canvas instead.
         * @namespace Chart.canvasHelpers
         * @deprecated since version 2.6.0
         * @todo remove at version 3
         * @private
         */
        Chart.canvasHelpers = Chart.helpers.canvas;

        /**
         * Provided for backward compatibility, use Chart.layouts instead.
         * @namespace Chart.layoutService
         * @deprecated since version 2.8.0
         * @todo remove at version 3
         * @private
         */
        Chart.layoutService = Chart.layouts;
      },
      {
        './charts/Chart.Bar': 25,
        './charts/Chart.Bubble': 26,
        './charts/Chart.Doughnut': 27,
        './charts/Chart.Line': 28,
        './charts/Chart.PolarArea': 29,
        './charts/Chart.Radar': 30,
        './charts/Chart.Scatter': 31,
        './controllers/controller.bar': 32,
        './controllers/controller.bubble': 33,
        './controllers/controller.doughnut': 34,
        './controllers/controller.line': 35,
        './controllers/controller.polarArea': 36,
        './controllers/controller.radar': 37,
        './controllers/controller.scatter': 38,
        './core/core': 47,
        './core/core.animation': 39,
        './core/core.animations': 40,
        './core/core.controller': 41,
        './core/core.datasetController': 42,
        './core/core.defaults': 43,
        './core/core.element': 44,
        './core/core.helpers': 45,
        './core/core.interaction': 46,
        './core/core.layouts': 48,
        './core/core.plugins': 49,
        './core/core.scale': 50,
        './core/core.scaleService': 51,
        './core/core.ticks': 52,
        './core/core.tooltip': 53,
        './elements/index': 58,
        './helpers/index': 63,
        './platforms/platform': 66,
        './plugins': 67,
        './scales/scale.category': 71,
        './scales/scale.linear': 72,
        './scales/scale.linearbase': 73,
        './scales/scale.logarithmic': 74,
        './scales/scale.radialLinear': 75,
        './scales/scale.time': 76
    ],
    25: [
      function(require, module, exports) {
        'use strict';
        module.exports = function(Chart) {
          Chart.Bar = function(context, config) {
            config.type = 'bar';
            return new Chart(context, config);
          };
        };
      },
      {}
    ],
    26: [
      function(require, module, exports) {
        'use strict';

        module.exports = function(Chart) {
          Chart.Bubble = function(context, config) {
            config.type = 'bubble';
            return new Chart(context, config);
          };
        };
      },
      {}
    ],
    27: [
      function(require, module, exports) {
        'use strict';

        module.exports = function(Chart) {
          Chart.Doughnut = function(context, config) {
            config.type = 'doughnut';

            return new Chart(context, config);
          };
        };
      },
      {}
    ],
    28: [
      function(require, module, exports) {
        'use strict';

        module.exports = function(Chart) {
          Chart.Line = function(context, config) {
            config.type = 'line';

            return new Chart(context, config);
          };
        };
      },
      {}
    ],
    29: [
      function(require, module, exports) {
        'use strict';

        module.exports = function(Chart) {
          Chart.PolarArea = function(context, config) {
            config.type = 'polarArea';

            return new Chart(context, config);
          };
        };
      },
      {}
    ],
    30: [
      function(require, module, exports) {
        'use strict';

        module.exports = function(Chart) {
          Chart.Radar = function(context, config) {
            config.type = 'radar';

            return new Chart(context, config);
          };
        };
      },
      {}
    ],
    31: [
      function(require, module, exports) {
        'use strict';

        module.exports = function(Chart) {
          Chart.Scatter = function(context, config) {
            config.type = 'scatter';
            return new Chart(context, config);
          };
        };
      },
      {}
    ],
    32: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('../core/core.defaults');
        var elements = require('../elements/index');
        var helpers = require('../helpers/index');

        defaults._set('bar', {
          hover: {
            mode: 'label'
          },

          scales: {
            xAxes: [
              {
                type: 'category',

                // Specific to Bar Controller
                categoryPercentage: 0.8,
                barPercentage: 0.9,

                // offset settings
                offset: true,

                // grid line settings
                gridLines: {
                  offsetGridLines: true
                }
              }
            ],
            yAxes: [
              {
                type: 'linear'
              }
            ]
          }
        defaults._set('horizontalBar', {
          hover: {
            mode: 'index',
            axis: 'y'
          },

          scales: {
            xAxes: [
              {
                type: 'linear',
                position: 'bottom'
              }
            ],
            yAxes: [
              {
                position: 'left',
                type: 'category',
                // Specific to Horizontal Bar Controller
                categoryPercentage: 0.8,
                barPercentage: 0.9,
                // offset settings
                offset: true,
                // grid line settings
                gridLines: {
                  offsetGridLines: true
                }
              }
            ]
          },
          elements: {
            rectangle: {
              borderSkipped: 'left'
            }
          },

          tooltips: {
            callbacks: {
              title: function(item, data) {
                // Pick first xLabel for now
                var title = '';

                if (item.length > 0) {
                  if (item[0].yLabel) {
                    title = item[0].yLabel;
                  } else if (
                    data.labels.length > 0 &&
                    item[0].index < data.labels.length
                  ) {
                    title = data.labels[item[0].index];
                  }
                }
                return title;
              },
              label: function(item, data) {
                var datasetLabel = data.datasets[item.datasetIndex].label || '';
                return datasetLabel + ': ' + item.xLabel;
              }
            },
            mode: 'index',
            axis: 'y'
        });
        /**
         * Computes the "optimal" sample size to maintain bars equally sized while preventing overlap.
         * @private
         */
        function computeMinSampleSize(scale, pixels) {
          var min = scale.isHorizontal() ? scale.width : scale.height;
          var ticks = scale.getTicks();
          var prev, curr, i, ilen;
          for (i = 1, ilen = pixels.length; i < ilen; ++i) {
            min = Math.min(min, pixels[i] - pixels[i - 1]);
          }
          for (i = 0, ilen = ticks.length; i < ilen; ++i) {
            curr = scale.getPixelForTick(i);
            min = i > 0 ? Math.min(min, curr - prev) : min;
            prev = curr;
          }
          return min;
        /**
         * Computes an "ideal" category based on the absolute bar thickness or, if undefined or null,
         * uses the smallest interval (see computeMinSampleSize) that prevents bar overlapping. This
         * mode currently always generates bars equally sized (until we introduce scriptable options?).
         * @private
         */
        function computeFitCategoryTraits(index, ruler, options) {
          var thickness = options.barThickness;
          var count = ruler.stackCount;
          var curr = ruler.pixels[index];
          var size, ratio;

          if (helpers.isNullOrUndef(thickness)) {
            size = ruler.min * options.categoryPercentage;
            ratio = options.barPercentage;
          } else {
            // When bar thickness is enforced, category and bar percentages are ignored.
            // Note(SB): we could add support for relative bar thickness (e.g. barThickness: '50%')
            // and deprecate barPercentage since this value is ignored when thickness is absolute.
            size = thickness * count;
            ratio = 1;
          }
          return {
            chunk: size / count,
            ratio: ratio,
            start: curr - size / 2
          };
        }
        /**
         * Computes an "optimal" category that globally arranges bars side by side (no gap when
         * percentage options are 1), based on the previous and following categories. This mode
         * generates bars with different widths when data are not evenly spaced.
         * @private
         */
        function computeFlexCategoryTraits(index, ruler, options) {
          var pixels = ruler.pixels;
          var curr = pixels[index];
          var prev = index > 0 ? pixels[index - 1] : null;
          var next = index < pixels.length - 1 ? pixels[index + 1] : null;
          var percent = options.categoryPercentage;
          var start, size;

          if (prev === null) {
            // first data: its size is double based on the next point or,
            // if it's also the last data, we use the scale end extremity.
            prev = curr - (next === null ? ruler.end - curr : next - curr);
          if (next === null) {
            // last data: its size is also double based on the previous point.
            next = curr + curr - prev;
          }
          start = curr - ((curr - prev) / 2) * percent;
          size = ((next - prev) / 2) * percent;
          return {
            chunk: size / ruler.stackCount,
            ratio: options.barPercentage,
            start: start
          };
        }
        module.exports = function(Chart) {
          Chart.controllers.bar = Chart.DatasetController.extend({
            dataElementType: elements.Rectangle,
            initialize: function() {
              var me = this;
              var meta;
              Chart.DatasetController.prototype.initialize.apply(me, arguments);
              meta = me.getMeta();
              meta.stack = me.getDataset().stack;
              meta.bar = true;
            },
            update: function(reset) {
              var me = this;
              var rects = me.getMeta().data;
              var i, ilen;
              me._ruler = me.getRuler();
              for (i = 0, ilen = rects.length; i < ilen; ++i) {
                me.updateElement(rects[i], i, reset);
              }
            },

            updateElement: function(rectangle, index, reset) {
              var me = this;
              var chart = me.chart;
              var meta = me.getMeta();
              var dataset = me.getDataset();
              var custom = rectangle.custom || {};
              var rectangleOptions = chart.options.elements.rectangle;

              rectangle._xScale = me.getScaleForId(meta.xAxisID);
              rectangle._yScale = me.getScaleForId(meta.yAxisID);
              rectangle._datasetIndex = me.index;
              rectangle._index = index;

              rectangle._model = {
                datasetLabel: dataset.label,
                label: chart.data.labels[index],
                borderSkipped: custom.borderSkipped
                  ? custom.borderSkipped
                  : rectangleOptions.borderSkipped,
                backgroundColor: custom.backgroundColor
                  ? custom.backgroundColor
                  : helpers.valueAtIndexOrDefault(
                      dataset.backgroundColor,
                      index,
                      rectangleOptions.backgroundColor
                    ),
                borderColor: custom.borderColor
                  ? custom.borderColor
                  : helpers.valueAtIndexOrDefault(
                      dataset.borderColor,
                      index,
                      rectangleOptions.borderColor
                    ),
                borderWidth: custom.borderWidth
                  ? custom.borderWidth
                  : helpers.valueAtIndexOrDefault(
                      dataset.borderWidth,
                      index,
                      rectangleOptions.borderWidth
                    )
              };

              me.updateElementGeometry(rectangle, index, reset);

              rectangle.pivot();
            },

            /**
             * @private
             */
            updateElementGeometry: function(rectangle, index, reset) {
              var me = this;
              var model = rectangle._model;
              var vscale = me.getValueScale();
              var base = vscale.getBasePixel();
              var horizontal = vscale.isHorizontal();
              var ruler = me._ruler || me.getRuler();
              var vpixels = me.calculateBarValuePixels(me.index, index);
              var ipixels = me.calculateBarIndexPixels(me.index, index, ruler);

              model.horizontal = horizontal;
              model.base = reset ? base : vpixels.base;
              model.x = horizontal
                ? reset
                  ? base
                  : vpixels.head
                : ipixels.center;
              model.y = horizontal
                ? ipixels.center
                : reset
                ? base
                : vpixels.head;
              model.height = horizontal ? ipixels.size : undefined;
              model.width = horizontal ? undefined : ipixels.size;
            },

            /**
             * @private
             */
            getValueScaleId: function() {
              return this.getMeta().yAxisID;
            },

            /**
             * @private
             */
            getIndexScaleId: function() {
              return this.getMeta().xAxisID;
            },

            /**
             * @private
             */
            getValueScale: function() {
              return this.getScaleForId(this.getValueScaleId());
            },

            /**
             * @private
             */
            getIndexScale: function() {
              return this.getScaleForId(this.getIndexScaleId());
            },

            /**
             * Returns the stacks based on groups and bar visibility.
             * @param {Number} [last] - The dataset index
             * @returns {Array} The stack list
             * @private
             */
            _getStacks: function(last) {
              var me = this;
              var chart = me.chart;
              var scale = me.getIndexScale();
              var stacked = scale.options.stacked;
              var ilen =
                last === undefined ? chart.data.datasets.length : last + 1;
              var stacks = [];
              var i, meta;

              for (i = 0; i < ilen; ++i) {
                meta = chart.getDatasetMeta(i);
                if (
                  meta.bar &&
                  chart.isDatasetVisible(i) &&
                  (stacked === false ||
                    (stacked === true && stacks.indexOf(meta.stack) === -1) ||
                    (stacked === undefined &&
                      (meta.stack === undefined ||
                        stacks.indexOf(meta.stack) === -1)))
                ) {
                  stacks.push(meta.stack);
                }
              }
              return stacks;
            },

            /**
             * Returns the effective number of stacks based on groups and bar visibility.
             * @private
             */
            getStackCount: function() {
              return this._getStacks().length;
            },

            /**
             * Returns the stack index for the given dataset based on groups and bar visibility.
             * @param {Number} [datasetIndex] - The dataset index
             * @param {String} [name] - The stack name to find
             * @returns {Number} The stack index
             * @private
             */
            getStackIndex: function(datasetIndex, name) {
              var stacks = this._getStacks(datasetIndex);
              var index = name !== undefined ? stacks.indexOf(name) : -1; // indexOf returns -1 if element is not present

              return index === -1 ? stacks.length - 1 : index;
            },

            /**
             * @private
             */
            getRuler: function() {
              var me = this;
              var scale = me.getIndexScale();
              var stackCount = me.getStackCount();
              var datasetIndex = me.index;
              var isHorizontal = scale.isHorizontal();
              var start = isHorizontal ? scale.left : scale.top;
              var end = start + (isHorizontal ? scale.width : scale.height);
              var pixels = [];
              var i, ilen, min;

              for (i = 0, ilen = me.getMeta().data.length; i < ilen; ++i) {
                pixels.push(scale.getPixelForValue(null, i, datasetIndex));
              }
              min = helpers.isNullOrUndef(scale.options.barThickness)
                ? computeMinSampleSize(scale, pixels)
                : -1;

              return {
                min: min,
                pixels: pixels,
                start: start,
                end: end,
                stackCount: stackCount,
                scale: scale
              };
            },

            /**
             * Note: pixel values are not clamped to the scale area.
             * @private
             */
            calculateBarValuePixels: function(datasetIndex, index) {
              var me = this;
              var chart = me.chart;
              var meta = me.getMeta();
              var scale = me.getValueScale();
              var datasets = chart.data.datasets;
              var value = scale.getRightValue(
                datasets[datasetIndex].data[index]
              );
              var stacked = scale.options.stacked;
              var stack = meta.stack;
              var start = 0;
              var i, imeta, ivalue, base, head, size;

              if (stacked || (stacked === undefined && stack !== undefined)) {
                for (i = 0; i < datasetIndex; ++i) {
                  imeta = chart.getDatasetMeta(i);

                  if (
                    imeta.bar &&
                    imeta.stack === stack &&
                    imeta.controller.getValueScaleId() === scale.id &&
                    chart.isDatasetVisible(i)
                  ) {
                    ivalue = scale.getRightValue(datasets[i].data[index]);
                    if (
                      (value < 0 && ivalue < 0) ||
                      (value >= 0 && ivalue > 0)
                    ) {
                      start += ivalue;
                    }
                  }
                }
              }
              base = scale.getPixelForValue(start);
              head = scale.getPixelForValue(start + value);
              size = (head - base) / 2;

              return {
                size: size,
                base: base,
                head: head,
                center: head + size / 2
              };
            },

            /**
             * @private
             */
            calculateBarIndexPixels: function(datasetIndex, index, ruler) {
              var me = this;
              var options = ruler.scale.options;
              var range =
                options.barThickness === 'flex'
                  ? computeFlexCategoryTraits(index, ruler, options)
                  : computeFitCategoryTraits(index, ruler, options);

              var stackIndex = me.getStackIndex(
                datasetIndex,
                me.getMeta().stack
              );
              var center =
                range.start + range.chunk * stackIndex + range.chunk / 2;
              var size = Math.min(
                helpers.valueOrDefault(options.maxBarThickness, Infinity),
                range.chunk * range.ratio
              );

              return {
                base: center - size / 2,
                head: center + size / 2,
                center: center,
                size: size
              };
            },

            draw: function() {
              var me = this;
              var chart = me.chart;
              var scale = me.getValueScale();
              var rects = me.getMeta().data;
              var dataset = me.getDataset();
              var ilen = rects.length;
              var i = 0;

              helpers.canvas.clipArea(chart.ctx, chart.chartArea);

              for (; i < ilen; ++i) {
                if (!isNaN(scale.getRightValue(dataset.data[i]))) {
                  rects[i].draw();
                }
              }
              helpers.canvas.unclipArea(chart.ctx);
            }
          });
          Chart.controllers.horizontalBar = Chart.controllers.bar.extend({
            /**
             * @private
             */
            getValueScaleId: function() {
              return this.getMeta().xAxisID;
            },

            /**
             * @private
             */
            getIndexScaleId: function() {
              return this.getMeta().yAxisID;
            }
          });
        };
      },
      {
        '../core/core.defaults': 43,
        '../elements/index': 58,
        '../helpers/index': 63
    ],
    33: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('../core/core.defaults');
        var elements = require('../elements/index');
        var helpers = require('../helpers/index');

        defaults._set('bubble', {
          hover: {
            mode: 'single'
          },

          scales: {
            xAxes: [
              {
                type: 'linear', // bubble should probably use a linear scale by default
                position: 'bottom',
                id: 'x-axis-0' // need an ID so datasets can reference the scale
              }
            ],
            yAxes: [
              {
                type: 'linear',
                position: 'left',
                id: 'y-axis-0'
              }
            ]
          },

          tooltips: {
            callbacks: {
              title: function() {
                // Title doesn't make sense for scatter since we format the data as a point
                return '';
              },
              label: function(item, data) {
                var datasetLabel = data.datasets[item.datasetIndex].label || '';
                var dataPoint =
                  data.datasets[item.datasetIndex].data[item.index];
                return (
                  datasetLabel +
                  ': (' +
                  item.xLabel +
                  ', ' +
                  item.yLabel +
                  ', ' +
                  dataPoint.r +
                  ')'
                );
              }
            }
          }
        });
        module.exports = function(Chart) {
          Chart.controllers.bubble = Chart.DatasetController.extend({
            /**
             * @protected
             */
            dataElementType: elements.Point,

            /**
             * @protected
             */
            update: function(reset) {
              var me = this;
              var meta = me.getMeta();
              var points = meta.data;

              // Update Points
              helpers.each(points, function(point, index) {
                me.updateElement(point, index, reset);
              });
            },

            /**
             * @protected
             */
            updateElement: function(point, index, reset) {
              var me = this;
              var meta = me.getMeta();
              var custom = point.custom || {};
              var xScale = me.getScaleForId(meta.xAxisID);
              var yScale = me.getScaleForId(meta.yAxisID);
              var options = me._resolveElementOptions(point, index);
              var data = me.getDataset().data[index];
              var dsIndex = me.index;

              var x = reset
                ? xScale.getPixelForDecimal(0.5)
                : xScale.getPixelForValue(
                    typeof data === 'object' ? data : NaN,
                    index,
                    dsIndex
                  );
              var y = reset
                ? yScale.getBasePixel()
                : yScale.getPixelForValue(data, index, dsIndex);

              point._xScale = xScale;
              point._yScale = yScale;
              point._options = options;
              point._datasetIndex = dsIndex;
              point._index = index;
              point._model = {
                backgroundColor: options.backgroundColor,
                borderColor: options.borderColor,
                borderWidth: options.borderWidth,
                hitRadius: options.hitRadius,
                pointStyle: options.pointStyle,
                rotation: options.rotation,
                radius: reset ? 0 : options.radius,
                skip: custom.skip || isNaN(x) || isNaN(y),
                x: x,
                y: y
              };

              point.pivot();
            },

            /**
             * @protected
             */
            setHoverStyle: function(point) {
              var model = point._model;
              var options = point._options;
              point.$previousStyle = {
                backgroundColor: model.backgroundColor,
                borderColor: model.borderColor,
                borderWidth: model.borderWidth,
                radius: model.radius
              };
              model.backgroundColor = helpers.valueOrDefault(
                options.hoverBackgroundColor,
                helpers.getHoverColor(options.backgroundColor)
              );
              model.borderColor = helpers.valueOrDefault(
                options.hoverBorderColor,
                helpers.getHoverColor(options.borderColor)
              );
              model.borderWidth = helpers.valueOrDefault(
                options.hoverBorderWidth,
                options.borderWidth
              );
              model.radius = options.radius + options.hoverRadius;
            },

            /**
             * @private
             */
            _resolveElementOptions: function(point, index) {
              var me = this;
              var chart = me.chart;
              var datasets = chart.data.datasets;
              var dataset = datasets[me.index];
              var custom = point.custom || {};
              var options = chart.options.elements.point;
              var resolve = helpers.options.resolve;
              var data = dataset.data[index];
              var values = {};
              var i, ilen, key;

              // Scriptable options
              var context = {
                chart: chart,
                dataIndex: index,
                dataset: dataset,
                datasetIndex: me.index
              };

              var keys = [
                'backgroundColor',
                'borderColor',
                'borderWidth',
                'hoverBackgroundColor',
                'hoverBorderColor',
                'hoverBorderWidth',
                'hoverRadius',
                'hitRadius',
                'pointStyle',
                'rotation'
              ];

              for (i = 0, ilen = keys.length; i < ilen; ++i) {
                key = keys[i];
                values[key] = resolve(
                  [custom[key], dataset[key], options[key]],
                  context,
                  index
                );
              }
              // Custom radius resolution
              values.radius = resolve(
                [
                  custom.radius,
                  data ? data.r : undefined,
                  dataset.radius,
                  options.radius
                ],
                context,
                index
              );
              return values;
            }
          });
      },
      {
        '../core/core.defaults': 43,
        '../elements/index': 58,
        '../helpers/index': 63
    ],
    34: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('../core/core.defaults');
        var elements = require('../elements/index');
        var helpers = require('../helpers/index');

        defaults._set('doughnut', {
          animation: {
            // Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,
            // Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: false
          },
          hover: {
            mode: 'single'
          },
          legendCallback: function(chart) {
            var text = [];
            text.push('<ul class="' + chart.id + '-legend">');

            var data = chart.data;
            var datasets = data.datasets;
            var labels = data.labels;

            if (datasets.length) {
              for (var i = 0; i < datasets[0].data.length; ++i) {
                text.push(
                  '<li><span style="background-color:' +
                    datasets[0].backgroundColor[i] +
                    '"></span>'
                );
                if (labels[i]) {
                  text.push(labels[i]);
                }
                text.push('</li>');
              }
            }
            text.push('</ul>');
            return text.join('');
          },
          legend: {
            labels: {
              generateLabels: function(chart) {
                var data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map(function(label, i) {
                    var meta = chart.getDatasetMeta(0);
                    var ds = data.datasets[0];
                    var arc = meta.data[i];
                    var custom = (arc && arc.custom) || {};
                    var valueAtIndexOrDefault = helpers.valueAtIndexOrDefault;
                    var arcOpts = chart.options.elements.arc;
                    var fill = custom.backgroundColor
                      ? custom.backgroundColor
                      : valueAtIndexOrDefault(
                          ds.backgroundColor,
                          i,
                          arcOpts.backgroundColor
                        );
                    var stroke = custom.borderColor
                      ? custom.borderColor
                      : valueAtIndexOrDefault(
                          ds.borderColor,
                          i,
                          arcOpts.borderColor
                        );
                    var bw = custom.borderWidth
                      ? custom.borderWidth
                      : valueAtIndexOrDefault(
                          ds.borderWidth,
                          i,
                          arcOpts.borderWidth
                        );

                    return {
                      text: label,
                      fillStyle: fill,
                      strokeStyle: stroke,
                      lineWidth: bw,
                      hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

                      // Extra data used for toggling the correct item
                      index: i
                    };
                  });
                }
                return [];
              }
            },

            onClick: function(e, legendItem) {
              var index = legendItem.index;
              var chart = this.chart;
              var i, ilen, meta;

              for (
                i = 0, ilen = (chart.data.datasets || []).length;
                i < ilen;
                ++i
              ) {
                meta = chart.getDatasetMeta(i);
                // toggle visibility of index if exists
                if (meta.data[index]) {
                  meta.data[index].hidden = !meta.data[index].hidden;
                }
              }
              chart.update();
            }
          },

          // The percentage of the chart that we cut out of the middle.
          cutoutPercentage: 50,

          // The rotation of the chart, where the first data arc begins.
          rotation: Math.PI * -0.5,

          // The total circumference of the chart.
          circumference: Math.PI * 2.0,

          // Need to override these to give a nice default
          tooltips: {
            callbacks: {
              title: function() {
                return '';
              },
              label: function(tooltipItem, data) {
                var dataLabel = data.labels[tooltipItem.index];
                var value =
                  ': ' +
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ];

                if (helpers.isArray(dataLabel)) {
                  // show value on first line of multiline label
                  // need to clone because we are changing the value
                  dataLabel = dataLabel.slice();
                  dataLabel[0] += value;
                } else {
                  dataLabel += value;
                }
                return dataLabel;
              }
            }
          }
        });
        defaults._set('pie', helpers.clone(defaults.doughnut));
        defaults._set('pie', {
          cutoutPercentage: 0
        });
        module.exports = function(Chart) {
          Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend(
            {
              dataElementType: elements.Arc,
              linkScales: helpers.noop,
              // Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
              getRingIndex: function(datasetIndex) {
                var ringIndex = 0;
                for (var j = 0; j < datasetIndex; ++j) {
                  if (this.chart.isDatasetVisible(j)) {
                    ++ringIndex;
                  }
                }
                return ringIndex;
              },

              update: function(reset) {
                var me = this;
                var chart = me.chart;
                var chartArea = chart.chartArea;
                var opts = chart.options;
                var arcOpts = opts.elements.arc;
                var availableWidth =
                  chartArea.right - chartArea.left - arcOpts.borderWidth;
                var availableHeight =
                  chartArea.bottom - chartArea.top - arcOpts.borderWidth;
                var minSize = Math.min(availableWidth, availableHeight);
                var offset = { x: 0, y: 0 };
                var meta = me.getMeta();
                var cutoutPercentage = opts.cutoutPercentage;
                var circumference = opts.circumference;

                // If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
                if (circumference < Math.PI * 2.0) {
                  var startAngle = opts.rotation % (Math.PI * 2.0);
                  startAngle +=
                    Math.PI *
                    2.0 *
                    (startAngle >= Math.PI
                      ? -1
                      : startAngle < -Math.PI
                      ? 1
                      : 0);
                  var endAngle = startAngle + circumference;
                  var start = {
                    x: Math.cos(startAngle),
                    y: Math.sin(startAngle)
                  };
                  var end = { x: Math.cos(endAngle), y: Math.sin(endAngle) };
                  var contains0 =
                    (startAngle <= 0 && endAngle >= 0) ||
                    (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
                  var contains90 =
                    (startAngle <= Math.PI * 0.5 &&
                      Math.PI * 0.5 <= endAngle) ||
                    (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
                  var contains180 =
                    (startAngle <= -Math.PI && -Math.PI <= endAngle) ||
                    (startAngle <= Math.PI && Math.PI <= endAngle);
                  var contains270 =
                    (startAngle <= -Math.PI * 0.5 &&
                      -Math.PI * 0.5 <= endAngle) ||
                    (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
                  var cutout = cutoutPercentage / 100.0;
                  var min = {
                    x: contains180
                      ? -1
                      : Math.min(
                          start.x * (start.x < 0 ? 1 : cutout),
                          end.x * (end.x < 0 ? 1 : cutout)
                        ),
                    y: contains270
                      ? -1
                      : Math.min(
                          start.y * (start.y < 0 ? 1 : cutout),
                          end.y * (end.y < 0 ? 1 : cutout)
                        )
                  };
                  var max = {
                    x: contains0
                      ? 1
                      : Math.max(
                          start.x * (start.x > 0 ? 1 : cutout),
                          end.x * (end.x > 0 ? 1 : cutout)
                        ),
                    y: contains90
                      ? 1
                      : Math.max(
                          start.y * (start.y > 0 ? 1 : cutout),
                          end.y * (end.y > 0 ? 1 : cutout)
                        )
                  };
                  var size = {
                    width: (max.x - min.x) * 0.5,
                    height: (max.y - min.y) * 0.5
                  };
                  minSize = Math.min(
                    availableWidth / size.width,
                    availableHeight / size.height
                  );
                  offset = {
                    x: (max.x + min.x) * -0.5,
                    y: (max.y + min.y) * -0.5
                  };
                }
                chart.borderWidth = me.getMaxBorderWidth(meta.data);
                chart.outerRadius = Math.max(
                  (minSize - chart.borderWidth) / 2,
                  0
                );
                chart.innerRadius = Math.max(
                  cutoutPercentage
                    ? (chart.outerRadius / 100) * cutoutPercentage
                    : 0,
                  0
                );
                chart.radiusLength =
                  (chart.outerRadius - chart.innerRadius) /
                  chart.getVisibleDatasetCount();
                chart.offsetX = offset.x * chart.outerRadius;
                chart.offsetY = offset.y * chart.outerRadius;

                meta.total = me.calculateTotal();

                me.outerRadius =
                  chart.outerRadius -
                  chart.radiusLength * me.getRingIndex(me.index);
                me.innerRadius = Math.max(
                  me.outerRadius - chart.radiusLength,
                  0
                );

                helpers.each(meta.data, function(arc, index) {
                  me.updateElement(arc, index, reset);
                });
              },

              updateElement: function(arc, index, reset) {
                var me = this;
                var chart = me.chart;
                var chartArea = chart.chartArea;
                var opts = chart.options;
                var animationOpts = opts.animation;
                var centerX = (chartArea.left + chartArea.right) / 2;
                var centerY = (chartArea.top + chartArea.bottom) / 2;
                var startAngle = opts.rotation; // non reset case handled later
                var endAngle = opts.rotation; // non reset case handled later
                var dataset = me.getDataset();
                var circumference =
                  reset && animationOpts.animateRotate
                    ? 0
                    : arc.hidden
                    ? 0
                    : me.calculateCircumference(dataset.data[index]) *
                      (opts.circumference / (2.0 * Math.PI));
                var innerRadius =
                  reset && animationOpts.animateScale ? 0 : me.innerRadius;
                var outerRadius =
                  reset && animationOpts.animateScale ? 0 : me.outerRadius;
                var valueAtIndexOrDefault = helpers.valueAtIndexOrDefault;

                helpers.extend(arc, {
                  // Utility
                  _datasetIndex: me.index,
                  _index: index,

                  // Desired view properties
                  _model: {
                    x: centerX + chart.offsetX,
                    y: centerY + chart.offsetY,
                    startAngle: startAngle,
                    endAngle: endAngle,
                    circumference: circumference,
                    outerRadius: outerRadius,
                    innerRadius: innerRadius,
                    label: valueAtIndexOrDefault(
                      dataset.label,
                      index,
                      chart.data.labels[index]
                    )
                  }
                });
                var model = arc._model;

                // Resets the visual styles
                var custom = arc.custom || {};
                var valueOrDefault = helpers.valueAtIndexOrDefault;
                var elementOpts = this.chart.options.elements.arc;
                model.backgroundColor = custom.backgroundColor
                  ? custom.backgroundColor
                  : valueOrDefault(
                      dataset.backgroundColor,
                      index,
                      elementOpts.backgroundColor
                    );
                model.borderColor = custom.borderColor
                  ? custom.borderColor
                  : valueOrDefault(
                      dataset.borderColor,
                      index,
                      elementOpts.borderColor
                    );
                model.borderWidth = custom.borderWidth
                  ? custom.borderWidth
                  : valueOrDefault(
                      dataset.borderWidth,
                      index,
                      elementOpts.borderWidth
                    );

                // Set correct angles if not resetting
                if (!reset || !animationOpts.animateRotate) {
                  if (index === 0) {
                    model.startAngle = opts.rotation;
                  } else {
                    model.startAngle = me.getMeta().data[
                      index - 1
                    ]._model.endAngle;
                  }

                  model.endAngle = model.startAngle + model.circumference;
                }
                arc.pivot();
              },
              calculateTotal: function() {
                var dataset = this.getDataset();
                var meta = this.getMeta();
                var total = 0;
                var value;
                helpers.each(meta.data, function(element, index) {
                  value = dataset.data[index];
                  if (!isNaN(value) && !element.hidden) {
                    total += Math.abs(value);
                  }
                });
                /* if (total === 0) {
				total = NaN;
			}*/
                return total;
              },
              calculateCircumference: function(value) {
                var total = this.getMeta().total;
                if (total > 0 && !isNaN(value)) {
                  return Math.PI * 2.0 * (Math.abs(value) / total);
                }
                return 0;
              },

              // gets the max border or hover width to properly scale pie charts
              getMaxBorderWidth: function(arcs) {
                var max = 0;
                var index = this.index;
                var length = arcs.length;
                var borderWidth;
                var hoverWidth;

                for (var i = 0; i < length; i++) {
                  borderWidth = arcs[i]._model ? arcs[i]._model.borderWidth : 0;
                  hoverWidth = arcs[i]._chart
                    ? arcs[i]._chart.config.data.datasets[index]
                        .hoverBorderWidth
                    : 0;

                  max = borderWidth > max ? borderWidth : max;
                  max = hoverWidth > max ? hoverWidth : max;
                }
                return max;
              }
            }
          );
        };
      },
      {
        '../core/core.defaults': 43,
        '../elements/index': 58,
        '../helpers/index': 63
    ],
    35: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('../core/core.defaults');
        var elements = require('../elements/index');
        var helpers = require('../helpers/index');

        defaults._set('line', {
          showLines: true,
          spanGaps: false,

          hover: {
            mode: 'label'
          },

          scales: {
            xAxes: [
              {
                type: 'category',
                id: 'x-axis-0'
              }
            ],
            yAxes: [
              {
                type: 'linear',
                id: 'y-axis-0'
              }
            ]
          }
        });
        module.exports = function(Chart) {
          function lineEnabled(dataset, options) {
            return helpers.valueOrDefault(dataset.showLine, options.showLines);
          }
          Chart.controllers.line = Chart.DatasetController.extend({
            datasetElementType: elements.Line,

            dataElementType: elements.Point,

            update: function(reset) {
              var me = this;
              var meta = me.getMeta();
              var line = meta.dataset;
              var points = meta.data || [];
              var options = me.chart.options;
              var lineElementOptions = options.elements.line;
              var scale = me.getScaleForId(meta.yAxisID);
              var i, ilen, custom;
              var dataset = me.getDataset();
              var showLine = lineEnabled(dataset, options);

              // Update Line
              if (showLine) {
                custom = line.custom || {};

                // Compatibility: If the properties are defined with only the old name, use those values
                if (
                  dataset.tension !== undefined &&
                  dataset.lineTension === undefined
                ) {
                  dataset.lineTension = dataset.tension;
                }
                // Utility
                line._scale = scale;
                line._datasetIndex = me.index;
                // Data
                line._children = points;
                // Model
                line._model = {
                  // Appearance
                  // The default behavior of lines is to break at null values, according
                  // to https://github.com/chartjs/Chart.js/issues/2435#issuecomment-216718158
                  // This option gives lines the ability to span gaps
                  spanGaps: dataset.spanGaps
                    ? dataset.spanGaps
                    : options.spanGaps,
                  tension: custom.tension
                    ? custom.tension
                    : helpers.valueOrDefault(
                        dataset.lineTension,
                        lineElementOptions.tension
                      ),
                  backgroundColor: custom.backgroundColor
                    ? custom.backgroundColor
                    : dataset.backgroundColor ||
                      lineElementOptions.backgroundColor,
                  borderWidth: custom.borderWidth
                    ? custom.borderWidth
                    : dataset.borderWidth || lineElementOptions.borderWidth,
                  borderColor: custom.borderColor
                    ? custom.borderColor
                    : dataset.borderColor || lineElementOptions.borderColor,
                  borderCapStyle: custom.borderCapStyle
                    ? custom.borderCapStyle
                    : dataset.borderCapStyle ||
                      lineElementOptions.borderCapStyle,
                  borderDash: custom.borderDash
                    ? custom.borderDash
                    : dataset.borderDash || lineElementOptions.borderDash,
                  borderDashOffset: custom.borderDashOffset
                    ? custom.borderDashOffset
                    : dataset.borderDashOffset ||
                      lineElementOptions.borderDashOffset,
                  borderJoinStyle: custom.borderJoinStyle
                    ? custom.borderJoinStyle
                    : dataset.borderJoinStyle ||
                      lineElementOptions.borderJoinStyle,
                  fill: custom.fill
                    ? custom.fill
                    : dataset.fill !== undefined
                    ? dataset.fill
                    : lineElementOptions.fill,
                  steppedLine: custom.steppedLine
                    ? custom.steppedLine
                    : helpers.valueOrDefault(
                        dataset.steppedLine,
                        lineElementOptions.stepped
                      ),
                  cubicInterpolationMode: custom.cubicInterpolationMode
                    ? custom.cubicInterpolationMode
                    : helpers.valueOrDefault(
                        dataset.cubicInterpolationMode,
                        lineElementOptions.cubicInterpolationMode
                      )
                };

                line.pivot();
              }
              // Update Points
              for (i = 0, ilen = points.length; i < ilen; ++i) {
                me.updateElement(points[i], i, reset);
              }
              if (showLine && line._model.tension !== 0) {
                me.updateBezierControlPoints();
              }
              // Now pivot the point for animation
              for (i = 0, ilen = points.length; i < ilen; ++i) {
                points[i].pivot();
              }
            },

            getPointBackgroundColor: function(point, index) {
              var backgroundColor = this.chart.options.elements.point
                .backgroundColor;
              var dataset = this.getDataset();
              var custom = point.custom || {};

              if (custom.backgroundColor) {
                backgroundColor = custom.backgroundColor;
              } else if (dataset.pointBackgroundColor) {
                backgroundColor = helpers.valueAtIndexOrDefault(
                  dataset.pointBackgroundColor,
                  index,
                  backgroundColor
                );
              } else if (dataset.backgroundColor) {
                backgroundColor = dataset.backgroundColor;
              }
              return backgroundColor;
            },

            getPointBorderColor: function(point, index) {
              var borderColor = this.chart.options.elements.point.borderColor;
              var dataset = this.getDataset();
              var custom = point.custom || {};

              if (custom.borderColor) {
                borderColor = custom.borderColor;
              } else if (dataset.pointBorderColor) {
                borderColor = helpers.valueAtIndexOrDefault(
                  dataset.pointBorderColor,
                  index,
                  borderColor
                );
              } else if (dataset.borderColor) {
                borderColor = dataset.borderColor;
              }
              return borderColor;
            },

            getPointBorderWidth: function(point, index) {
              var borderWidth = this.chart.options.elements.point.borderWidth;
              var dataset = this.getDataset();
              var custom = point.custom || {};

              if (!isNaN(custom.borderWidth)) {
                borderWidth = custom.borderWidth;
              } else if (
                !isNaN(dataset.pointBorderWidth) ||
                helpers.isArray(dataset.pointBorderWidth)
              ) {
                borderWidth = helpers.valueAtIndexOrDefault(
                  dataset.pointBorderWidth,
                  index,
                  borderWidth
                );
              } else if (!isNaN(dataset.borderWidth)) {
                borderWidth = dataset.borderWidth;
              }
              return borderWidth;
            },

            getPointRotation: function(point, index) {
              var pointRotation = this.chart.options.elements.point.rotation;
              var dataset = this.getDataset();
              var custom = point.custom || {};

              if (!isNaN(custom.rotation)) {
                pointRotation = custom.rotation;
              } else if (
                !isNaN(dataset.pointRotation) ||
                helpers.isArray(dataset.pointRotation)
              ) {
                pointRotation = helpers.valueAtIndexOrDefault(
                  dataset.pointRotation,
                  index,
                  pointRotation
                );
              }
              return pointRotation;
            },

            updateElement: function(point, index, reset) {
              var me = this;
              var meta = me.getMeta();
              var custom = point.custom || {};
              var dataset = me.getDataset();
              var datasetIndex = me.index;
              var value = dataset.data[index];
              var yScale = me.getScaleForId(meta.yAxisID);
              var xScale = me.getScaleForId(meta.xAxisID);
              var pointOptions = me.chart.options.elements.point;
              var x, y;

              // Compatibility: If the properties are defined with only the old name, use those values
              if (
                dataset.radius !== undefined &&
                dataset.pointRadius === undefined
              ) {
                dataset.pointRadius = dataset.radius;
              }
              if (
                dataset.hitRadius !== undefined &&
                dataset.pointHitRadius === undefined
              ) {
                dataset.pointHitRadius = dataset.hitRadius;
              }
              x = xScale.getPixelForValue(
                typeof value === 'object' ? value : NaN,
                index,
                datasetIndex
              );
              y = reset
                ? yScale.getBasePixel()
                : me.calculatePointY(value, index, datasetIndex);

              // Utility
              point._xScale = xScale;
              point._yScale = yScale;
              point._datasetIndex = datasetIndex;
              point._index = index;

              // Desired view properties
              point._model = {
                x: x,
                y: y,
                skip: custom.skip || isNaN(x) || isNaN(y),
                // Appearance
                radius:
                  custom.radius ||
                  helpers.valueAtIndexOrDefault(
                    dataset.pointRadius,
                    index,
                    pointOptions.radius
                  ),
                pointStyle:
                  custom.pointStyle ||
                  helpers.valueAtIndexOrDefault(
                    dataset.pointStyle,
                    index,
                    pointOptions.pointStyle
                  ),
                rotation: me.getPointRotation(point, index),
                backgroundColor: me.getPointBackgroundColor(point, index),
                borderColor: me.getPointBorderColor(point, index),
                borderWidth: me.getPointBorderWidth(point, index),
                tension: meta.dataset._model ? meta.dataset._model.tension : 0,
                steppedLine: meta.dataset._model
                  ? meta.dataset._model.steppedLine
                  : false,
                // Tooltip
                hitRadius:
                  custom.hitRadius ||
                  helpers.valueAtIndexOrDefault(
                    dataset.pointHitRadius,
                    index,
                    pointOptions.hitRadius
                  )
              };
            },

            calculatePointY: function(value, index, datasetIndex) {
              var me = this;
              var chart = me.chart;
              var meta = me.getMeta();
              var yScale = me.getScaleForId(meta.yAxisID);
              var sumPos = 0;
              var sumNeg = 0;
              var i, ds, dsMeta;

              if (yScale.options.stacked) {
                for (i = 0; i < datasetIndex; i++) {
                  ds = chart.data.datasets[i];
                  dsMeta = chart.getDatasetMeta(i);
                  if (
                    dsMeta.type === 'line' &&
                    dsMeta.yAxisID === yScale.id &&
                    chart.isDatasetVisible(i)
                  ) {
                    var stackedRightValue = Number(
                      yScale.getRightValue(ds.data[index])
                    );
                    if (stackedRightValue < 0) {
                      sumNeg += stackedRightValue || 0;
                    } else {
                      sumPos += stackedRightValue || 0;
                    }
                  }
                }
                var rightValue = Number(yScale.getRightValue(value));
                if (rightValue < 0) {
                  return yScale.getPixelForValue(sumNeg + rightValue);
                }
                return yScale.getPixelForValue(sumPos + rightValue);
              }
              return yScale.getPixelForValue(value);
            },
            updateBezierControlPoints: function() {
              var me = this;
              var meta = me.getMeta();
              var area = me.chart.chartArea;
              var points = meta.data || [];
              var i, ilen, point, model, controlPoints;
              // Only consider points that are drawn in case the spanGaps option is used
              if (meta.dataset._model.spanGaps) {
                points = points.filter(function(pt) {
                  return !pt._model.skip;
                });
              }
              function capControlPoint(pt, min, max) {
                return Math.max(Math.min(pt, max), min);
              }
              if (meta.dataset._model.cubicInterpolationMode === 'monotone') {
                helpers.splineCurveMonotone(points);
              } else {
                for (i = 0, ilen = points.length; i < ilen; ++i) {
                  point = points[i];
                  model = point._model;
                  controlPoints = helpers.splineCurve(
                    helpers.previousItem(points, i)._model,
                    model,
                    helpers.nextItem(points, i)._model,
                    meta.dataset._model.tension
                  );
                  model.controlPointPreviousX = controlPoints.previous.x;
                  model.controlPointPreviousY = controlPoints.previous.y;
                  model.controlPointNextX = controlPoints.next.x;
                  model.controlPointNextY = controlPoints.next.y;
                }
              }
              if (me.chart.options.elements.line.capBezierPoints) {
                for (i = 0, ilen = points.length; i < ilen; ++i) {
                  model = points[i]._model;
                  model.controlPointPreviousX = capControlPoint(
                    model.controlPointPreviousX,
                    area.left,
                    area.right
                  );
                  model.controlPointPreviousY = capControlPoint(
                    model.controlPointPreviousY,
                    area.top,
                    area.bottom
                  );
                  model.controlPointNextX = capControlPoint(
                    model.controlPointNextX,
                    area.left,
                    area.right
                  );
                  model.controlPointNextY = capControlPoint(
                    model.controlPointNextY,
                    area.top,
                    area.bottom
                  );
                }
              }
            },

            draw: function() {
              var me = this;
              var chart = me.chart;
              var meta = me.getMeta();
              var points = meta.data || [];
              var area = chart.chartArea;
              var ilen = points.length;
              var halfBorderWidth;
              var i = 0;

              if (lineEnabled(me.getDataset(), chart.options)) {
                halfBorderWidth = (meta.dataset._model.borderWidth || 0) / 2;

                helpers.canvas.clipArea(chart.ctx, {
                  left: area.left,
                  right: area.right,
                  top: area.top - halfBorderWidth,
                  bottom: area.bottom + halfBorderWidth
                });
                meta.dataset.draw();
                helpers.canvas.unclipArea(chart.ctx);
              }
              // Draw the points
              for (; i < ilen; ++i) {
                points[i].draw(area);
              }
            },

            setHoverStyle: function(element) {
              // Point
              var dataset = this.chart.data.datasets[element._datasetIndex];
              var index = element._index;
              var custom = element.custom || {};
              var model = element._model;

              element.$previousStyle = {
                backgroundColor: model.backgroundColor,
                borderColor: model.borderColor,
                borderWidth: model.borderWidth,
                radius: model.radius
              };

              model.backgroundColor =
                custom.hoverBackgroundColor ||
                helpers.valueAtIndexOrDefault(
                  dataset.pointHoverBackgroundColor,
                  index,
                  helpers.getHoverColor(model.backgroundColor)
                );
              model.borderColor =
                custom.hoverBorderColor ||
                helpers.valueAtIndexOrDefault(
                  dataset.pointHoverBorderColor,
                  index,
                  helpers.getHoverColor(model.borderColor)
                );
              model.borderWidth =
                custom.hoverBorderWidth ||
                helpers.valueAtIndexOrDefault(
                  dataset.pointHoverBorderWidth,
                  index,
                  model.borderWidth
                );
              model.radius =
                custom.hoverRadius ||
                helpers.valueAtIndexOrDefault(
                  dataset.pointHoverRadius,
                  index,
                  this.chart.options.elements.point.hoverRadius
                );
            }
          });
        };
      },
      {
        '../core/core.defaults': 43,
        '../elements/index': 58,
        '../helpers/index': 63
    ],
    36: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('../core/core.defaults');
        var elements = require('../elements/index');
        var helpers = require('../helpers/index');

        defaults._set('polarArea', {
          scale: {
            type: 'radialLinear',
            angleLines: {
              display: false
            },
            gridLines: {
              circular: true
            },
            pointLabels: {
              display: false
            },
            ticks: {
              beginAtZero: true
            }
          },

          // Boolean - Whether to animate the rotation of the chart
          animation: {
            animateRotate: true,
            animateScale: true
          },

          startAngle: -0.5 * Math.PI,
          legendCallback: function(chart) {
            var text = [];
            text.push('<ul class="' + chart.id + '-legend">');

            var data = chart.data;
            var datasets = data.datasets;
            var labels = data.labels;

            if (datasets.length) {
              for (var i = 0; i < datasets[0].data.length; ++i) {
                text.push(
                  '<li><span style="background-color:' +
                    datasets[0].backgroundColor[i] +
                    '"></span>'
                );
                if (labels[i]) {
                  text.push(labels[i]);
                }
                text.push('</li>');
              }
            }
            text.push('</ul>');
            return text.join('');
          },
          legend: {
            labels: {
              generateLabels: function(chart) {
                var data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map(function(label, i) {
                    var meta = chart.getDatasetMeta(0);
                    var ds = data.datasets[0];
                    var arc = meta.data[i];
                    var custom = arc.custom || {};
                    var valueAtIndexOrDefault = helpers.valueAtIndexOrDefault;
                    var arcOpts = chart.options.elements.arc;
                    var fill = custom.backgroundColor
                      ? custom.backgroundColor
                      : valueAtIndexOrDefault(
                          ds.backgroundColor,
                          i,
                          arcOpts.backgroundColor
                        );
                    var stroke = custom.borderColor
                      ? custom.borderColor
                      : valueAtIndexOrDefault(
                          ds.borderColor,
                          i,
                          arcOpts.borderColor
                        );
                    var bw = custom.borderWidth
                      ? custom.borderWidth
                      : valueAtIndexOrDefault(
                          ds.borderWidth,
                          i,
                          arcOpts.borderWidth
                        );

                    return {
                      text: label,
                      fillStyle: fill,
                      strokeStyle: stroke,
                      lineWidth: bw,
                      hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

                      // Extra data used for toggling the correct item
                      index: i
                    };
                  });
                }
                return [];
              }
            },

            onClick: function(e, legendItem) {
              var index = legendItem.index;
              var chart = this.chart;
              var i, ilen, meta;

              for (
                i = 0, ilen = (chart.data.datasets || []).length;
                i < ilen;
                ++i
              ) {
                meta = chart.getDatasetMeta(i);
                meta.data[index].hidden = !meta.data[index].hidden;
              }
              chart.update();
            }
          },

          // Need to override these to give a nice default
          tooltips: {
            callbacks: {
              title: function() {
                return '';
              },
              label: function(item, data) {
                return data.labels[item.index] + ': ' + item.yLabel;
              }
            }
          }
        });
        module.exports = function(Chart) {
          Chart.controllers.polarArea = Chart.DatasetController.extend({
            dataElementType: elements.Arc,
            linkScales: helpers.noop,
            update: function(reset) {
              var me = this;
              var dataset = me.getDataset();
              var meta = me.getMeta();
              var start = me.chart.options.startAngle || 0;
              var starts = (me._starts = []);
              var angles = (me._angles = []);
              var i, ilen, angle;
              me._updateRadius();
              meta.count = me.countVisibleElements();
              for (i = 0, ilen = dataset.data.length; i < ilen; i++) {
                starts[i] = start;
                angle = me._computeAngle(i);
                angles[i] = angle;
                start += angle;
              }
              helpers.each(meta.data, function(arc, index) {
                me.updateElement(arc, index, reset);
              });
            },

            /**
             * @private
             */
            _updateRadius: function() {
              var me = this;
              var chart = me.chart;
              var chartArea = chart.chartArea;
              var opts = chart.options;
              var arcOpts = opts.elements.arc;
              var minSize = Math.min(
                chartArea.right - chartArea.left,
                chartArea.bottom - chartArea.top
              );

              chart.outerRadius = Math.max(
                (minSize - arcOpts.borderWidth / 2) / 2,
                0
              );
              chart.innerRadius = Math.max(
                opts.cutoutPercentage
                  ? (chart.outerRadius / 100) * opts.cutoutPercentage
                  : 1,
                0
              );
              chart.radiusLength =
                (chart.outerRadius - chart.innerRadius) /
                chart.getVisibleDatasetCount();

              me.outerRadius =
                chart.outerRadius - chart.radiusLength * me.index;
              me.innerRadius = me.outerRadius - chart.radiusLength;
            },

            updateElement: function(arc, index, reset) {
              var me = this;
              var chart = me.chart;
              var dataset = me.getDataset();
              var opts = chart.options;
              var animationOpts = opts.animation;
              var scale = chart.scale;
              var labels = chart.data.labels;

              var centerX = scale.xCenter;
              var centerY = scale.yCenter;

              // var negHalfPI = -0.5 * Math.PI;
              var datasetStartAngle = opts.startAngle;
              var distance = arc.hidden
                ? 0
                : scale.getDistanceFromCenterForValue(dataset.data[index]);
              var startAngle = me._starts[index];
              var endAngle = startAngle + (arc.hidden ? 0 : me._angles[index]);

              var resetRadius = animationOpts.animateScale
                ? 0
                : scale.getDistanceFromCenterForValue(dataset.data[index]);

              helpers.extend(arc, {
                // Utility
                _datasetIndex: me.index,
                _index: index,
                _scale: scale,

                // Desired view properties
                _model: {
                  x: centerX,
                  y: centerY,
                  innerRadius: 0,
                  outerRadius: reset ? resetRadius : distance,
                  startAngle:
                    reset && animationOpts.animateRotate
                      ? datasetStartAngle
                      : startAngle,
                  endAngle:
                    reset && animationOpts.animateRotate
                      ? datasetStartAngle
                      : endAngle,
                  label: helpers.valueAtIndexOrDefault(
                    labels,
                    index,
                    labels[index]
                  )
                }
              });

              // Apply border and fill style
              var elementOpts = this.chart.options.elements.arc;
              var custom = arc.custom || {};
              var valueOrDefault = helpers.valueAtIndexOrDefault;
              var model = arc._model;

              model.backgroundColor = custom.backgroundColor
                ? custom.backgroundColor
                : valueOrDefault(
                    dataset.backgroundColor,
                    index,
                    elementOpts.backgroundColor
                  );
              model.borderColor = custom.borderColor
                ? custom.borderColor
                : valueOrDefault(
                    dataset.borderColor,
                    index,
                    elementOpts.borderColor
                  );
              model.borderWidth = custom.borderWidth
                ? custom.borderWidth
                : valueOrDefault(
                    dataset.borderWidth,
                    index,
                    elementOpts.borderWidth
                  );

              arc.pivot();
            },

            countVisibleElements: function() {
              var dataset = this.getDataset();
              var meta = this.getMeta();
              var count = 0;

              helpers.each(meta.data, function(element, index) {
                if (!isNaN(dataset.data[index]) && !element.hidden) {
                  count++;
                }
              });

              return count;
            },

            /**
             * @private
             */
            _computeAngle: function(index) {
              var me = this;
              var count = this.getMeta().count;
              var dataset = me.getDataset();
              var meta = me.getMeta();

              if (isNaN(dataset.data[index]) || meta.data[index].hidden) {
                return 0;
              }
              // Scriptable options
              var context = {
                chart: me.chart,
                dataIndex: index,
                dataset: dataset,
                datasetIndex: me.index
              };

              return helpers.options.resolve(
                [me.chart.options.elements.arc.angle, (2 * Math.PI) / count],
                context,
                index
              );
            }
          });
        };
      },
      {
        '../core/core.defaults': 43,
        '../elements/index': 58,
        '../helpers/index': 63
      }
    ],
    37: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('../core/core.defaults');
        var elements = require('../elements/index');
        var helpers = require('../helpers/index');

        defaults._set('radar', {
          scale: {
            type: 'radialLinear'
          },
          elements: {
            line: {
              tension: 0 // no bezier in radar
            }
        });
        module.exports = function(Chart) {
          Chart.controllers.radar = Chart.DatasetController.extend({
            datasetElementType: elements.Line,

            dataElementType: elements.Point,

            linkScales: helpers.noop,

            update: function(reset) {
              var me = this;
              var meta = me.getMeta();
              var line = meta.dataset;
              var points = meta.data;
              var custom = line.custom || {};
              var dataset = me.getDataset();
              var lineElementOptions = me.chart.options.elements.line;
              var scale = me.chart.scale;

              // Compatibility: If the properties are defined with only the old name, use those values
              if (
                dataset.tension !== undefined &&
                dataset.lineTension === undefined
              ) {
                dataset.lineTension = dataset.tension;
              }
              helpers.extend(meta.dataset, {
                // Utility
                _datasetIndex: me.index,
                _scale: scale,
                // Data
                _children: points,
                _loop: true,
                // Model
                _model: {
                  // Appearance
                  tension: custom.tension
                    ? custom.tension
                    : helpers.valueOrDefault(
                        dataset.lineTension,
                        lineElementOptions.tension
                      ),
                  backgroundColor: custom.backgroundColor
                    ? custom.backgroundColor
                    : dataset.backgroundColor ||
                      lineElementOptions.backgroundColor,
                  borderWidth: custom.borderWidth
                    ? custom.borderWidth
                    : dataset.borderWidth || lineElementOptions.borderWidth,
                  borderColor: custom.borderColor
                    ? custom.borderColor
                    : dataset.borderColor || lineElementOptions.borderColor,
                  fill: custom.fill
                    ? custom.fill
                    : dataset.fill !== undefined
                    ? dataset.fill
                    : lineElementOptions.fill,
                  borderCapStyle: custom.borderCapStyle
                    ? custom.borderCapStyle
                    : dataset.borderCapStyle ||
                      lineElementOptions.borderCapStyle,
                  borderDash: custom.borderDash
                    ? custom.borderDash
                    : dataset.borderDash || lineElementOptions.borderDash,
                  borderDashOffset: custom.borderDashOffset
                    ? custom.borderDashOffset
                    : dataset.borderDashOffset ||
                      lineElementOptions.borderDashOffset,
                  borderJoinStyle: custom.borderJoinStyle
                    ? custom.borderJoinStyle
                    : dataset.borderJoinStyle ||
                      lineElementOptions.borderJoinStyle
                }
              });

              meta.dataset.pivot();

              // Update Points
              helpers.each(
                points,
                function(point, index) {
                  me.updateElement(point, index, reset);
                },
                me
              );

              // Update bezier control points
              me.updateBezierControlPoints();
            },
            updateElement: function(point, index, reset) {
              var me = this;
              var custom = point.custom || {};
              var dataset = me.getDataset();
              var scale = me.chart.scale;
              var pointElementOptions = me.chart.options.elements.point;
              var pointPosition = scale.getPointPositionForValue(
                index,
                dataset.data[index]
              );

              // Compatibility: If the properties are defined with only the old name, use those values
              if (
                dataset.radius !== undefined &&
                dataset.pointRadius === undefined
              ) {
                dataset.pointRadius = dataset.radius;
              }
              if (
                dataset.hitRadius !== undefined &&
                dataset.pointHitRadius === undefined
              ) {
                dataset.pointHitRadius = dataset.hitRadius;
              }
              helpers.extend(point, {
                // Utility
                _datasetIndex: me.index,
                _index: index,
                _scale: scale,

                // Desired view properties
                _model: {
                  x: reset ? scale.xCenter : pointPosition.x, // value not used in dataset scale, but we want a consistent API between scales
                  y: reset ? scale.yCenter : pointPosition.y,

                  // Appearance
                  tension: custom.tension
                    ? custom.tension
                    : helpers.valueOrDefault(
                        dataset.lineTension,
                        me.chart.options.elements.line.tension
                      ),
                  radius: custom.radius
                    ? custom.radius
                    : helpers.valueAtIndexOrDefault(
                        dataset.pointRadius,
                        index,
                        pointElementOptions.radius
                      ),
                  backgroundColor: custom.backgroundColor
                    ? custom.backgroundColor
                    : helpers.valueAtIndexOrDefault(
                        dataset.pointBackgroundColor,
                        index,
                        pointElementOptions.backgroundColor
                      ),
                  borderColor: custom.borderColor
                    ? custom.borderColor
                    : helpers.valueAtIndexOrDefault(
                        dataset.pointBorderColor,
                        index,
                        pointElementOptions.borderColor
                      ),
                  borderWidth: custom.borderWidth
                    ? custom.borderWidth
                    : helpers.valueAtIndexOrDefault(
                        dataset.pointBorderWidth,
                        index,
                        pointElementOptions.borderWidth
                      ),
                  pointStyle: custom.pointStyle
                    ? custom.pointStyle
                    : helpers.valueAtIndexOrDefault(
                        dataset.pointStyle,
                        index,
                        pointElementOptions.pointStyle
                      ),
                  rotation: custom.rotation
                    ? custom.rotation
                    : helpers.valueAtIndexOrDefault(
                        dataset.pointRotation,
                        index,
                        pointElementOptions.rotation
                      ),

                  // Tooltip
                  hitRadius: custom.hitRadius
                    ? custom.hitRadius
                    : helpers.valueAtIndexOrDefault(
                        dataset.pointHitRadius,
                        index,
                        pointElementOptions.hitRadius
                      )
                }
              });

              point._model.skip = custom.skip
                ? custom.skip
                : isNaN(point._model.x) || isNaN(point._model.y);
            },
            updateBezierControlPoints: function() {
              var chartArea = this.chart.chartArea;
              var meta = this.getMeta();

              helpers.each(meta.data, function(point, index) {
                var model = point._model;
                var controlPoints = helpers.splineCurve(
                  helpers.previousItem(meta.data, index, true)._model,
                  model,
                  helpers.nextItem(meta.data, index, true)._model,
                  model.tension
                );

                // Prevent the bezier going outside of the bounds of the graph
                model.controlPointPreviousX = Math.max(
                  Math.min(controlPoints.previous.x, chartArea.right),
                  chartArea.left
                );
                model.controlPointPreviousY = Math.max(
                  Math.min(controlPoints.previous.y, chartArea.bottom),
                  chartArea.top
                );

                model.controlPointNextX = Math.max(
                  Math.min(controlPoints.next.x, chartArea.right),
                  chartArea.left
                );
                model.controlPointNextY = Math.max(
                  Math.min(controlPoints.next.y, chartArea.bottom),
                  chartArea.top
                );

                // Now pivot the point for animation
                point.pivot();
              });
            },

            setHoverStyle: function(point) {
              // Point
              var dataset = this.chart.data.datasets[point._datasetIndex];
              var custom = point.custom || {};
              var index = point._index;
              var model = point._model;

              point.$previousStyle = {
                backgroundColor: model.backgroundColor,
                borderColor: model.borderColor,
                borderWidth: model.borderWidth,
                radius: model.radius
              };

              model.radius = custom.hoverRadius
                ? custom.hoverRadius
                : helpers.valueAtIndexOrDefault(
                    dataset.pointHoverRadius,
                    index,
                    this.chart.options.elements.point.hoverRadius
                  );
              model.backgroundColor = custom.hoverBackgroundColor
                ? custom.hoverBackgroundColor
                : helpers.valueAtIndexOrDefault(
                    dataset.pointHoverBackgroundColor,
                    index,
                    helpers.getHoverColor(model.backgroundColor)
                  );
              model.borderColor = custom.hoverBorderColor
                ? custom.hoverBorderColor
                : helpers.valueAtIndexOrDefault(
                    dataset.pointHoverBorderColor,
                    index,
                    helpers.getHoverColor(model.borderColor)
                  );
              model.borderWidth = custom.hoverBorderWidth
                ? custom.hoverBorderWidth
                : helpers.valueAtIndexOrDefault(
                    dataset.pointHoverBorderWidth,
                    index,
                    model.borderWidth
                  );
            }
          });
        };
      },
      {
        '../core/core.defaults': 43,
        '../elements/index': 58,
        '../helpers/index': 63
      }
    ],
    38: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('../core/core.defaults');

        defaults._set('scatter', {
          hover: {
            mode: 'single'
          },

          scales: {
            xAxes: [
              {
                id: 'x-axis-1', // need an ID so datasets can reference the scale
                type: 'linear', // scatter should not use a category axis
                position: 'bottom'
              }
            ],
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                position: 'left'
              }
            ]
          },

          showLines: false,

          tooltips: {
            callbacks: {
              title: function() {
                return ''; // doesn't make sense for scatter since data are formatted as a point
              },
              label: function(item) {
                return '(' + item.xLabel + ', ' + item.yLabel + ')';
              }
            }
          }
        });
        module.exports = function(Chart) {
          // Scatter charts use line controllers
          Chart.controllers.scatter = Chart.controllers.line;
        };
      },
      { '../core/core.defaults': 43 }
    ],
    39: [
      function(require, module, exports) {
        'use strict';

        var Element = require('./core.element');

        var exports = (module.exports = Element.extend({
          chart: null, // the animation associated chart instance
          currentStep: 0, // the current animation step
          numSteps: 60, // default number of steps
          easing: '', // the easing to use for this animation
          render: null, // render function used by the animation service

          onAnimationProgress: null, // user specified callback to fire on each step of the animation
          onAnimationComplete: null // user specified callback to fire when the animation finishes
        }));
        // DEPRECATIONS
        /**
         * Provided for backward compatibility, use Chart.Animation instead
         * @prop Chart.Animation#animationObject
         * @deprecated since version 2.6.0
         * @todo remove at version 3
         */
        Object.defineProperty(exports.prototype, 'animationObject', {
          get: function() {
            return this;
          }
        });
        /**
         * Provided for backward compatibility, use Chart.Animation#chart instead
         * @prop Chart.Animation#chartInstance
         * @deprecated since version 2.6.0
         * @todo remove at version 3
         */
        Object.defineProperty(exports.prototype, 'chartInstance', {
          get: function() {
            return this.chart;
          },
          set: function(value) {
            this.chart = value;
          }
        });
      },
      { './core.element': 44 }
    ],
    40: [
      function(require, module, exports) {
        /* global window: false */
        'use strict';

        var defaults = require('./core.defaults');
        var helpers = require('../helpers/index');

        defaults._set('global', {
          animation: {
            duration: 1000,
            easing: 'easeOutQuart',
            onProgress: helpers.noop,
            onComplete: helpers.noop
          }
        });
        module.exports = {
          frameDuration: 17,
          animations: [],
          dropFrames: 0,
          request: null,

          /**
           * @param {Chart} chart - The chart to animate.
           * @param {Chart.Animation} animation - The animation that we will animate.
           * @param {Number} duration - The animation duration in ms.
           * @param {Boolean} lazy - if true, the chart is not marked as animating to enable more responsive interactions
           */
          addAnimation: function(chart, animation, duration, lazy) {
            var animations = this.animations;
            var i, ilen;

            animation.chart = chart;

            if (!lazy) {
              chart.animating = true;
            }
            for (i = 0, ilen = animations.length; i < ilen; ++i) {
              if (animations[i].chart === chart) {
                animations[i] = animation;
                return;
              }
            }
            animations.push(animation);
            // If there are no animations queued, manually kickstart a digest, for lack of a better word
            if (animations.length === 1) {
              this.requestAnimationFrame();
            }
          },
          cancelAnimation: function(chart) {
            var index = helpers.findIndex(this.animations, function(animation) {
              return animation.chart === chart;
            });
            if (index !== -1) {
              this.animations.splice(index, 1);
              chart.animating = false;
            }
          },

          requestAnimationFrame: function() {
            var me = this;
            if (me.request === null) {
              // Skip animation frame requests until the active one is executed.
              // This can happen when processing mouse events, e.g. 'mousemove'
              // and 'mouseout' events will trigger multiple renders.
              me.request = helpers.requestAnimFrame.call(window, function() {
                me.request = null;
                me.startDigest();
              });
            }
          },

          /**
           * @private
           */
          startDigest: function() {
            var me = this;
            var startTime = Date.now();
            var framesToDrop = 0;

            if (me.dropFrames > 1) {
              framesToDrop = Math.floor(me.dropFrames);
              me.dropFrames = me.dropFrames % 1;
            }
            me.advance(1 + framesToDrop);
            var endTime = Date.now();
            me.dropFrames += (endTime - startTime) / me.frameDuration;
            // Do we have more stuff to animate?
            if (me.animations.length > 0) {
              me.requestAnimationFrame();
            }
          },

          /**
           * @private
           */
          advance: function(count) {
            var animations = this.animations;
            var animation, chart;
            var i = 0;

            while (i < animations.length) {
              animation = animations[i];
              chart = animation.chart;

              animation.currentStep = (animation.currentStep || 0) + count;
              animation.currentStep = Math.min(
                animation.currentStep,
                animation.numSteps
              );

              helpers.callback(animation.render, [chart, animation], chart);
              helpers.callback(
                animation.onAnimationProgress,
                [animation],
                chart
              );

              if (animation.currentStep >= animation.numSteps) {
                helpers.callback(
                  animation.onAnimationComplete,
                  [animation],
                  chart
                );
                chart.animating = false;
                animations.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
        };
      },
      { '../helpers/index': 63, './core.defaults': 43 }
    ],
    41: [
      function(require, module, exports) {
        'use strict';

        var Animation = require('./core.animation');
        var animations = require('./core.animations');
        var defaults = require('./core.defaults');
        var helpers = require('../helpers/index');
        var Interaction = require('./core.interaction');
        var layouts = require('./core.layouts');
        var platform = require('../platforms/platform');
        var plugins = require('./core.plugins');
        var scaleService = require('../core/core.scaleService');
        var Tooltip = require('./core.tooltip');

        module.exports = function(Chart) {
          // Create a dictionary of chart types, to allow for extension of existing types
          Chart.types = {};

          // Store a reference to each instance - allowing us to globally resize chart instances on window resize.
          // Destroy method on the chart will remove the instance of the chart from this reference.
          Chart.instances = {};

          // Controllers available for dataset visualization eg. bar, line, slice, etc.
          Chart.controllers = {};

          /**
           * Initializes the given config with global and chart default values.
           */
          function initConfig(config) {
            config = config || {};

            // Do NOT use configMerge() for the data object because this method merges arrays
            // and so would change references to labels and datasets, preventing data updates.
            var data = (config.data = config.data || {});
            data.datasets = data.datasets || [];
            data.labels = data.labels || [];

            config.options = helpers.configMerge(
              defaults.global,
              defaults[config.type],
              config.options || {}
            );

            return config;
          }
          /**
           * Updates the config of the chart
           * @param chart {Chart} chart to update the options for
           */
          function updateConfig(chart) {
            var newOptions = chart.options;
            helpers.each(chart.scales, function(scale) {
              layouts.removeBox(chart, scale);
            });
            newOptions = helpers.configMerge(
              Chart.defaults.global,
              Chart.defaults[chart.config.type],
              newOptions
            );

            chart.options = chart.config.options = newOptions;
            chart.ensureScalesHaveIDs();
            chart.buildOrUpdateScales();
            // Tooltip
            chart.tooltip._options = newOptions.tooltips;
            chart.tooltip.initialize();
          }
          function positionIsHorizontal(position) {
            return position === 'top' || position === 'bottom';
          }
          helpers.extend(
            Chart.prototype,
            /** @lends Chart */ {
              /**
               * @private
               */
              construct: function(item, config) {
                var me = this;

                config = initConfig(config);

                var context = platform.acquireContext(item, config);
                var canvas = context && context.canvas;
                var height = canvas && canvas.height;
                var width = canvas && canvas.width;

                me.id = helpers.uid();
                me.ctx = context;
                me.canvas = canvas;
                me.config = config;
                me.width = width;
                me.height = height;
                me.aspectRatio = height ? width / height : null;
                me.options = config.options;
                me._bufferedRender = false;

                /**
                 * Provided for backward compatibility, Chart and Chart.Controller have been merged,
                 * the "instance" still need to be defined since it might be called from plugins.
                 * @prop Chart#chart
                 * @deprecated since version 2.6.0
                 * @todo remove at version 3
                 * @private
                 */
                me.chart = me;
                me.controller = me; // chart.chart.controller #inception

                // Add the chart instance to the global namespace
                Chart.instances[me.id] = me;

                // Define alias to the config data: `chart.data === chart.config.data`
                Object.defineProperty(me, 'data', {
                  get: function() {
                    return me.config.data;
                  },
                  set: function(value) {
                    me.config.data = value;
                  }
                });
                if (!context || !canvas) {
                  // The given item is not a compatible context2d element, let's return before finalizing
                  // the chart initialization but after setting basic chart / controller properties that
                  // can help to figure out that the chart is not valid (e.g chart.canvas !== null);
                  // https://github.com/chartjs/Chart.js/issues/2807
                  console.error(
                    "Failed to create chart: can't acquire context from the given item"
                  );
                  return;
                }
                me.initialize();
                me.update();
              },
              /**
               * @private
               */
              initialize: function() {
                var me = this;
                // Before init plugin notification
                plugins.notify(me, 'beforeInit');
                helpers.retinaScale(me, me.options.devicePixelRatio);
                me.bindEvents();
                if (me.options.responsive) {
                  // Initial resize before chart draws (must be silent to preserve initial animations).
                  me.resize(true);
                }
                // Make sure scales have IDs and are built before we build any controllers.
                me.ensureScalesHaveIDs();
                me.buildOrUpdateScales();
                me.initToolTip();
                // After init plugin notification
                plugins.notify(me, 'afterInit');
                return me;
              },
              clear: function() {
                helpers.canvas.clear(this);
                return this;
              },
              stop: function() {
                // Stops any current animation loop occurring
                animations.cancelAnimation(this);
                return this;
              },

              resize: function(silent) {
                var me = this;
                var options = me.options;
                var canvas = me.canvas;
                var aspectRatio =
                  (options.maintainAspectRatio && me.aspectRatio) || null;

                // the canvas render width and height will be casted to integers so make sure that
                // the canvas display style uses the same integer values to avoid blurring effect.

                // Set to 0 instead of canvas.size because the size defaults to 300x150 if the element is collapsed
                var newWidth = Math.max(
                  0,
                  Math.floor(helpers.getMaximumWidth(canvas))
                );
                var newHeight = Math.max(
                  0,
                  Math.floor(
                    aspectRatio
                      ? newWidth / aspectRatio
                      : helpers.getMaximumHeight(canvas)
                  )
                );

                if (me.width === newWidth && me.height === newHeight) {
                  return;
                }
                canvas.width = me.width = newWidth;
                canvas.height = me.height = newHeight;
                canvas.style.width = newWidth + 'px';
                canvas.style.height = newHeight + 'px';
                helpers.retinaScale(me, options.devicePixelRatio);
                if (!silent) {
                  // Notify any plugins about the resize
                  var newSize = { width: newWidth, height: newHeight };
                  plugins.notify(me, 'resize', [newSize]);
                  // Notify of resize
                  if (me.options.onResize) {
                    me.options.onResize(me, newSize);
                  }
                  me.stop();
                  me.update({
                    duration: me.options.responsiveAnimationDuration
                  });
                }
              },

              ensureScalesHaveIDs: function() {
                var options = this.options;
                var scalesOptions = options.scales || {};
                var scaleOptions = options.scale;

                helpers.each(scalesOptions.xAxes, function(
                  xAxisOptions,
                  index
                ) {
                  xAxisOptions.id = xAxisOptions.id || 'x-axis-' + index;
                });
                helpers.each(scalesOptions.yAxes, function(
                  yAxisOptions,
                  index
                ) {
                  yAxisOptions.id = yAxisOptions.id || 'y-axis-' + index;
                });
                if (scaleOptions) {
                  scaleOptions.id = scaleOptions.id || 'scale';
                }
              },

              /**
               * Builds a map of scale ID to scale object for future lookup.
               */
              buildOrUpdateScales: function() {
                var me = this;
                var options = me.options;
                var scales = me.scales || {};
                var items = [];
                var updated = Object.keys(scales).reduce(function(obj, id) {
                  obj[id] = false;
                  return obj;
                }, {});

                if (options.scales) {
                  items = items.concat(
                    (options.scales.xAxes || []).map(function(xAxisOptions) {
                      return {
                        options: xAxisOptions,
                        dtype: 'category',
                        dposition: 'bottom'
                      };
                    }),
                    (options.scales.yAxes || []).map(function(yAxisOptions) {
                      return {
                        options: yAxisOptions,
                        dtype: 'linear',
                        dposition: 'left'
                      };
                    })
                  );
                }
                if (options.scale) {
                  items.push({
                    options: options.scale,
                    dtype: 'radialLinear',
                    isDefault: true,
                    dposition: 'chartArea'
                  });
                }
                helpers.each(items, function(item) {
                  var scaleOptions = item.options;
                  var id = scaleOptions.id;
                  var scaleType = helpers.valueOrDefault(
                    scaleOptions.type,
                    item.dtype
                  );

                  if (
                    positionIsHorizontal(scaleOptions.position) !==
                    positionIsHorizontal(item.dposition)
                  ) {
                    scaleOptions.position = item.dposition;
                  }

                  updated[id] = true;
                  var scale = null;
                  if (id in scales && scales[id].type === scaleType) {
                    scale = scales[id];
                    scale.options = scaleOptions;
                    scale.ctx = me.ctx;
                    scale.chart = me;
                  } else {
                    var scaleClass = scaleService.getScaleConstructor(
                      scaleType
                    );
                    if (!scaleClass) {
                      return;
                    }
                    scale = new scaleClass({
                      id: id,
                      type: scaleType,
                      options: scaleOptions,
                      ctx: me.ctx,
                      chart: me
                    });
                    scales[scale.id] = scale;
                  }
                  scale.mergeTicksOptions();
                  // TODO(SB): I think we should be able to remove this custom case (options.scale)
                  // and consider it as a regular scale part of the "scales"" map only! This would
                  // make the logic easier and remove some useless? custom code.
                  if (item.isDefault) {
                    me.scale = scale;
                  }
                });
                // clear up discarded scales
                helpers.each(updated, function(hasUpdated, id) {
                  if (!hasUpdated) {
                    delete scales[id];
                  }
                });
                me.scales = scales;
                scaleService.addScalesToLayout(this);
              },
              buildOrUpdateControllers: function() {
                var me = this;
                var types = [];
                var newControllers = [];
                helpers.each(
                  me.data.datasets,
                  function(dataset, datasetIndex) {
                    var meta = me.getDatasetMeta(datasetIndex);
                    var type = dataset.type || me.config.type;
                    if (meta.type && meta.type !== type) {
                      me.destroyDatasetMeta(datasetIndex);
                      meta = me.getDatasetMeta(datasetIndex);
                    }
                    meta.type = type;
                    types.push(meta.type);
                    if (meta.controller) {
                      meta.controller.updateIndex(datasetIndex);
                      meta.controller.linkScales();
                    } else {
                      var ControllerClass = Chart.controllers[meta.type];
                      if (ControllerClass === undefined) {
                        throw new Error(
                          '"' + meta.type + '" is not a chart type.'
                        );
                      }

                      meta.controller = new ControllerClass(me, datasetIndex);
                      newControllers.push(meta.controller);
                    }
                  },
                  me
                );

                return newControllers;
              },

              /**
               * Reset the elements of all datasets
               * @private
               */
              resetElements: function() {
                var me = this;
                helpers.each(
                  me.data.datasets,
                  function(dataset, datasetIndex) {
                    me.getDatasetMeta(datasetIndex).controller.reset();
                  },
                  me
                );
              },

              /**
               * Resets the chart back to it's state before the initial animation
               */
              reset: function() {
                this.resetElements();
                this.tooltip.initialize();
              },

              update: function(config) {
                var me = this;

                if (!config || typeof config !== 'object') {
                  // backwards compatibility
                  config = {
                    duration: config,
                    lazy: arguments[1]
                  };
                }
                updateConfig(me);
                // plugins options references might have change, let's invalidate the cache
                // https://github.com/chartjs/Chart.js/issues/5111#issuecomment-355934167
                plugins._invalidate(me);
                if (plugins.notify(me, 'beforeUpdate') === false) {
                  return;
                }
                // In case the entire data object changed
                me.tooltip._data = me.data;

                // Make sure dataset controllers are updated and new controllers are reset
                var newControllers = me.buildOrUpdateControllers();

                // Make sure all dataset controllers have correct meta data counts
                helpers.each(
                  me.data.datasets,
                  function(dataset, datasetIndex) {
                    me.getDatasetMeta(
                      datasetIndex
                    ).controller.buildOrUpdateElements();
                  },
                  me
                );

                me.updateLayout();

                // Can only reset the new controllers after the scales have been updated
                if (me.options.animation && me.options.animation.duration) {
                  helpers.each(newControllers, function(controller) {
                    controller.reset();
                  });
                }
                me.updateDatasets();
                // Need to reset tooltip in case it is displayed with elements that are removed
                // after update.
                me.tooltip.initialize();
                // Last active contains items that were previously in the tooltip.
                // When we reset the tooltip, we need to clear it
                me.lastActive = [];
                // Do this before render so that any plugins that need final scale updates can use it
                plugins.notify(me, 'afterUpdate');
                if (me._bufferedRender) {
                  me._bufferedRequest = {
                    duration: config.duration,
                    easing: config.easing,
                    lazy: config.lazy
                  };
                } else {
                  me.render(config);
                }
              },

              /**
               * Updates the chart layout unless a plugin returns `false` to the `beforeLayout`
               * hook, in which case, plugins will not be called on `afterLayout`.
               * @private
               */
              updateLayout: function() {
                var me = this;

                if (plugins.notify(me, 'beforeLayout') === false) {
                  return;
                }
                layouts.update(this, this.width, this.height);

                /**
                 * Provided for backward compatibility, use `afterLayout` instead.
                 * @method IPlugin#afterScaleUpdate
                 * @deprecated since version 2.5.0
                 * @todo remove at version 3
                 * @private
                 */
                plugins.notify(me, 'afterScaleUpdate');
                plugins.notify(me, 'afterLayout');
              },

              /**
               * Updates all datasets unless a plugin returns `false` to the `beforeDatasetsUpdate`
               * hook, in which case, plugins will not be called on `afterDatasetsUpdate`.
               * @private
               */
              updateDatasets: function() {
                var me = this;

                if (plugins.notify(me, 'beforeDatasetsUpdate') === false) {
                  return;
                }
                for (var i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
                  me.updateDataset(i);
                }
                plugins.notify(me, 'afterDatasetsUpdate');
              },

              /**
               * Updates dataset at index unless a plugin returns `false` to the `beforeDatasetUpdate`
               * hook, in which case, plugins will not be called on `afterDatasetUpdate`.
               * @private
               */
              updateDataset: function(index) {
                var me = this;
                var meta = me.getDatasetMeta(index);
                var args = {
                  meta: meta,
                  index: index
                };

                if (
                  plugins.notify(me, 'beforeDatasetUpdate', [args]) === false
                ) {
                  return;
                }
                meta.controller.update();
                plugins.notify(me, 'afterDatasetUpdate', [args]);
              },
              render: function(config) {
                var me = this;
                if (!config || typeof config !== 'object') {
                  // backwards compatibility
                  config = {
                    duration: config,
                    lazy: arguments[1]
                  };
                }
                var duration = config.duration;
                var lazy = config.lazy;
                if (plugins.notify(me, 'beforeRender') === false) {
                  return;
                }
                var animationOptions = me.options.animation;
                var onComplete = function(animation) {
                  plugins.notify(me, 'afterRender');
                  helpers.callback(
                    animationOptions && animationOptions.onComplete,
                    [animation],
                    me
                  );
                };

                if (
                  animationOptions &&
                  ((typeof duration !== 'undefined' && duration !== 0) ||
                    (typeof duration === 'undefined' &&
                      animationOptions.duration !== 0))
                ) {
                  var animation = new Animation({
                    numSteps: (duration || animationOptions.duration) / 16.66, // 60 fps
                    easing: config.easing || animationOptions.easing,

                    render: function(chart, animationObject) {
                      var easingFunction =
                        helpers.easing.effects[animationObject.easing];
                      var currentStep = animationObject.currentStep;
                      var stepDecimal = currentStep / animationObject.numSteps;

                      chart.draw(
                        easingFunction(stepDecimal),
                        stepDecimal,
                        currentStep
                      );
                    },

                    onAnimationProgress: animationOptions.onProgress,
                    onAnimationComplete: onComplete
                  });

                  animations.addAnimation(me, animation, duration, lazy);
                } else {
                  me.draw();
                  // See https://github.com/chartjs/Chart.js/issues/3781
                  onComplete(new Animation({ numSteps: 0, chart: me }));
                }
                return me;
              },
              draw: function(easingValue) {
                var me = this;
                me.clear();
                if (helpers.isNullOrUndef(easingValue)) {
                  easingValue = 1;
                }
                me.transition(easingValue);
                if (me.width <= 0 || me.height <= 0) {
                  return;
                }
                if (plugins.notify(me, 'beforeDraw', [easingValue]) === false) {
                  return;
                }
                // Draw all the scales
                helpers.each(
                  me.boxes,
                  function(box) {
                    box.draw(me.chartArea);
                  },
                  me
                );

                if (me.scale) {
                  me.scale.draw();
                }
                me.drawDatasets(easingValue);
                me._drawTooltip(easingValue);

                plugins.notify(me, 'afterDraw', [easingValue]);
              },

              /**
               * @private
               */
              transition: function(easingValue) {
                var me = this;

                for (
                  var i = 0, ilen = (me.data.datasets || []).length;
                  i < ilen;
                  ++i
                ) {
                  if (me.isDatasetVisible(i)) {
                    me.getDatasetMeta(i).controller.transition(easingValue);
                  }
                }
                me.tooltip.transition(easingValue);
              },

              /**
               * Draws all datasets unless a plugin returns `false` to the `beforeDatasetsDraw`
               * hook, in which case, plugins will not be called on `afterDatasetsDraw`.
               * @private
               */
              drawDatasets: function(easingValue) {
                var me = this;

                if (
                  plugins.notify(me, 'beforeDatasetsDraw', [easingValue]) ===
                  false
                ) {
                  return;
                }
                // Draw datasets reversed to support proper line stacking
                for (var i = (me.data.datasets || []).length - 1; i >= 0; --i) {
                  if (me.isDatasetVisible(i)) {
                    me.drawDataset(i, easingValue);
                  }
                }
                plugins.notify(me, 'afterDatasetsDraw', [easingValue]);
              },

              /**
               * Draws dataset at index unless a plugin returns `false` to the `beforeDatasetDraw`
               * hook, in which case, plugins will not be called on `afterDatasetDraw`.
               * @private
               */
              drawDataset: function(index, easingValue) {
                var me = this;
                var meta = me.getDatasetMeta(index);
                var args = {
                  meta: meta,
                  index: index,
                  easingValue: easingValue
                };

                if (plugins.notify(me, 'beforeDatasetDraw', [args]) === false) {
                  return;
                }
                meta.controller.draw(easingValue);

                plugins.notify(me, 'afterDatasetDraw', [args]);
              },

              /**
               * Draws tooltip unless a plugin returns `false` to the `beforeTooltipDraw`
               * hook, in which case, plugins will not be called on `afterTooltipDraw`.
               * @private
               */
              _drawTooltip: function(easingValue) {
                var me = this;
                var tooltip = me.tooltip;
                var args = {
                  tooltip: tooltip,
                  easingValue: easingValue
                };

                if (plugins.notify(me, 'beforeTooltipDraw', [args]) === false) {
                  return;
                }
                tooltip.draw();
                plugins.notify(me, 'afterTooltipDraw', [args]);
              },
              // Get the single element that was clicked on
              // @return : An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
              getElementAtEvent: function(e) {
                return Interaction.modes.single(this, e);
              },
              getElementsAtEvent: function(e) {
                return Interaction.modes.label(this, e, { intersect: true });
              },
              getElementsAtXAxis: function(e) {
                return Interaction.modes['x-axis'](this, e, {
                  intersect: true
                });
              },
              getElementsAtEventForMode: function(e, mode, options) {
                var method = Interaction.modes[mode];
                if (typeof method === 'function') {
                  return method(this, e, options);
                }
                return [];
              },
              getDatasetAtEvent: function(e) {
                return Interaction.modes.dataset(this, e, { intersect: true });
              },
              getDatasetMeta: function(datasetIndex) {
                var me = this;
                var dataset = me.data.datasets[datasetIndex];
                if (!dataset._meta) {
                  dataset._meta = {};
                }
                var meta = dataset._meta[me.id];
                if (!meta) {
                  meta = dataset._meta[me.id] = {
                    type: null,
                    data: [],
                    dataset: null,
                    controller: null,
                    hidden: null, // See isDatasetVisible() comment
                    xAxisID: null,
                    yAxisID: null
                  };
                }
                return meta;
              },

              getVisibleDatasetCount: function() {
                var count = 0;
                for (
                  var i = 0, ilen = this.data.datasets.length;
                  i < ilen;
                  ++i
                ) {
                  if (this.isDatasetVisible(i)) {
                    count++;
                  }
                }
                return count;
              },

              isDatasetVisible: function(datasetIndex) {
                var meta = this.getDatasetMeta(datasetIndex);

                // meta.hidden is a per chart dataset hidden flag override with 3 states: if true or false,
                // the dataset.hidden value is ignored, else if null, the dataset hidden state is returned.
                return typeof meta.hidden === 'boolean'
                  ? !meta.hidden
                  : !this.data.datasets[datasetIndex].hidden;
              },

              generateLegend: function() {
                return this.options.legendCallback(this);
              },

              /**
               * @private
               */
              destroyDatasetMeta: function(datasetIndex) {
                var id = this.id;
                var dataset = this.data.datasets[datasetIndex];
                var meta = dataset._meta && dataset._meta[id];

                if (meta) {
                  meta.controller.destroy();
                  delete dataset._meta[id];
                }
              },
              destroy: function() {
                var me = this;
                var canvas = me.canvas;
                var i, ilen;
                me.stop();
                // dataset controllers need to cleanup associated data
                for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
                  me.destroyDatasetMeta(i);
                }
                if (canvas) {
                  me.unbindEvents();
                  helpers.canvas.clear(me);
                  platform.releaseContext(me.ctx);
                  me.canvas = null;
                  me.ctx = null;
                }
                plugins.notify(me, 'destroy');

                delete Chart.instances[me.id];
              },

              toBase64Image: function() {
                return this.canvas.toDataURL.apply(this.canvas, arguments);
              },

              initToolTip: function() {
                var me = this;
                me.tooltip = new Tooltip(
                  {
                    _chart: me,
                    _chartInstance: me, // deprecated, backward compatibility
                    _data: me.data,
                    _options: me.options.tooltips
                  },
                  me
                );
              },

              /**
               * @private
               */
              bindEvents: function() {
                var me = this;
                var listeners = (me._listeners = {});
                var listener = function() {
                  me.eventHandler.apply(me, arguments);
                };

                helpers.each(me.options.events, function(type) {
                  platform.addEventListener(me, type, listener);
                  listeners[type] = listener;
                });
                // Elements used to detect size change should not be injected for non responsive charts.
                // See https://github.com/chartjs/Chart.js/issues/2210
                if (me.options.responsive) {
                  listener = function() {
                    me.resize();
                  };
                  platform.addEventListener(me, 'resize', listener);
                  listeners.resize = listener;
                }
              },

              /**
               * @private
               */
              unbindEvents: function() {
                var me = this;
                var listeners = me._listeners;
                if (!listeners) {
                  return;
                }
                delete me._listeners;
                helpers.each(listeners, function(listener, type) {
                  platform.removeEventListener(me, type, listener);
                });
              },

              updateHoverStyle: function(elements, mode, enabled) {
                var method = enabled ? 'setHoverStyle' : 'removeHoverStyle';
                var element, i, ilen;

                for (i = 0, ilen = elements.length; i < ilen; ++i) {
                  element = elements[i];
                  if (element) {
                    this.getDatasetMeta(element._datasetIndex).controller[
                      method
                    ](element);
                  }
                }
              },
              /**
               * @private
               */
              eventHandler: function(e) {
                var me = this;
                var tooltip = me.tooltip;
                if (plugins.notify(me, 'beforeEvent', [e]) === false) {
                  return;
                }
                // Buffer any update calls so that renders do not occur
                me._bufferedRender = true;
                me._bufferedRequest = null;

                var changed = me.handleEvent(e);
                // for smooth tooltip animations issue #4989
                // the tooltip should be the source of change
                // Animation check workaround:
                // tooltip._start will be null when tooltip isn't animating
                if (tooltip) {
                  changed = tooltip._start
                    ? tooltip.handleEvent(e)
                    : changed | tooltip.handleEvent(e);
                }
                plugins.notify(me, 'afterEvent', [e]);

                var bufferedRequest = me._bufferedRequest;
                if (bufferedRequest) {
                  // If we have an update that was triggered, we need to do a normal render
                  me.render(bufferedRequest);
                } else if (changed && !me.animating) {
                  // If entering, leaving, or changing elements, animate the change via pivot
                  me.stop();

                  // We only need to render at this point. Updating will cause scales to be
                  // recomputed generating flicker & using more memory than necessary.
                  me.render({
                    duration: me.options.hover.animationDuration,
                    lazy: true
                  });
                }
                me._bufferedRender = false;
                me._bufferedRequest = null;

                return me;
              },

              /**
               * Handle an event
               * @private
               * @param {IEvent} event the event to handle
               * @return {Boolean} true if the chart needs to re-render
               */
              handleEvent: function(e) {
                var me = this;
                var options = me.options || {};
                var hoverOptions = options.hover;
                var changed = false;

                me.lastActive = me.lastActive || [];

                // Find Active Elements for hover and tooltips
                if (e.type === 'mouseout') {
                  me.active = [];
                } else {
                  me.active = me.getElementsAtEventForMode(
                    e,
                    hoverOptions.mode,
                    hoverOptions
                  );
                }
                // Invoke onHover hook
                // Need to call with native event here to not break backwards compatibility
                helpers.callback(
                  options.onHover || options.hover.onHover,
                  [e.native, me.active],
                  me
                );

                if (e.type === 'mouseup' || e.type === 'click') {
                  if (options.onClick) {
                    // Use e.native here for backwards compatibility
                    options.onClick.call(me, e.native, me.active);
                  }
                }
                // Remove styling for last active (even if it may still be active)
                if (me.lastActive.length) {
                  me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
                }
                // Built in hover styling
                if (me.active.length && hoverOptions.mode) {
                  me.updateHoverStyle(me.active, hoverOptions.mode, true);
                }
                changed = !helpers.arrayEquals(me.active, me.lastActive);
                // Remember Last Actives
                me.lastActive = me.active;
                return changed;
              }
            }
          );

          /**
           * Provided for backward compatibility, use Chart instead.
           * @class Chart.Controller
           * @deprecated since version 2.6.0
           * @todo remove at version 3
           * @private
           */
          Chart.Controller = Chart;
        };
      },
      {
        '../core/core.scaleService': 51,
        '../helpers/index': 63,
        '../platforms/platform': 66,
        './core.animation': 39,
        './core.animations': 40,
        './core.defaults': 43,
        './core.interaction': 46,
        './core.layouts': 48,
        './core.plugins': 49,
        './core.tooltip': 53
      }
    ],
    42: [
      function(require, module, exports) {
        'use strict';

        var helpers = require('../helpers/index');

        module.exports = function(Chart) {
          var arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];

          /**
           * Hooks the array methods that add or remove values ('push', pop', 'shift', 'splice',
           * 'unshift') and notify the listener AFTER the array has been altered. Listeners are
           * called on the 'onData*' callbacks (e.g. onDataPush, etc.) with same arguments.
           */
          function listenArrayEvents(array, listener) {
            if (array._chartjs) {
              array._chartjs.listeners.push(listener);
              return;
            }
            Object.defineProperty(array, '_chartjs', {
              configurable: true,
              enumerable: false,
              value: {
                listeners: [listener]
              }
            });
            arrayEvents.forEach(function(key) {
              var method =
                'onData' + key.charAt(0).toUpperCase() + key.slice(1);
              var base = array[key];

              Object.defineProperty(array, key, {
                configurable: true,
                enumerable: false,
                value: function() {
                  var args = Array.prototype.slice.call(arguments);
                  var res = base.apply(this, args);

                  helpers.each(array._chartjs.listeners, function(object) {
                    if (typeof object[method] === 'function') {
                      object[method].apply(object, args);
                    }
                  });
                  return res;
                }
              });
            });
          /**
           * Removes the given array event listener and cleanup extra attached properties (such as
           * the _chartjs stub and overridden methods) if array doesn't have any more listeners.
           */
          function unlistenArrayEvents(array, listener) {
            var stub = array._chartjs;
            if (!stub) {
              return;
            }
            var listeners = stub.listeners;
            var index = listeners.indexOf(listener);
            if (index !== -1) {
              listeners.splice(index, 1);
            }
            if (listeners.length > 0) {
              return;
            }
            arrayEvents.forEach(function(key) {
              delete array[key];
            });
            delete array._chartjs;
          }
          // Base class for all dataset controllers (line, bar, etc)
          Chart.DatasetController = function(chart, datasetIndex) {
            this.initialize(chart, datasetIndex);
          };

          helpers.extend(Chart.DatasetController.prototype, {
            /**
             * Element type used to generate a meta dataset (e.g. Chart.element.Line).
             * @type {Chart.core.element}
             */
            datasetElementType: null,

            /**
             * Element type used to generate a meta data (e.g. Chart.element.Point).
             * @type {Chart.core.element}
             */
            dataElementType: null,

            initialize: function(chart, datasetIndex) {
              var me = this;
              me.chart = chart;
              me.index = datasetIndex;
              me.linkScales();
              me.addElements();
            },

            updateIndex: function(datasetIndex) {
              this.index = datasetIndex;
            },

            linkScales: function() {
              var me = this;
              var meta = me.getMeta();
              var dataset = me.getDataset();

              if (meta.xAxisID === null || !(meta.xAxisID in me.chart.scales)) {
                meta.xAxisID =
                  dataset.xAxisID || me.chart.options.scales.xAxes[0].id;
              }
              if (meta.yAxisID === null || !(meta.yAxisID in me.chart.scales)) {
                meta.yAxisID =
                  dataset.yAxisID || me.chart.options.scales.yAxes[0].id;
              }
            },

            getDataset: function() {
              return this.chart.data.datasets[this.index];
            },

            getMeta: function() {
              return this.chart.getDatasetMeta(this.index);
            },

            getScaleForId: function(scaleID) {
              return this.chart.scales[scaleID];
            },

            reset: function() {
              this.update(true);
            },

            /**
             * @private
             */
            destroy: function() {
              if (this._data) {
                unlistenArrayEvents(this._data, this);
              }
            },

            createMetaDataset: function() {
              var me = this;
              var type = me.datasetElementType;
              return (
                type &&
                new type({
                  _chart: me.chart,
                  _datasetIndex: me.index
                })
              );
            },

            createMetaData: function(index) {
              var me = this;
              var type = me.dataElementType;
              return (
                type &&
                new type({
                  _chart: me.chart,
                  _datasetIndex: me.index,
                  _index: index
                })
              );
            },

            addElements: function() {
              var me = this;
              var meta = me.getMeta();
              var data = me.getDataset().data || [];
              var metaData = meta.data;
              var i, ilen;

              for (i = 0, ilen = data.length; i < ilen; ++i) {
                metaData[i] = metaData[i] || me.createMetaData(i);
              }
              meta.dataset = meta.dataset || me.createMetaDataset();
            },

            addElementAndReset: function(index) {
              var element = this.createMetaData(index);
              this.getMeta().data.splice(index, 0, element);
              this.updateElement(element, index, true);
            },

            buildOrUpdateElements: function() {
              var me = this;
              var dataset = me.getDataset();
              var data = dataset.data || (dataset.data = []);

              // In order to correctly handle data addition/deletion animation (an thus simulate
              // real-time charts), we need to monitor these data modifications and synchronize
              // the internal meta data accordingly.
              if (me._data !== data) {
                if (me._data) {
                  // This case happens when the user replaced the data array instance.
                  unlistenArrayEvents(me._data, me);
                }
                listenArrayEvents(data, me);
                me._data = data;
              }
              // Re-sync meta data in case the user replaced the data array or if we missed
              // any updates and so make sure that we handle number of datapoints changing.
              me.resyncElements();
            },
            update: helpers.noop,
            transition: function(easingValue) {
              var meta = this.getMeta();
              var elements = meta.data || [];
              var ilen = elements.length;
              var i = 0;
              for (; i < ilen; ++i) {
                elements[i].transition(easingValue);
              }
              if (meta.dataset) {
                meta.dataset.transition(easingValue);
              }
            },
            draw: function() {
              var meta = this.getMeta();
              var elements = meta.data || [];
              var ilen = elements.length;
              var i = 0;
              if (meta.dataset) {
                meta.dataset.draw();
              }
              for (; i < ilen; ++i) {
                elements[i].draw();
              }
            },

            removeHoverStyle: function(element) {
              helpers.merge(element._model, element.$previousStyle || {});
              delete element.$previousStyle;
            },

            setHoverStyle: function(element) {
              var dataset = this.chart.data.datasets[element._datasetIndex];
              var index = element._index;
              var custom = element.custom || {};
              var valueOrDefault = helpers.valueAtIndexOrDefault;
              var getHoverColor = helpers.getHoverColor;
              var model = element._model;

              element.$previousStyle = {
                backgroundColor: model.backgroundColor,
                borderColor: model.borderColor,
                borderWidth: model.borderWidth
              };

              model.backgroundColor = custom.hoverBackgroundColor
                ? custom.hoverBackgroundColor
                : valueOrDefault(
                    dataset.hoverBackgroundColor,
                    index,
                    getHoverColor(model.backgroundColor)
                  );
              model.borderColor = custom.hoverBorderColor
                ? custom.hoverBorderColor
                : valueOrDefault(
                    dataset.hoverBorderColor,
                    index,
                    getHoverColor(model.borderColor)
                  );
              model.borderWidth = custom.hoverBorderWidth
                ? custom.hoverBorderWidth
                : valueOrDefault(
                    dataset.hoverBorderWidth,
                    index,
                    model.borderWidth
                  );
            },

            /**
             * @private
             */
            resyncElements: function() {
              var me = this;
              var meta = me.getMeta();
              var data = me.getDataset().data;
              var numMeta = meta.data.length;
              var numData = data.length;

              if (numData < numMeta) {
                meta.data.splice(numData, numMeta - numData);
              } else if (numData > numMeta) {
                me.insertElements(numMeta, numData - numMeta);
              }
            },

            /**
             * @private
             */
            insertElements: function(start, count) {
              for (var i = 0; i < count; ++i) {
                this.addElementAndReset(start + i);
              }
            },

            /**
             * @private
             */
            onDataPush: function() {
              this.insertElements(
                this.getDataset().data.length - 1,
                arguments.length
              );
            },

            /**
             * @private
             */
            onDataPop: function() {
              this.getMeta().data.pop();
            },

            /**
             * @private
             */
            onDataShift: function() {
              this.getMeta().data.shift();
            },

            /**
             * @private
             */
            onDataSplice: function(start, count) {
              this.getMeta().data.splice(start, count);
              this.insertElements(start, arguments.length - 2);
            },

            /**
             * @private
             */
            onDataUnshift: function() {
              this.insertElements(0, arguments.length);
            }
          });
          Chart.DatasetController.extend = helpers.inherits;
        };
      },
      { '../helpers/index': 63 }
    ],
    43: [
      function(require, module, exports) {
        'use strict';

        var helpers = require('../helpers/index');

        module.exports = {
          /**
           * @private
           */
          _set: function(scope, values) {
            return helpers.merge(this[scope] || (this[scope] = {}), values);
          }
        };
      },
      { '../helpers/index': 63 }
    ],
    44: [
      function(require, module, exports) {
        'use strict';
        var color = require('chartjs-color');
        var helpers = require('../helpers/index');
        function interpolate(start, view, model, ease) {
          var keys = Object.keys(model);
          var i, ilen, key, actual, origin, target, type, c0, c1;
          for (i = 0, ilen = keys.length; i < ilen; ++i) {
            key = keys[i];
            target = model[key];
            // if a value is added to the model after pivot() has been called, the view
            // doesn't contain it, so let's initialize the view to the target value.
            if (!view.hasOwnProperty(key)) {
              view[key] = target;
            }
            actual = view[key];
            if (actual === target || key[0] === '_') {
              continue;
            }
            if (!start.hasOwnProperty(key)) {
              start[key] = actual;
            }
            origin = start[key];
            type = typeof target;
            if (type === typeof origin) {
              if (type === 'string') {
                c0 = color(origin);
                if (c0.valid) {
                  c1 = color(target);
                  if (c1.valid) {
                    view[key] = c1.mix(c0, ease).rgbString();
                    continue;
                  }
                }
              } else if (
                type === 'number' &&
                isFinite(origin) &&
                isFinite(target)
              ) {
                view[key] = origin + (target - origin) * ease;
                continue;
              }
            }
            view[key] = target;
          }
        var Element = function(configuration) {
          helpers.extend(this, configuration);
          this.initialize.apply(this, arguments);
        };
        helpers.extend(Element.prototype, {
          initialize: function() {
            this.hidden = false;
          },
          pivot: function() {
            var me = this;
            if (!me._view) {
              me._view = helpers.clone(me._model);
            }
            me._start = {};
            return me;
          },

          transition: function(ease) {
            var me = this;
            var model = me._model;
            var start = me._start;
            var view = me._view;

            // No animation -> No Transition
            if (!model || ease === 1) {
              me._view = model;
              me._start = null;
              return me;
            }
            if (!view) {
              view = me._view = {};
            }
            if (!start) {
              start = me._start = {};
            }
            interpolate(start, view, model, ease);
            return me;
          },
          tooltipPosition: function() {
            return {
              x: this._model.x,
              y: this._model.y
            };
          },
          hasValue: function() {
            return (
              helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y)
            );
          }
        });
        Element.extend = helpers.inherits;
        module.exports = Element;
      },
      { '../helpers/index': 63, 'chartjs-color': 78 }
    ],
    45: [
      function(require, module, exports) {
        /* global window: false */
        /* global document: false */
        'use strict';

        var color = require('chartjs-color');
        var defaults = require('./core.defaults');
        var helpers = require('../helpers/index');
        var scaleService = require('../core/core.scaleService');

        module.exports = function() {
          // -- Basic js utility methods

          helpers.configMerge = function(/* objects ... */) {
            return helpers.merge(
              helpers.clone(arguments[0]),
              [].slice.call(arguments, 1),
              {
                merger: function(key, target, source, options) {
                  var tval = target[key] || {};
                  var sval = source[key];

                  if (key === 'scales') {
                    // scale config merging is complex. Add our own function here for that
                    target[key] = helpers.scaleMerge(tval, sval);
                  } else if (key === 'scale') {
                    // used in polar area & radar charts since there is only one scale
                    target[key] = helpers.merge(tval, [
                      scaleService.getScaleDefaults(sval.type),
                      sval
                    ]);
                  } else {
                    helpers._merger(key, target, source, options);
                  }
                }
              }
            );
          };

          helpers.scaleMerge = function(/* objects ... */) {
            return helpers.merge(
              helpers.clone(arguments[0]),
              [].slice.call(arguments, 1),
              {
                merger: function(key, target, source, options) {
                  if (key === 'xAxes' || key === 'yAxes') {
                    var slen = source[key].length;
                    var i, type, scale;

                    if (!target[key]) {
                      target[key] = [];
                    }
                    for (i = 0; i < slen; ++i) {
                      scale = source[key][i];
                      type = helpers.valueOrDefault(
                        scale.type,
                        key === 'xAxes' ? 'category' : 'linear'
                      );

                      if (i >= target[key].length) {
                        target[key].push({});
                      }

                      if (
                        !target[key][i].type ||
                        (scale.type && scale.type !== target[key][i].type)
                      ) {
                        // new/untyped scale or type changed: let's apply the new defaults
                        // then merge source scale to correctly overwrite the defaults.
                        helpers.merge(target[key][i], [
                          scaleService.getScaleDefaults(type),
                          scale
                        ]);
                      } else {
                        // scales type are the same
                        helpers.merge(target[key][i], scale);
                      }
                    }
                  } else {
                    helpers._merger(key, target, source, options);
                  }
                }
              }
            );
          };
          helpers.where = function(collection, filterCallback) {
            if (helpers.isArray(collection) && Array.prototype.filter) {
              return collection.filter(filterCallback);
            }
            var filtered = [];
            helpers.each(collection, function(item) {
              if (filterCallback(item)) {
                filtered.push(item);
              }
            });
            return filtered;
          };
          helpers.findIndex = Array.prototype.findIndex
            ? function(array, callback, scope) {
                return array.findIndex(callback, scope);
              }
            : function(array, callback, scope) {
                scope = scope === undefined ? array : scope;
                for (var i = 0, ilen = array.length; i < ilen; ++i) {
                  if (callback.call(scope, array[i], i, array)) {
                    return i;
                  }
                }
                return -1;
              };
          helpers.findNextWhere = function(
            arrayToSearch,
            filterCallback,
            startIndex
          ) {
            // Default to start of the array
            if (helpers.isNullOrUndef(startIndex)) {
              startIndex = -1;
            }
            for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
              var currentItem = arrayToSearch[i];
              if (filterCallback(currentItem)) {
                return currentItem;
              }
            }
          };
          helpers.findPreviousWhere = function(
            arrayToSearch,
            filterCallback,
            startIndex
          ) {
            // Default to end of the array
            if (helpers.isNullOrUndef(startIndex)) {
              startIndex = arrayToSearch.length;
            }
            for (var i = startIndex - 1; i >= 0; i--) {
              var currentItem = arrayToSearch[i];
              if (filterCallback(currentItem)) {
                return currentItem;
              }
            }
          };

          // -- Math methods
          helpers.isNumber = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
          };
          helpers.almostEquals = function(x, y, epsilon) {
            return Math.abs(x - y) < epsilon;
          };
          helpers.almostWhole = function(x, epsilon) {
            var rounded = Math.round(x);
            return rounded - epsilon < x && rounded + epsilon > x;
          };
          helpers.max = function(array) {
            return array.reduce(function(max, value) {
              if (!isNaN(value)) {
                return Math.max(max, value);
              }
              return max;
            }, Number.NEGATIVE_INFINITY);
          };
          helpers.min = function(array) {
            return array.reduce(function(min, value) {
              if (!isNaN(value)) {
                return Math.min(min, value);
              }
              return min;
            }, Number.POSITIVE_INFINITY);
          };
          helpers.sign = Math.sign
            ? function(x) {
                return Math.sign(x);
              }
            : function(x) {
                x = +x; // convert to a number
                if (x === 0 || isNaN(x)) {
                  return x;
                }
                return x > 0 ? 1 : -1;
              };
          helpers.log10 = Math.log10
            ? function(x) {
                return Math.log10(x);
              }
            : function(x) {
                var exponent = Math.log(x) * Math.LOG10E; // Math.LOG10E = 1 / Math.LN10.
                // Check for whole powers of 10,
                // which due to floating point rounding error should be corrected.
                var powerOf10 = Math.round(exponent);
                var isPowerOf10 = x === Math.pow(10, powerOf10);

                return isPowerOf10 ? powerOf10 : exponent;
              };
          helpers.toRadians = function(degrees) {
            return degrees * (Math.PI / 180);
          };
          helpers.toDegrees = function(radians) {
            return radians * (180 / Math.PI);
          };
          // Gets the angle from vertical upright to the point about a centre.
          helpers.getAngleFromPoint = function(centrePoint, anglePoint) {
            var distanceFromXCenter = anglePoint.x - centrePoint.x;
            var distanceFromYCenter = anglePoint.y - centrePoint.y;
            var radialDistanceFromCenter = Math.sqrt(
              distanceFromXCenter * distanceFromXCenter +
                distanceFromYCenter * distanceFromYCenter
            );

            var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

            if (angle < -0.5 * Math.PI) {
              angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
            }
            return {
              angle: angle,
              distance: radialDistanceFromCenter
            };
          };
          helpers.distanceBetweenPoints = function(pt1, pt2) {
            return Math.sqrt(
              Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2)
            );
          };
          helpers.aliasPixel = function(pixelWidth) {
            return pixelWidth % 2 === 0 ? 0 : 0.5;
          };
          helpers.splineCurve = function(
            firstPoint,
            middlePoint,
            afterPoint,
            t
          ) {
            // Props to Rob Spencer at scaled innovation for his post on splining between points
            // http://scaledinnovation.com/analytics/splines/aboutSplines.html

            // This function must also respect "skipped" points

            var previous = firstPoint.skip ? middlePoint : firstPoint;
            var current = middlePoint;
            var next = afterPoint.skip ? middlePoint : afterPoint;

            var d01 = Math.sqrt(
              Math.pow(current.x - previous.x, 2) +
                Math.pow(current.y - previous.y, 2)
            );
            var d12 = Math.sqrt(
              Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2)
            );

            var s01 = d01 / (d01 + d12);
            var s12 = d12 / (d01 + d12);

            // If all points are the same, s01 & s02 will be inf
            s01 = isNaN(s01) ? 0 : s01;
            s12 = isNaN(s12) ? 0 : s12;

            var fa = t * s01; // scaling factor for triangle Ta
            var fb = t * s12;
            return {
              previous: {
                x: current.x - fa * (next.x - previous.x),
                y: current.y - fa * (next.y - previous.y)
              },
              next: {
                x: current.x + fb * (next.x - previous.x),
                y: current.y + fb * (next.y - previous.y)
              }
            };
          };
          helpers.EPSILON = Number.EPSILON || 1e-14;
          helpers.splineCurveMonotone = function(points) {
            // This function calculates Bézier control points in a similar way than |splineCurve|,
            // but preserves monotonicity of the provided data and ensures no local extremums are added
            // between the dataset discrete points due to the interpolation.
            // See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation

            var pointsWithTangents = (points || []).map(function(point) {
              return {
                model: point._model,
                deltaK: 0,
                mK: 0
              };
            });
            // Calculate slopes (deltaK) and initialize tangents (mK)
            var pointsLen = pointsWithTangents.length;
            var i, pointBefore, pointCurrent, pointAfter;
            for (i = 0; i < pointsLen; ++i) {
              pointCurrent = pointsWithTangents[i];
              if (pointCurrent.model.skip) {
                continue;
              }
              pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
              pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
              if (pointAfter && !pointAfter.model.skip) {
                var slopeDeltaX = pointAfter.model.x - pointCurrent.model.x;
                // In the case of two points that appear at the same x pixel, slopeDeltaX is 0
                pointCurrent.deltaK =
                  slopeDeltaX !== 0
                    ? (pointAfter.model.y - pointCurrent.model.y) / slopeDeltaX
                    : 0;
              }
              if (!pointBefore || pointBefore.model.skip) {
                pointCurrent.mK = pointCurrent.deltaK;
              } else if (!pointAfter || pointAfter.model.skip) {
                pointCurrent.mK = pointBefore.deltaK;
              } else if (
                this.sign(pointBefore.deltaK) !== this.sign(pointCurrent.deltaK)
              ) {
                pointCurrent.mK = 0;
              } else {
                pointCurrent.mK =
                  (pointBefore.deltaK + pointCurrent.deltaK) / 2;
              }
            }
            // Adjust tangents to ensure monotonic properties
            var alphaK, betaK, tauK, squaredMagnitude;
            for (i = 0; i < pointsLen - 1; ++i) {
              pointCurrent = pointsWithTangents[i];
              pointAfter = pointsWithTangents[i + 1];
              if (pointCurrent.model.skip || pointAfter.model.skip) {
                continue;
              }
              if (helpers.almostEquals(pointCurrent.deltaK, 0, this.EPSILON)) {
                pointCurrent.mK = pointAfter.mK = 0;
                continue;
              }
              alphaK = pointCurrent.mK / pointCurrent.deltaK;
              betaK = pointAfter.mK / pointCurrent.deltaK;
              squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
              if (squaredMagnitude <= 9) {
                continue;
              }
              tauK = 3 / Math.sqrt(squaredMagnitude);
              pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
              pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
            }
            // Compute control points
            var deltaX;
            for (i = 0; i < pointsLen; ++i) {
              pointCurrent = pointsWithTangents[i];
              if (pointCurrent.model.skip) {
                continue;
              }
              pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
              pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
              if (pointBefore && !pointBefore.model.skip) {
                deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
                pointCurrent.model.controlPointPreviousX =
                  pointCurrent.model.x - deltaX;
                pointCurrent.model.controlPointPreviousY =
                  pointCurrent.model.y - deltaX * pointCurrent.mK;
              }
              if (pointAfter && !pointAfter.model.skip) {
                deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
                pointCurrent.model.controlPointNextX =
                  pointCurrent.model.x + deltaX;
                pointCurrent.model.controlPointNextY =
                  pointCurrent.model.y + deltaX * pointCurrent.mK;
              }
            }
          };
          helpers.nextItem = function(collection, index, loop) {
            if (loop) {
              return index >= collection.length - 1
                ? collection[0]
                : collection[index + 1];
            }
            return index >= collection.length - 1
              ? collection[collection.length - 1]
              : collection[index + 1];
          };
          helpers.previousItem = function(collection, index, loop) {
            if (loop) {
              return index <= 0
                ? collection[collection.length - 1]
                : collection[index - 1];
            }
            return index <= 0 ? collection[0] : collection[index - 1];
          };
          // Implementation of the nice number algorithm used in determining where axis labels will go
          helpers.niceNum = function(range, round) {
            var exponent = Math.floor(helpers.log10(range));
            var fraction = range / Math.pow(10, exponent);
            var niceFraction;

            if (round) {
              if (fraction < 1.5) {
                niceFraction = 1;
              } else if (fraction < 3) {
                niceFraction = 2;
              } else if (fraction < 7) {
                niceFraction = 5;
              } else {
                niceFraction = 10;
              }
            } else if (fraction <= 1.0) {
              niceFraction = 1;
            } else if (fraction <= 2) {
              niceFraction = 2;
            } else if (fraction <= 5) {
              niceFraction = 5;
            } else {
              niceFraction = 10;
            }
            return niceFraction * Math.pow(10, exponent);
          };
          // Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
          helpers.requestAnimFrame = (function() {
            if (typeof window === 'undefined') {
              return function(callback) {
                callback();
              };
            }
            return (
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              function(callback) {
                return window.setTimeout(callback, 1000 / 60);
              }
            );
          })();
          // -- DOM methods
          helpers.getRelativePosition = function(evt, chart) {
            var mouseX, mouseY;
            var e = evt.originalEvent || evt;
            var canvas = evt.target || evt.srcElement;
            var boundingRect = canvas.getBoundingClientRect();

            var touches = e.touches;
            if (touches && touches.length > 0) {
              mouseX = touches[0].clientX;
              mouseY = touches[0].clientY;
            } else {
              mouseX = e.clientX;
              mouseY = e.clientY;
            }
            // Scale mouse coordinates into canvas coordinates
            // by following the pattern laid out by 'jerryj' in the comments of
            // http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
            var paddingLeft = parseFloat(
              helpers.getStyle(canvas, 'padding-left')
            );
            var paddingTop = parseFloat(
              helpers.getStyle(canvas, 'padding-top')
            );
            var paddingRight = parseFloat(
              helpers.getStyle(canvas, 'padding-right')
            );
            var paddingBottom = parseFloat(
              helpers.getStyle(canvas, 'padding-bottom')
            );
            var width =
              boundingRect.right -
              boundingRect.left -
              paddingLeft -
              paddingRight;
            var height =
              boundingRect.bottom -
              boundingRect.top -
              paddingTop -
              paddingBottom;

            // We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
            // the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
            mouseX = Math.round(
              (((mouseX - boundingRect.left - paddingLeft) / width) *
                canvas.width) /
                chart.currentDevicePixelRatio
            );
            mouseY = Math.round(
              (((mouseY - boundingRect.top - paddingTop) / height) *
                canvas.height) /
                chart.currentDevicePixelRatio
            );
            return {
              x: mouseX,
              y: mouseY
            };
          };

          // Private helper function to convert max-width/max-height values that may be percentages into a number
          function parseMaxStyle(styleValue, node, parentProperty) {
            var valueInPixels;
            if (typeof styleValue === 'string') {
              valueInPixels = parseInt(styleValue, 10);

              if (styleValue.indexOf('%') !== -1) {
                // percentage * size in dimension
                valueInPixels =
                  (valueInPixels / 100) * node.parentNode[parentProperty];
              }
            } else {
              valueInPixels = styleValue;
            }
            return valueInPixels;
          }
          /**
           * Returns if the given value contains an effective constraint.
           * @private
           */
          function isConstrainedValue(value) {
            return value !== undefined && value !== null && value !== 'none';
          }
          // Private helper to get a constraint dimension
          // @param domNode : the node to check the constraint on
          // @param maxStyle : the style that defines the maximum for the direction we are using (maxWidth / maxHeight)
          // @param percentageProperty : property of parent to use when calculating width as a percentage
          // @see http://www.nathanaeljones.com/blog/2013/reading-max-width-cross-browser
          function getConstraintDimension(
            domNode,
            maxStyle,
            percentageProperty
          ) {
            var view = document.defaultView;
            var parentNode = helpers._getParentNode(domNode);
            var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
            var constrainedContainer = view.getComputedStyle(parentNode)[
              maxStyle
            ];
            var hasCNode = isConstrainedValue(constrainedNode);
            var hasCContainer = isConstrainedValue(constrainedContainer);
            var infinity = Number.POSITIVE_INFINITY;

            if (hasCNode || hasCContainer) {
              return Math.min(
                hasCNode
                  ? parseMaxStyle(constrainedNode, domNode, percentageProperty)
                  : infinity,
                hasCContainer
                  ? parseMaxStyle(
                      constrainedContainer,
                      parentNode,
                      percentageProperty
                    )
                  : infinity
              );
            }
            return 'none';
          }
          // returns Number or undefined if no constraint
          helpers.getConstraintWidth = function(domNode) {
            return getConstraintDimension(domNode, 'max-width', 'clientWidth');
          };
          // returns Number or undefined if no constraint
          helpers.getConstraintHeight = function(domNode) {
            return getConstraintDimension(
              domNode,
              'max-height',
              'clientHeight'
            );
          };
          /**
           * @private
           */
          helpers._calculatePadding = function(
            container,
            padding,
            parentDimension
          ) {
            padding = helpers.getStyle(container, padding);

            return padding.indexOf('%') > -1
              ? parentDimension / parseInt(padding, 10)
              : parseInt(padding, 10);
          };
          /**
           * @private
           */
          helpers._getParentNode = function(domNode) {
            var parent = domNode.parentNode;
            if (parent && parent.host) {
              parent = parent.host;
            }
            return parent;
          };
          helpers.getMaximumWidth = function(domNode) {
            var container = helpers._getParentNode(domNode);
            if (!container) {
              return domNode.clientWidth;
            }
            var clientWidth = container.clientWidth;
            var paddingLeft = helpers._calculatePadding(
              container,
              'padding-left',
              clientWidth
            );
            var paddingRight = helpers._calculatePadding(
              container,
              'padding-right',
              clientWidth
            );

            var w = clientWidth - paddingLeft - paddingRight;
            var cw = helpers.getConstraintWidth(domNode);
            return isNaN(cw) ? w : Math.min(w, cw);
          };
          helpers.getMaximumHeight = function(domNode) {
            var container = helpers._getParentNode(domNode);
            if (!container) {
              return domNode.clientHeight;
            }
            var clientHeight = container.clientHeight;
            var paddingTop = helpers._calculatePadding(
              container,
              'padding-top',
              clientHeight
            );
            var paddingBottom = helpers._calculatePadding(
              container,
              'padding-bottom',
              clientHeight
            );

            var h = clientHeight - paddingTop - paddingBottom;
            var ch = helpers.getConstraintHeight(domNode);
            return isNaN(ch) ? h : Math.min(h, ch);
          };
          helpers.getStyle = function(el, property) {
            return el.currentStyle
              ? el.currentStyle[property]
              : document.defaultView
                  .getComputedStyle(el, null)
                  .getPropertyValue(property);
          };
          helpers.retinaScale = function(chart, forceRatio) {
            var pixelRatio = (chart.currentDevicePixelRatio =
              forceRatio ||
              (typeof window !== 'undefined' && window.devicePixelRatio) ||
              1);
            if (pixelRatio === 1) {
              return;
            }
            var canvas = chart.canvas;
            var height = chart.height;
            var width = chart.width;
            canvas.height = height * pixelRatio;
            canvas.width = width * pixelRatio;
            chart.ctx.scale(pixelRatio, pixelRatio);
            // If no style has been set on the canvas, the render size is used as display size,
            // making the chart visually bigger, so let's enforce it to the "correct" values.
            // See https://github.com/chartjs/Chart.js/issues/3575
            if (!canvas.style.height && !canvas.style.width) {
              canvas.style.height = height + 'px';
              canvas.style.width = width + 'px';
            }
          };
          // -- Canvas methods
          helpers.fontString = function(pixelSize, fontStyle, fontFamily) {
            return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
          };
          helpers.longestText = function(ctx, font, arrayOfThings, cache) {
            cache = cache || {};
            var data = (cache.data = cache.data || {});
            var gc = (cache.garbageCollect = cache.garbageCollect || []);

            if (cache.font !== font) {
              data = cache.data = {};
              gc = cache.garbageCollect = [];
              cache.font = font;
            }
            ctx.font = font;
            var longest = 0;
            helpers.each(arrayOfThings, function(thing) {
              // Undefined strings and arrays should not be measured
              if (
                thing !== undefined &&
                thing !== null &&
                helpers.isArray(thing) !== true
              ) {
                longest = helpers.measureText(ctx, data, gc, longest, thing);
              } else if (helpers.isArray(thing)) {
                // if it is an array lets measure each element
                // to do maybe simplify this function a bit so we can do this more recursively?
                helpers.each(thing, function(nestedThing) {
                  // Undefined strings and arrays should not be measured
                  if (
                    nestedThing !== undefined &&
                    nestedThing !== null &&
                    !helpers.isArray(nestedThing)
                  ) {
                    longest = helpers.measureText(
                      ctx,
                      data,
                      gc,
                      longest,
                      nestedThing
                    );
                  }
                });
              }
            });
            var gcLen = gc.length / 2;
            if (gcLen > arrayOfThings.length) {
              for (var i = 0; i < gcLen; i++) {
                delete data[gc[i]];
              }
              gc.splice(0, gcLen);
            }
            return longest;
          };
          helpers.measureText = function(ctx, data, gc, longest, string) {
            var textWidth = data[string];
            if (!textWidth) {
              textWidth = data[string] = ctx.measureText(string).width;
              gc.push(string);
            }
            if (textWidth > longest) {
              longest = textWidth;
            }
            return longest;
          };
          helpers.numberOfLabelLines = function(arrayOfThings) {
            var numberOfLines = 1;
            helpers.each(arrayOfThings, function(thing) {
              if (helpers.isArray(thing)) {
                if (thing.length > numberOfLines) {
                  numberOfLines = thing.length;
                }
              }
            });
            return numberOfLines;
          };
          helpers.color = !color
            ? function(value) {
                console.error('Color.js not found!');
                return value;
              }
            : function(value) {
                /* global CanvasGradient */
                if (value instanceof CanvasGradient) {
                  value = defaults.global.defaultColor;
                }
                return color(value);
              };

          helpers.getHoverColor = function(colorValue) {
            /* global CanvasPattern */
            return colorValue instanceof CanvasPattern
              ? colorValue
              : helpers
                  .color(colorValue)
                  .saturate(0.5)
                  .darken(0.1)
                  .rgbString();
          };
        };
      },
      {
        '../core/core.scaleService': 51,
        '../helpers/index': 63,
        './core.defaults': 43,
        'chartjs-color': 78
    ],
    46: [
      function(require, module, exports) {
        'use strict';

        var helpers = require('../helpers/index');

        /**
         * Helper function to get relative position for an event
         * @param {Event|IEvent} event - The event to get the position for
         * @param {Chart} chart - The chart
         * @returns {Point} the event position
         */
        function getRelativePosition(e, chart) {
          if (e.native) {
            return {
              x: e.x,
              y: e.y
            };
          }
          return helpers.getRelativePosition(e, chart);
        }
        /**
         * Helper function to traverse all of the visible elements in the chart
         * @param chart {chart} the chart
         * @param handler {Function} the callback to execute for each visible item
         */
        function parseVisibleItems(chart, handler) {
          var datasets = chart.data.datasets;
          var meta, i, j, ilen, jlen;
          for (i = 0, ilen = datasets.length; i < ilen; ++i) {
            if (!chart.isDatasetVisible(i)) {
              continue;
            }
            meta = chart.getDatasetMeta(i);
            for (j = 0, jlen = meta.data.length; j < jlen; ++j) {
              var element = meta.data[j];
              if (!element._view.skip) {
                handler(element);
              }
            }
          }
        }
        /**
         * Helper function to get the items that intersect the event position
         * @param items {ChartElement[]} elements to filter
         * @param position {Point} the point to be nearest to
         * @return {ChartElement[]} the nearest items
         */
        function getIntersectItems(chart, position) {
          var elements = [];
          parseVisibleItems(chart, function(element) {
            if (element.inRange(position.x, position.y)) {
              elements.push(element);
            }
          });

          return elements;
        }

        /**
         * Helper function to get the items nearest to the event position considering all visible items in teh chart
         * @param chart {Chart} the chart to look at elements from
         * @param position {Point} the point to be nearest to
         * @param intersect {Boolean} if true, only consider items that intersect the position
         * @param distanceMetric {Function} function to provide the distance between points
         * @return {ChartElement[]} the nearest items
         */
        function getNearestItems(chart, position, intersect, distanceMetric) {
          var minDistance = Number.POSITIVE_INFINITY;
          var nearestItems = [];
          parseVisibleItems(chart, function(element) {
            if (intersect && !element.inRange(position.x, position.y)) {
              return;
            }
            var center = element.getCenterPoint();
            var distance = distanceMetric(position, center);
            if (distance < minDistance) {
              nearestItems = [element];
              minDistance = distance;
            } else if (distance === minDistance) {
              // Can have multiple items at the same distance in which case we sort by size
              nearestItems.push(element);
            }
          });
          return nearestItems;
        }
        /**
         * Get a distance metric function for two points based on the
         * axis mode setting
         * @param {String} axis the axis mode. x|y|xy
         */
        function getDistanceMetricForAxis(axis) {
          var useX = axis.indexOf('x') !== -1;
          var useY = axis.indexOf('y') !== -1;

          return function(pt1, pt2) {
            var deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
            var deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
            return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
          };
        }

        function indexMode(chart, e, options) {
          var position = getRelativePosition(e, chart);
          // Default axis for index mode is 'x' to match old behaviour
          options.axis = options.axis || 'x';
          var distanceMetric = getDistanceMetricForAxis(options.axis);
          var items = options.intersect
            ? getIntersectItems(chart, position)
            : getNearestItems(chart, position, false, distanceMetric);
          var elements = [];

          if (!items.length) {
            return [];
          }
          chart.data.datasets.forEach(function(dataset, datasetIndex) {
            if (chart.isDatasetVisible(datasetIndex)) {
              var meta = chart.getDatasetMeta(datasetIndex);
              var element = meta.data[items[0]._index];
              // don't count items that are skipped (null data)
              if (element && !element._view.skip) {
                elements.push(element);
              }
            }
          });
          return elements;
        /**
         * @interface IInteractionOptions
         */
        /**
         * If true, only consider items that intersect the point
         * @name IInterfaceOptions#boolean
         * @type Boolean
         */
        /**
         * Contains interaction related functions
         * @namespace Chart.Interaction
         */
        module.exports = {
          // Helper function for different modes
          modes: {
            single: function(chart, e) {
              var position = getRelativePosition(e, chart);
              var elements = [];

              parseVisibleItems(chart, function(element) {
                if (element.inRange(position.x, position.y)) {
                  elements.push(element);
                  return elements;
                }
              });

              return elements.slice(0, 1);
            },

            /**
             * @function Chart.Interaction.modes.label
             * @deprecated since version 2.4.0
             * @todo remove at version 3
             * @private
             */
            label: indexMode,

            /**
             * Returns items at the same index. If the options.intersect parameter is true, we only return items if we intersect something
             * If the options.intersect mode is false, we find the nearest item and return the items at the same index as that item
             * @function Chart.Interaction.modes.index
             * @since v2.4.0
             * @param chart {chart} the chart we are returning items from
             * @param e {Event} the event we are find things at
             * @param options {IInteractionOptions} options to use during interaction
             * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
             */
            index: indexMode,

            /**
             * Returns items in the same dataset. If the options.intersect parameter is true, we only return items if we intersect something
             * If the options.intersect is false, we find the nearest item and return the items in that dataset
             * @function Chart.Interaction.modes.dataset
             * @param chart {chart} the chart we are returning items from
             * @param e {Event} the event we are find things at
             * @param options {IInteractionOptions} options to use during interaction
             * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
             */
            dataset: function(chart, e, options) {
              var position = getRelativePosition(e, chart);
              options.axis = options.axis || 'xy';
              var distanceMetric = getDistanceMetricForAxis(options.axis);
              var items = options.intersect
                ? getIntersectItems(chart, position)
                : getNearestItems(chart, position, false, distanceMetric);

              if (items.length > 0) {
                items = chart.getDatasetMeta(items[0]._datasetIndex).data;
              }
              return items;
            },

            /**
             * @function Chart.Interaction.modes.x-axis
             * @deprecated since version 2.4.0. Use index mode and intersect == true
             * @todo remove at version 3
             * @private
             */
            'x-axis': function(chart, e) {
              return indexMode(chart, e, { intersect: false });
            },

            /**
             * Point mode returns all elements that hit test based on the event position
             * of the event
             * @function Chart.Interaction.modes.intersect
             * @param chart {chart} the chart we are returning items from
             * @param e {Event} the event we are find things at
             * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
             */
            point: function(chart, e) {
              var position = getRelativePosition(e, chart);
              return getIntersectItems(chart, position);
            },

            /**
             * nearest mode returns the element closest to the point
             * @function Chart.Interaction.modes.intersect
             * @param chart {chart} the chart we are returning items from
             * @param e {Event} the event we are find things at
             * @param options {IInteractionOptions} options to use
             * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
             */
            nearest: function(chart, e, options) {
              var position = getRelativePosition(e, chart);
              options.axis = options.axis || 'xy';
              var distanceMetric = getDistanceMetricForAxis(options.axis);
              var nearestItems = getNearestItems(
                chart,
                position,
                options.intersect,
                distanceMetric
              );

              // We have multiple items at the same distance from the event. Now sort by smallest
              if (nearestItems.length > 1) {
                nearestItems.sort(function(a, b) {
                  var sizeA = a.getArea();
                  var sizeB = b.getArea();
                  var ret = sizeA - sizeB;

                  if (ret === 0) {
                    // if equal sort by dataset index
                    ret = a._datasetIndex - b._datasetIndex;
                  }

                  return ret;
                });
              }
              // Return only 1 item
              return nearestItems.slice(0, 1);
            },

            /**
             * x mode returns the elements that hit-test at the current x coordinate
             * @function Chart.Interaction.modes.x
             * @param chart {chart} the chart we are returning items from
             * @param e {Event} the event we are find things at
             * @param options {IInteractionOptions} options to use
             * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
             */
            x: function(chart, e, options) {
              var position = getRelativePosition(e, chart);
              var items = [];
              var intersectsItem = false;

              parseVisibleItems(chart, function(element) {
                if (element.inXRange(position.x)) {
                  items.push(element);
                }
                if (element.inRange(position.x, position.y)) {
                  intersectsItem = true;
                }
              });
              // If we want to trigger on an intersect and we don't have any items
              // that intersect the position, return nothing
              if (options.intersect && !intersectsItem) {
                items = [];
              }
              return items;
            },

            /**
             * y mode returns the elements that hit-test at the current y coordinate
             * @function Chart.Interaction.modes.y
             * @param chart {chart} the chart we are returning items from
             * @param e {Event} the event we are find things at
             * @param options {IInteractionOptions} options to use
             * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
             */
            y: function(chart, e, options) {
              var position = getRelativePosition(e, chart);
              var items = [];
              var intersectsItem = false;

              parseVisibleItems(chart, function(element) {
                if (element.inYRange(position.y)) {
                  items.push(element);
                }
                if (element.inRange(position.x, position.y)) {
                  intersectsItem = true;
                }
              });
              // If we want to trigger on an intersect and we don't have any items
              // that intersect the position, return nothing
              if (options.intersect && !intersectsItem) {
                items = [];
              }
              return items;
            }
          }
        };
      },
      { '../helpers/index': 63 }
    ],
    47: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('./core.defaults');

        defaults._set('global', {
          responsive: true,
          responsiveAnimationDuration: 0,
          maintainAspectRatio: true,
          events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
          hover: {
            onHover: null,
            mode: 'nearest',
            intersect: true,
            animationDuration: 400
          },
          onClick: null,
          defaultColor: 'rgba(0,0,0,0.1)',
          defaultFontColor: '#666',
          defaultFontFamily:
            "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          defaultFontSize: 12,
          defaultFontStyle: 'normal',
          showLines: true,

          // Element defaults defined in element extensions
          elements: {},

          // Layout options such as padding
          layout: {
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
        module.exports = function() {
          // Occupy the global variable of Chart, and create a simple base class
          var Chart = function(item, config) {
            this.construct(item, config);
            return this;
          };

          Chart.Chart = Chart;

          return Chart;
        };
      },
      { './core.defaults': 43 }
    ],
    48: [
      function(require, module, exports) {
        'use strict';
        var helpers = require('../helpers/index');
        function filterByPosition(array, position) {
          return helpers.where(array, function(v) {
            return v.position === position;
          });
        function sortByWeight(array, reverse) {
          array.forEach(function(v, i) {
            v._tmpIndex_ = i;
            return v;
          });
          array.sort(function(a, b) {
            var v0 = reverse ? b : a;
            var v1 = reverse ? a : b;
            return v0.weight === v1.weight
              ? v0._tmpIndex_ - v1._tmpIndex_
              : v0.weight - v1.weight;
          });
          array.forEach(function(v) {
            delete v._tmpIndex_;
          });
        /**
         * @interface ILayoutItem
         * @prop {String} position - The position of the item in the chart layout. Possible values are
         * 'left', 'top', 'right', 'bottom', and 'chartArea'
         * @prop {Number} weight - The weight used to sort the item. Higher weights are further away from the chart area
         * @prop {Boolean} fullWidth - if true, and the item is horizontal, then push vertical boxes down
         * @prop {Function} isHorizontal - returns true if the layout item is horizontal (ie. top or bottom)
         * @prop {Function} update - Takes two parameters: width and height. Returns size of item
         * @prop {Function} getPadding -  Returns an object with padding on the edges
         * @prop {Number} width - Width of item. Must be valid after update()
         * @prop {Number} height - Height of item. Must be valid after update()
         * @prop {Number} left - Left edge of the item. Set by layout system and cannot be used in update
         * @prop {Number} top - Top edge of the item. Set by layout system and cannot be used in update
         * @prop {Number} right - Right edge of the item. Set by layout system and cannot be used in update
         * @prop {Number} bottom - Bottom edge of the item. Set by layout system and cannot be used in update
         */
        // The layout service is very self explanatory.  It's responsible for the layout within a chart.
        // Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
        // It is this service's responsibility of carrying out that layout.
        module.exports = {
          defaults: {},

          /**
           * Register a box to a chart.
           * A box is simply a reference to an object that requires layout. eg. Scales, Legend, Title.
           * @param {Chart} chart - the chart to use
           * @param {ILayoutItem} item - the item to add to be layed out
           */
          addBox: function(chart, item) {
            if (!chart.boxes) {
              chart.boxes = [];
            }
            // initialize item with default values
            item.fullWidth = item.fullWidth || false;
            item.position = item.position || 'top';
            item.weight = item.weight || 0;

            chart.boxes.push(item);
          },

          /**
           * Remove a layoutItem from a chart
           * @param {Chart} chart - the chart to remove the box from
           * @param {Object} layoutItem - the item to remove from the layout
           */
          removeBox: function(chart, layoutItem) {
            var index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
            if (index !== -1) {
              chart.boxes.splice(index, 1);
            }
          },

          /**
           * Sets (or updates) options on the given `item`.
           * @param {Chart} chart - the chart in which the item lives (or will be added to)
           * @param {Object} item - the item to configure with the given options
           * @param {Object} options - the new item options.
           */
          configure: function(chart, item, options) {
            var props = ['fullWidth', 'position', 'weight'];
            var ilen = props.length;
            var i = 0;
            var prop;

            for (; i < ilen; ++i) {
              prop = props[i];
              if (options.hasOwnProperty(prop)) {
                item[prop] = options[prop];
              }
            }
          },

          /**
           * Fits boxes of the given chart into the given size by having each box measure itself
           * then running a fitting algorithm
           * @param {Chart} chart - the chart
           * @param {Number} width - the width to fit into
           * @param {Number} height - the height to fit into
           */
          update: function(chart, width, height) {
            if (!chart) {
              return;
            }
            var layoutOptions = chart.options.layout || {};
            var padding = helpers.options.toPadding(layoutOptions.padding);
            var leftPadding = padding.left;
            var rightPadding = padding.right;
            var topPadding = padding.top;
            var bottomPadding = padding.bottom;

            var leftBoxes = filterByPosition(chart.boxes, 'left');
            var rightBoxes = filterByPosition(chart.boxes, 'right');
            var topBoxes = filterByPosition(chart.boxes, 'top');
            var bottomBoxes = filterByPosition(chart.boxes, 'bottom');
            var chartAreaBoxes = filterByPosition(chart.boxes, 'chartArea');

            // Sort boxes by weight. A higher weight is further away from the chart area
            sortByWeight(leftBoxes, true);
            sortByWeight(rightBoxes, false);
            sortByWeight(topBoxes, true);
            sortByWeight(bottomBoxes, false);

            // Essentially we now have any number of boxes on each of the 4 sides.
            // Our canvas looks like the following.
            // The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
            // B1 is the bottom axis
            // There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
            // These locations are single-box locations only, when trying to register a chartArea location that is already taken,
            // an error will be thrown.
            //
            // |----------------------------------------------------|
            // |                  T1 (Full Width)                   |
            // |----------------------------------------------------|
            // |    |    |                 T2                  |    |
            // |    |----|-------------------------------------|----|
            // |    |    | C1 |                           | C2 |    |
            // |    |    |----|                           |----|    |
            // |    |    |                                     |    |
            // | L1 | L2 |           ChartArea (C0)            | R1 |
            // |    |    |                                     |    |
            // |    |    |----|                           |----|    |
            // |    |    | C3 |                           | C4 |    |
            // |    |----|-------------------------------------|----|
            // |    |    |                 B1                  |    |
            // |----------------------------------------------------|
            // |                  B2 (Full Width)                   |
            // |----------------------------------------------------|
            //
            // What we do to find the best sizing, we do the following
            // 1. Determine the minimum size of the chart area.
            // 2. Split the remaining width equally between each vertical axis
            // 3. Split the remaining height equally between each horizontal axis
            // 4. Give each layout the maximum size it can be. The layout will return it's minimum size
            // 5. Adjust the sizes of each axis based on it's minimum reported size.
            // 6. Refit each axis
            // 7. Position each axis in the final location
            // 8. Tell the chart the final location of the chart area
            // 9. Tell any axes that overlay the chart area the positions of the chart area

            // Step 1
            var chartWidth = width - leftPadding - rightPadding;
            var chartHeight = height - topPadding - bottomPadding;
            var chartAreaWidth = chartWidth / 2; // min 50%
            var chartAreaHeight = chartHeight / 2; // min 50%

            // Step 2
            var verticalBoxWidth =
              (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);

            // Step 3
            var horizontalBoxHeight =
              (height - chartAreaHeight) /
              (topBoxes.length + bottomBoxes.length);

            // Step 4
            var maxChartAreaWidth = chartWidth;
            var maxChartAreaHeight = chartHeight;
            var minBoxSizes = [];

            function getMinimumBoxSize(box) {
              var minSize;
              var isHorizontal = box.isHorizontal();

              if (isHorizontal) {
                minSize = box.update(
                  box.fullWidth ? chartWidth : maxChartAreaWidth,
                  horizontalBoxHeight
                );
                maxChartAreaHeight -= minSize.height;
              } else {
                minSize = box.update(verticalBoxWidth, maxChartAreaHeight);
                maxChartAreaWidth -= minSize.width;
              }
              minBoxSizes.push({
                horizontal: isHorizontal,
                minSize: minSize,
                box: box
              });
            }
            helpers.each(
              leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes),
              getMinimumBoxSize
            );

            // If a horizontal box has padding, we move the left boxes over to avoid ugly charts (see issue #2478)
            var maxHorizontalLeftPadding = 0;
            var maxHorizontalRightPadding = 0;
            var maxVerticalTopPadding = 0;
            var maxVerticalBottomPadding = 0;

            helpers.each(topBoxes.concat(bottomBoxes), function(horizontalBox) {
              if (horizontalBox.getPadding) {
                var boxPadding = horizontalBox.getPadding();
                maxHorizontalLeftPadding = Math.max(
                  maxHorizontalLeftPadding,
                  boxPadding.left
                );
                maxHorizontalRightPadding = Math.max(
                  maxHorizontalRightPadding,
                  boxPadding.right
                );
              }
            });
            helpers.each(leftBoxes.concat(rightBoxes), function(verticalBox) {
              if (verticalBox.getPadding) {
                var boxPadding = verticalBox.getPadding();
                maxVerticalTopPadding = Math.max(
                  maxVerticalTopPadding,
                  boxPadding.top
                );
                maxVerticalBottomPadding = Math.max(
                  maxVerticalBottomPadding,
                  boxPadding.bottom
                );
              }
            });
            // At this point, maxChartAreaHeight and maxChartAreaWidth are the size the chart area could
            // be if the axes are drawn at their minimum sizes.
            // Steps 5 & 6
            var totalLeftBoxesWidth = leftPadding;
            var totalRightBoxesWidth = rightPadding;
            var totalTopBoxesHeight = topPadding;
            var totalBottomBoxesHeight = bottomPadding;

            // Function to fit a box
            function fitBox(box) {
              var minBoxSize = helpers.findNextWhere(minBoxSizes, function(
                minBox
              ) {
                return minBox.box === box;
              });

              if (minBoxSize) {
                if (box.isHorizontal()) {
                  var scaleMargin = {
                    left: Math.max(
                      totalLeftBoxesWidth,
                      maxHorizontalLeftPadding
                    ),
                    right: Math.max(
                      totalRightBoxesWidth,
                      maxHorizontalRightPadding
                    ),
                    top: 0,
                    bottom: 0
                  };

                  // Don't use min size here because of label rotation. When the labels are rotated, their rotation highly depends
                  // on the margin. Sometimes they need to increase in size slightly
                  box.update(
                    box.fullWidth ? chartWidth : maxChartAreaWidth,
                    chartHeight / 2,
                    scaleMargin
                  );
                } else {
                  box.update(minBoxSize.minSize.width, maxChartAreaHeight);
                }
              }
            }
            // Update, and calculate the left and right margins for the horizontal boxes
            helpers.each(leftBoxes.concat(rightBoxes), fitBox);
            helpers.each(leftBoxes, function(box) {
              totalLeftBoxesWidth += box.width;
            });
            helpers.each(rightBoxes, function(box) {
              totalRightBoxesWidth += box.width;
            });
            // Set the Left and Right margins for the horizontal boxes
            helpers.each(topBoxes.concat(bottomBoxes), fitBox);
            // Figure out how much margin is on the top and bottom of the vertical boxes
            helpers.each(topBoxes, function(box) {
              totalTopBoxesHeight += box.height;
            });
            helpers.each(bottomBoxes, function(box) {
              totalBottomBoxesHeight += box.height;
            });
            function finalFitVerticalBox(box) {
              var minBoxSize = helpers.findNextWhere(minBoxSizes, function(
                minSize
              ) {
                return minSize.box === box;
              });

              var scaleMargin = {
                left: 0,
                right: 0,
                top: totalTopBoxesHeight,
                bottom: totalBottomBoxesHeight
              };

              if (minBoxSize) {
                box.update(
                  minBoxSize.minSize.width,
                  maxChartAreaHeight,
                  scaleMargin
                );
              }
            }
            // Let the left layout know the final margin
            helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);
            // Recalculate because the size of each layout might have changed slightly due to the margins (label rotation for instance)
            totalLeftBoxesWidth = leftPadding;
            totalRightBoxesWidth = rightPadding;
            totalTopBoxesHeight = topPadding;
            totalBottomBoxesHeight = bottomPadding;
            helpers.each(leftBoxes, function(box) {
              totalLeftBoxesWidth += box.width;
            });
            helpers.each(rightBoxes, function(box) {
              totalRightBoxesWidth += box.width;
            });
            helpers.each(topBoxes, function(box) {
              totalTopBoxesHeight += box.height;
            });
            helpers.each(bottomBoxes, function(box) {
              totalBottomBoxesHeight += box.height;
            });
            // We may be adding some padding to account for rotated x axis labels
            var leftPaddingAddition = Math.max(
              maxHorizontalLeftPadding - totalLeftBoxesWidth,
              0
            );
            totalLeftBoxesWidth += leftPaddingAddition;
            totalRightBoxesWidth += Math.max(
              maxHorizontalRightPadding - totalRightBoxesWidth,
              0
            );

            var topPaddingAddition = Math.max(
              maxVerticalTopPadding - totalTopBoxesHeight,
              0
            );
            totalTopBoxesHeight += topPaddingAddition;
            totalBottomBoxesHeight += Math.max(
              maxVerticalBottomPadding - totalBottomBoxesHeight,
              0
            );

            // Figure out if our chart area changed. This would occur if the dataset layout label rotation
            // changed due to the application of the margins in step 6. Since we can only get bigger, this is safe to do
            // without calling `fit` again
            var newMaxChartAreaHeight =
              height - totalTopBoxesHeight - totalBottomBoxesHeight;
            var newMaxChartAreaWidth =
              width - totalLeftBoxesWidth - totalRightBoxesWidth;

            if (
              newMaxChartAreaWidth !== maxChartAreaWidth ||
              newMaxChartAreaHeight !== maxChartAreaHeight
            ) {
              helpers.each(leftBoxes, function(box) {
                box.height = newMaxChartAreaHeight;
              });

              helpers.each(rightBoxes, function(box) {
                box.height = newMaxChartAreaHeight;
              });

              helpers.each(topBoxes, function(box) {
                if (!box.fullWidth) {
                  box.width = newMaxChartAreaWidth;
                }
              });
              helpers.each(bottomBoxes, function(box) {
                if (!box.fullWidth) {
                  box.width = newMaxChartAreaWidth;
                }
              });
              maxChartAreaHeight = newMaxChartAreaHeight;
              maxChartAreaWidth = newMaxChartAreaWidth;
            // Step 7 - Position the boxes
            var left = leftPadding + leftPaddingAddition;
            var top = topPadding + topPaddingAddition;

            function placeBox(box) {
              if (box.isHorizontal()) {
                box.left = box.fullWidth ? leftPadding : totalLeftBoxesWidth;
                box.right = box.fullWidth
                  ? width - rightPadding
                  : totalLeftBoxesWidth + maxChartAreaWidth;
                box.top = top;
                box.bottom = top + box.height;

                // Move to next point
                top = box.bottom;
              } else {
                box.left = left;
                box.right = left + box.width;
                box.top = totalTopBoxesHeight;
                box.bottom = totalTopBoxesHeight + maxChartAreaHeight;

                // Move to next point
                left = box.right;
              }
            }
            helpers.each(leftBoxes.concat(topBoxes), placeBox);
            // Account for chart width and height
            left += maxChartAreaWidth;
            top += maxChartAreaHeight;
            helpers.each(rightBoxes, placeBox);
            helpers.each(bottomBoxes, placeBox);
            // Step 8
            chart.chartArea = {
              left: totalLeftBoxesWidth,
              top: totalTopBoxesHeight,
              right: totalLeftBoxesWidth + maxChartAreaWidth,
              bottom: totalTopBoxesHeight + maxChartAreaHeight
            };
            // Step 9
            helpers.each(chartAreaBoxes, function(box) {
              box.left = chart.chartArea.left;
              box.top = chart.chartArea.top;
              box.right = chart.chartArea.right;
              box.bottom = chart.chartArea.bottom;
              box.update(maxChartAreaWidth, maxChartAreaHeight);
            });
          }
        };
      },
      { '../helpers/index': 63 }
    ],
    49: [
      function(require, module, exports) {
        'use strict';
        var defaults = require('./core.defaults');
        var helpers = require('../helpers/index');
        defaults._set('global', {
          plugins: {}
        });
        /**
         * The plugin service singleton
         * @namespace Chart.plugins
         * @since 2.1.0
         */
        module.exports = {
          /**
           * Globally registered plugins.
           * @private
           */
          _plugins: [],

          /**
           * This identifier is used to invalidate the descriptors cache attached to each chart
           * when a global plugin is registered or unregistered. In this case, the cache ID is
           * incremented and descriptors are regenerated during following API calls.
           * @private
           */
          _cacheId: 0,

          /**
           * Registers the given plugin(s) if not already registered.
           * @param {Array|Object} plugins plugin instance(s).
           */
          register: function(plugins) {
            var p = this._plugins;
            [].concat(plugins).forEach(function(plugin) {
              if (p.indexOf(plugin) === -1) {
                p.push(plugin);
              }
            });
            this._cacheId++;
          },

          /**
           * Unregisters the given plugin(s) only if registered.
           * @param {Array|Object} plugins plugin instance(s).
           */
          unregister: function(plugins) {
            var p = this._plugins;
            [].concat(plugins).forEach(function(plugin) {
              var idx = p.indexOf(plugin);
              if (idx !== -1) {
                p.splice(idx, 1);
              }
            });
            this._cacheId++;
          },

          /**
           * Remove all registered plugins.
           * @since 2.1.5
           */
          clear: function() {
            this._plugins = [];
            this._cacheId++;
          },

          /**
           * Returns the number of registered plugins?
           * @returns {Number}
           * @since 2.1.5
           */
          count: function() {
            return this._plugins.length;
          },

          /**
           * Returns all registered plugin instances.
           * @returns {Array} array of plugin objects.
           * @since 2.1.5
           */
          getAll: function() {
            return this._plugins;
          },

          /**
           * Calls enabled plugins for `chart` on the specified hook and with the given args.
           * This method immediately returns as soon as a plugin explicitly returns false. The
           * returned value can be used, for instance, to interrupt the current action.
           * @param {Object} chart - The chart instance for which plugins should be called.
           * @param {String} hook - The name of the plugin method to call (e.g. 'beforeUpdate').
           * @param {Array} [args] - Extra arguments to apply to the hook call.
           * @returns {Boolean} false if any of the plugins return false, else returns true.
           */
          notify: function(chart, hook, args) {
            var descriptors = this.descriptors(chart);
            var ilen = descriptors.length;
            var i, descriptor, plugin, params, method;

            for (i = 0; i < ilen; ++i) {
              descriptor = descriptors[i];
              plugin = descriptor.plugin;
              method = plugin[hook];
              if (typeof method === 'function') {
                params = [chart].concat(args || []);
                params.push(descriptor.options);
                if (method.apply(plugin, params) === false) {
                  return false;
                }
              }
            }
            return true;
          },

          /**
           * Returns descriptors of enabled plugins for the given chart.
           * @returns {Array} [{ plugin, options }]
           * @private
           */
          descriptors: function(chart) {
            var cache = chart.$plugins || (chart.$plugins = {});
            if (cache.id === this._cacheId) {
              return cache.descriptors;
            }
            var plugins = [];
            var descriptors = [];
            var config = (chart && chart.config) || {};
            var options = (config.options && config.options.plugins) || {};

            this._plugins
              .concat(config.plugins || [])
              .forEach(function(plugin) {
                var idx = plugins.indexOf(plugin);
                if (idx !== -1) {
                  return;
                }
                var id = plugin.id;
                var opts = options[id];
                if (opts === false) {
                  return;
                }
                if (opts === true) {
                  opts = helpers.clone(defaults.global.plugins[id]);
                }
                plugins.push(plugin);
                descriptors.push({
                  plugin: plugin,
                  options: opts || {}
                });
              });

            cache.descriptors = descriptors;
            cache.id = this._cacheId;
            return descriptors;
          },

          /**
           * Invalidates cache for the given chart: descriptors hold a reference on plugin option,
           * but in some cases, this reference can be changed by the user when updating options.
           * https://github.com/chartjs/Chart.js/issues/5111#issuecomment-355934167
           * @private
           */
          _invalidate: function(chart) {
            delete chart.$plugins;
          }
        };
        /**
         * Plugin extension hooks.
         * @interface IPlugin
         * @since 2.1.0
         */
        /**
         * @method IPlugin#beforeInit
         * @desc Called before initializing `chart`.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#afterInit
         * @desc Called after `chart` has been initialized and before the first update.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#beforeUpdate
         * @desc Called before updating `chart`. If any plugin returns `false`, the update
         * is cancelled (and thus subsequent render(s)) until another `update` is triggered.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         * @returns {Boolean} `false` to cancel the chart update.
         */
        /**
         * @method IPlugin#afterUpdate
         * @desc Called after `chart` has been updated and before rendering. Note that this
         * hook will not be called if the chart update has been previously cancelled.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#beforeDatasetsUpdate
         * @desc Called before updating the `chart` datasets. If any plugin returns `false`,
         * the datasets update is cancelled until another `update` is triggered.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         * @returns {Boolean} false to cancel the datasets update.
         * @since version 2.1.5
         */
        /**
         * @method IPlugin#afterDatasetsUpdate
         * @desc Called after the `chart` datasets have been updated. Note that this hook
         * will not be called if the datasets update has been previously cancelled.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         * @since version 2.1.5
         */
        /**
         * @method IPlugin#beforeDatasetUpdate
         * @desc Called before updating the `chart` dataset at the given `args.index`. If any plugin
         * returns `false`, the datasets update is cancelled until another `update` is triggered.
         * @param {Chart} chart - The chart instance.
         * @param {Object} args - The call arguments.
         * @param {Number} args.index - The dataset index.
         * @param {Object} args.meta - The dataset metadata.
         * @param {Object} options - The plugin options.
         * @returns {Boolean} `false` to cancel the chart datasets drawing.
         */
        /**
         * @method IPlugin#afterDatasetUpdate
         * @desc Called after the `chart` datasets at the given `args.index` has been updated. Note
         * that this hook will not be called if the datasets update has been previously cancelled.
         * @param {Chart} chart - The chart instance.
         * @param {Object} args - The call arguments.
         * @param {Number} args.index - The dataset index.
         * @param {Object} args.meta - The dataset metadata.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#beforeLayout
         * @desc Called before laying out `chart`. If any plugin returns `false`,
         * the layout update is cancelled until another `update` is triggered.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         * @returns {Boolean} `false` to cancel the chart layout.
         */
        /**
         * @method IPlugin#afterLayout
         * @desc Called after the `chart` has been layed out. Note that this hook will not
         * be called if the layout update has been previously cancelled.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#beforeRender
         * @desc Called before rendering `chart`. If any plugin returns `false`,
         * the rendering is cancelled until another `render` is triggered.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         * @returns {Boolean} `false` to cancel the chart rendering.
         */
        /**
         * @method IPlugin#afterRender
         * @desc Called after the `chart` has been fully rendered (and animation completed). Note
         * that this hook will not be called if the rendering has been previously cancelled.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#beforeDraw
         * @desc Called before drawing `chart` at every animation frame specified by the given
         * easing value. If any plugin returns `false`, the frame drawing is cancelled until
         * another `render` is triggered.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
         * @param {Object} options - The plugin options.
         * @returns {Boolean} `false` to cancel the chart drawing.
         */
        /**
         * @method IPlugin#afterDraw
         * @desc Called after the `chart` has been drawn for the specific easing value. Note
         * that this hook will not be called if the drawing has been previously cancelled.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#beforeDatasetsDraw
         * @desc Called before drawing the `chart` datasets. If any plugin returns `false`,
         * the datasets drawing is cancelled until another `render` is triggered.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
         * @param {Object} options - The plugin options.
         * @returns {Boolean} `false` to cancel the chart datasets drawing.
         */
        /**
         * @method IPlugin#afterDatasetsDraw
         * @desc Called after the `chart` datasets have been drawn. Note that this hook
         * will not be called if the datasets drawing has been previously cancelled.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#beforeDatasetDraw
         * @desc Called before drawing the `chart` dataset at the given `args.index` (datasets
         * are drawn in the reverse order). If any plugin returns `false`, the datasets drawing
         * is cancelled until another `render` is triggered.
         * @param {Chart} chart - The chart instance.
         * @param {Object} args - The call arguments.
         * @param {Number} args.index - The dataset index.
         * @param {Object} args.meta - The dataset metadata.
         * @param {Number} args.easingValue - The current animation value, between 0.0 and 1.0.
         * @param {Object} options - The plugin options.
         * @returns {Boolean} `false` to cancel the chart datasets drawing.
         */
        /**
         * @method IPlugin#afterDatasetDraw
         * @desc Called after the `chart` datasets at the given `args.index` have been drawn
         * (datasets are drawn in the reverse order). Note that this hook will not be called
         * if the datasets drawing has been previously cancelled.
         * @param {Chart} chart - The chart instance.
         * @param {Object} args - The call arguments.
         * @param {Number} args.index - The dataset index.
         * @param {Object} args.meta - The dataset metadata.
         * @param {Number} args.easingValue - The current animation value, between 0.0 and 1.0.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#beforeTooltipDraw
         * @desc Called before drawing the `tooltip`. If any plugin returns `false`,
         * the tooltip drawing is cancelled until another `render` is triggered.
         * @param {Chart} chart - The chart instance.
         * @param {Object} args - The call arguments.
         * @param {Object} args.tooltip - The tooltip.
         * @param {Number} args.easingValue - The current animation value, between 0.0 and 1.0.
         * @param {Object} options - The plugin options.
         * @returns {Boolean} `false` to cancel the chart tooltip drawing.
         */
        /**
         * @method IPlugin#afterTooltipDraw
         * @desc Called after drawing the `tooltip`. Note that this hook will not
         * be called if the tooltip drawing has been previously cancelled.
         * @param {Chart} chart - The chart instance.
         * @param {Object} args - The call arguments.
         * @param {Object} args.tooltip - The tooltip.
         * @param {Number} args.easingValue - The current animation value, between 0.0 and 1.0.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#beforeEvent
         * @desc Called before processing the specified `event`. If any plugin returns `false`,
         * the event will be discarded.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {IEvent} event - The event object.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#afterEvent
         * @desc Called after the `event` has been consumed. Note that this hook
         * will not be called if the `event` has been previously discarded.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {IEvent} event - The event object.
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#resize
         * @desc Called after the chart as been resized.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Number} size - The new canvas display size (eq. canvas.style width & height).
         * @param {Object} options - The plugin options.
         */
        /**
         * @method IPlugin#destroy
         * @desc Called after the chart as been destroyed.
         * @param {Chart.Controller} chart - The chart instance.
         * @param {Object} options - The plugin options.
         */
      },
      { '../helpers/index': 63, './core.defaults': 43 }
    ],
    50: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('./core.defaults');
        var Element = require('./core.element');
        var helpers = require('../helpers/index');
        var Ticks = require('./core.ticks');

        defaults._set('scale', {
          display: true,
          position: 'left',
          offset: false,

          // grid line settings
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
            lineWidth: 1,
            drawBorder: true,
            drawOnChartArea: true,
            drawTicks: true,
            tickMarkLength: 10,
            zeroLineWidth: 1,
            zeroLineColor: 'rgba(0,0,0,0.25)',
            zeroLineBorderDash: [],
            zeroLineBorderDashOffset: 0.0,
            offsetGridLines: false,
            borderDash: [],
            borderDashOffset: 0.0
          },

          // scale label
          scaleLabel: {
            // display property
            display: false,

            // actual label
            labelString: '',

            // line height
            lineHeight: 1.2,

            // top/bottom padding
            padding: {
              top: 4,
              bottom: 4
            }
          },

          // label settings
          ticks: {
            beginAtZero: false,
            minRotation: 0,
            maxRotation: 50,
            mirror: false,
            padding: 0,
            reverse: false,
            display: true,
            autoSkip: true,
            autoSkipPadding: 0,
            labelOffset: 0,
            // We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
            callback: Ticks.formatters.values,
            minor: {},
            major: {}
          }
        });
        function labelsFromTicks(ticks) {
          var labels = [];
          var i, ilen;
          for (i = 0, ilen = ticks.length; i < ilen; ++i) {
            labels.push(ticks[i].label);
          }
          return labels;
        }
        function getLineValue(scale, index, offsetGridLines) {
          var lineValue = scale.getPixelForTick(index);
          if (offsetGridLines) {
            if (index === 0) {
              lineValue -= (scale.getPixelForTick(1) - lineValue) / 2;
            } else {
              lineValue -= (lineValue - scale.getPixelForTick(index - 1)) / 2;
            }
          }
          return lineValue;
        }

        function computeTextSize(context, tick, font) {
          return helpers.isArray(tick)
            ? helpers.longestText(context, font, tick)
            : context.measureText(tick).width;
        }

        function parseFontOptions(options) {
          var valueOrDefault = helpers.valueOrDefault;
          var globalDefaults = defaults.global;
          var size = valueOrDefault(
            options.fontSize,
            globalDefaults.defaultFontSize
          );
          var style = valueOrDefault(
            options.fontStyle,
            globalDefaults.defaultFontStyle
          );
          var family = valueOrDefault(
            options.fontFamily,
            globalDefaults.defaultFontFamily
          );

          return {
            size: size,
            style: style,
            family: family,
            font: helpers.fontString(size, style, family)
          };
        }

        function parseLineHeight(options) {
          return helpers.options.toLineHeight(
            helpers.valueOrDefault(options.lineHeight, 1.2),
            helpers.valueOrDefault(
              options.fontSize,
              defaults.global.defaultFontSize
            )
          );
        }

        module.exports = Element.extend({
          /**
           * Get the padding needed for the scale
           * @method getPadding
           * @private
           * @returns {Padding} the necessary padding
           */
          getPadding: function() {
            var me = this;
            return {
              left: me.paddingLeft || 0,
              top: me.paddingTop || 0,
              right: me.paddingRight || 0,
              bottom: me.paddingBottom || 0
            };
          },

          /**
           * Returns the scale tick objects ({label, major})
           * @since 2.7
           */
          getTicks: function() {
            return this._ticks;
          },

          // These methods are ordered by lifecyle. Utilities then follow.
          // Any function defined here is inherited by all scale types.
          // Any function can be extended by the scale type

          mergeTicksOptions: function() {
            var ticks = this.options.ticks;
            if (ticks.minor === false) {
              ticks.minor = {
                display: false
              };
            }
            if (ticks.major === false) {
              ticks.major = {
                display: false
              };
            }
            for (var key in ticks) {
              if (key !== 'major' && key !== 'minor') {
                if (typeof ticks.minor[key] === 'undefined') {
                  ticks.minor[key] = ticks[key];
                }
                if (typeof ticks.major[key] === 'undefined') {
                  ticks.major[key] = ticks[key];
                }
              }
            }
          },
          beforeUpdate: function() {
            helpers.callback(this.options.beforeUpdate, [this]);
          },

          update: function(maxWidth, maxHeight, margins) {
            var me = this;
            var i, ilen, labels, label, ticks, tick;

            // Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
            me.beforeUpdate();

            // Absorb the master measurements
            me.maxWidth = maxWidth;
            me.maxHeight = maxHeight;
            me.margins = helpers.extend(
              {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              },
              margins
            );
            me.longestTextCache = me.longestTextCache || {};

            // Dimensions
            me.beforeSetDimensions();
            me.setDimensions();
            me.afterSetDimensions();

            // Data min/max
            me.beforeDataLimits();
            me.determineDataLimits();
            me.afterDataLimits();

            // Ticks - `this.ticks` is now DEPRECATED!
            // Internal ticks are now stored as objects in the PRIVATE `this._ticks` member
            // and must not be accessed directly from outside this class. `this.ticks` being
            // around for long time and not marked as private, we can't change its structure
            // without unexpected breaking changes. If you need to access the scale ticks,
            // use scale.getTicks() instead.

            me.beforeBuildTicks();

            // New implementations should return an array of objects but for BACKWARD COMPAT,
            // we still support no return (`this.ticks` internally set by calling this method).
            ticks = me.buildTicks() || [];

            me.afterBuildTicks();

            me.beforeTickToLabelConversion();

            // New implementations should return the formatted tick labels but for BACKWARD
            // COMPAT, we still support no return (`this.ticks` internally changed by calling
            // this method and supposed to contain only string values).
            labels = me.convertTicksToLabels(ticks) || me.ticks;

            me.afterTickToLabelConversion();

            me.ticks = labels; // BACKWARD COMPATIBILITY

            // IMPORTANT: from this point, we consider that `this.ticks` will NEVER change!

            // BACKWARD COMPAT: synchronize `_ticks` with labels (so potentially `this.ticks`)
            for (i = 0, ilen = labels.length; i < ilen; ++i) {
              label = labels[i];
              tick = ticks[i];
              if (!tick) {
                ticks.push(
                  (tick = {
                    label: label,
                    major: false
                  })
                );
              } else {
                tick.label = label;
              }
            }
            me._ticks = ticks;

            // Tick Rotation
            me.beforeCalculateTickRotation();
            me.calculateTickRotation();
            me.afterCalculateTickRotation();
            // Fit
            me.beforeFit();
            me.fit();
            me.afterFit();
            //
            me.afterUpdate();

            return me.minSize;
          },
          afterUpdate: function() {
            helpers.callback(this.options.afterUpdate, [this]);
          },

          //

          beforeSetDimensions: function() {
            helpers.callback(this.options.beforeSetDimensions, [this]);
          },
          setDimensions: function() {
            var me = this;
            // Set the unconstrained dimension before label rotation
            if (me.isHorizontal()) {
              // Reset position before calculating rotation
              me.width = me.maxWidth;
              me.left = 0;
              me.right = me.width;
            } else {
              me.height = me.maxHeight;
              // Reset position before calculating rotation
              me.top = 0;
              me.bottom = me.height;
            }
            // Reset padding
            me.paddingLeft = 0;
            me.paddingTop = 0;
            me.paddingRight = 0;
            me.paddingBottom = 0;
          },
          afterSetDimensions: function() {
            helpers.callback(this.options.afterSetDimensions, [this]);
          },

          // Data limits
          beforeDataLimits: function() {
            helpers.callback(this.options.beforeDataLimits, [this]);
          },
          determineDataLimits: helpers.noop,
          afterDataLimits: function() {
            helpers.callback(this.options.afterDataLimits, [this]);
          },

          //
          beforeBuildTicks: function() {
            helpers.callback(this.options.beforeBuildTicks, [this]);
          },
          buildTicks: helpers.noop,
          afterBuildTicks: function() {
            helpers.callback(this.options.afterBuildTicks, [this]);
          },

          beforeTickToLabelConversion: function() {
            helpers.callback(this.options.beforeTickToLabelConversion, [this]);
          },
          convertTicksToLabels: function() {
            var me = this;
            // Convert ticks to strings
            var tickOpts = me.options.ticks;
            me.ticks = me.ticks.map(
              tickOpts.userCallback || tickOpts.callback,
              this
            );
          },
          afterTickToLabelConversion: function() {
            helpers.callback(this.options.afterTickToLabelConversion, [this]);
          },

          //

          beforeCalculateTickRotation: function() {
            helpers.callback(this.options.beforeCalculateTickRotation, [this]);
          },
          calculateTickRotation: function() {
            var me = this;
            var context = me.ctx;
            var tickOpts = me.options.ticks;
            var labels = labelsFromTicks(me._ticks);

            // Get the width of each grid by calculating the difference
            // between x offsets between 0 and 1.
            var tickFont = parseFontOptions(tickOpts);
            context.font = tickFont.font;

            var labelRotation = tickOpts.minRotation || 0;

            if (labels.length && me.options.display && me.isHorizontal()) {
              var originalLabelWidth = helpers.longestText(
                context,
                tickFont.font,
                labels,
                me.longestTextCache
              );
              var labelWidth = originalLabelWidth;
              var cosRotation, sinRotation;

              // Allow 3 pixels x2 padding either side for label readability
              var tickWidth = me.getPixelForTick(1) - me.getPixelForTick(0) - 6;

              // Max label rotation can be set or default to 90 - also act as a loop counter
              while (
                labelWidth > tickWidth &&
                labelRotation < tickOpts.maxRotation
              ) {
                var angleRadians = helpers.toRadians(labelRotation);
                cosRotation = Math.cos(angleRadians);
                sinRotation = Math.sin(angleRadians);

                if (sinRotation * originalLabelWidth > me.maxHeight) {
                  // go back one step
                  labelRotation--;
                  break;
                }
                labelRotation++;
                labelWidth = cosRotation * originalLabelWidth;
              }
            }
            me.labelRotation = labelRotation;
          },
          afterCalculateTickRotation: function() {
            helpers.callback(this.options.afterCalculateTickRotation, [this]);
          },

          //

          beforeFit: function() {
            helpers.callback(this.options.beforeFit, [this]);
          },
          fit: function() {
            var me = this;
            // Reset
            var minSize = (me.minSize = {
              width: 0,
              height: 0
            });
            var labels = labelsFromTicks(me._ticks);
            var opts = me.options;
            var tickOpts = opts.ticks;
            var scaleLabelOpts = opts.scaleLabel;
            var gridLineOpts = opts.gridLines;
            var display = opts.display;
            var isHorizontal = me.isHorizontal();
            var tickFont = parseFontOptions(tickOpts);
            var tickMarkLength = opts.gridLines.tickMarkLength;
            // Width
            if (isHorizontal) {
              // subtract the margins to line up with the chartArea if we are a full width scale
              minSize.width = me.isFullWidth()
                ? me.maxWidth - me.margins.left - me.margins.right
                : me.maxWidth;
            } else {
              minSize.width =
                display && gridLineOpts.drawTicks ? tickMarkLength : 0;
            }
            // height
            if (isHorizontal) {
              minSize.height =
                display && gridLineOpts.drawTicks ? tickMarkLength : 0;
            } else {
              minSize.height = me.maxHeight; // fill all the height
            }
            // Are we showing a title for the scale?
            if (scaleLabelOpts.display && display) {
              var scaleLabelLineHeight = parseLineHeight(scaleLabelOpts);
              var scaleLabelPadding = helpers.options.toPadding(
                scaleLabelOpts.padding
              );
              var deltaHeight = scaleLabelLineHeight + scaleLabelPadding.height;

              if (isHorizontal) {
                minSize.height += deltaHeight;
              } else {
                minSize.width += deltaHeight;
              }
            }
            // Don't bother fitting the ticks if we are not showing them
            if (tickOpts.display && display) {
              var largestTextWidth = helpers.longestText(
                me.ctx,
                tickFont.font,
                labels,
                me.longestTextCache
              );
              var tallestLabelHeightInLines = helpers.numberOfLabelLines(
                labels
              );
              var lineSpace = tickFont.size * 0.5;
              var tickPadding = me.options.ticks.padding;

              if (isHorizontal) {
                // A horizontal axis is more constrained by the height.
                me.longestLabelWidth = largestTextWidth;

                var angleRadians = helpers.toRadians(me.labelRotation);
                var cosRotation = Math.cos(angleRadians);
                var sinRotation = Math.sin(angleRadians);

                // TODO - improve this calculation
                var labelHeight =
                  sinRotation * largestTextWidth +
                  tickFont.size * tallestLabelHeightInLines +
                  lineSpace * (tallestLabelHeightInLines - 1) +
                  lineSpace; // padding

                minSize.height = Math.min(
                  me.maxHeight,
                  minSize.height + labelHeight + tickPadding
                );

                me.ctx.font = tickFont.font;
                var firstLabelWidth = computeTextSize(
                  me.ctx,
                  labels[0],
                  tickFont.font
                );
                var lastLabelWidth = computeTextSize(
                  me.ctx,
                  labels[labels.length - 1],
                  tickFont.font
                );

                // Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned
                // which means that the right padding is dominated by the font height
                if (me.labelRotation !== 0) {
                  me.paddingLeft =
                    opts.position === 'bottom'
                      ? cosRotation * firstLabelWidth + 3
                      : cosRotation * lineSpace + 3; // add 3 px to move away from canvas edges
                  me.paddingRight =
                    opts.position === 'bottom'
                      ? cosRotation * lineSpace + 3
                      : cosRotation * lastLabelWidth + 3;
                } else {
                  me.paddingLeft = firstLabelWidth / 2 + 3; // add 3 px to move away from canvas edges
                  me.paddingRight = lastLabelWidth / 2 + 3;
                }
              } else {
                // A vertical axis is more constrained by the width. Labels are the
                // dominant factor here, so get that length first and account for padding
                if (tickOpts.mirror) {
                  largestTextWidth = 0;
                } else {
                  // use lineSpace for consistency with horizontal axis
                  // tickPadding is not implemented for horizontal
                  largestTextWidth += tickPadding + lineSpace;
                }
                minSize.width = Math.min(
                  me.maxWidth,
                  minSize.width + largestTextWidth
                );
                me.paddingTop = tickFont.size / 2;
                me.paddingBottom = tickFont.size / 2;
              }
            }
            me.handleMargins();

            me.width = minSize.width;
            me.height = minSize.height;
          },

          /**
           * Handle margins and padding interactions
           * @private
           */
          handleMargins: function() {
            var me = this;
            if (me.margins) {
              me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
              me.paddingTop = Math.max(me.paddingTop - me.margins.top, 0);
              me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
              me.paddingBottom = Math.max(
                me.paddingBottom - me.margins.bottom,
                0
              );
            }
          },

          afterFit: function() {
            helpers.callback(this.options.afterFit, [this]);
          },

          // Shared Methods
          isHorizontal: function() {
            return (
              this.options.position === 'top' ||
              this.options.position === 'bottom'
            );
          },
          isFullWidth: function() {
            return this.options.fullWidth;
          },

          // Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
          getRightValue: function(rawValue) {
            // Null and undefined values first
            if (helpers.isNullOrUndef(rawValue)) {
              return NaN;
            }
            // isNaN(object) returns true, so make sure NaN is checking for a number; Discard Infinite values
            if (typeof rawValue === 'number' && !isFinite(rawValue)) {
              return NaN;
            }
            // If it is in fact an object, dive in one more level
            if (rawValue) {
              if (this.isHorizontal()) {
                if (rawValue.x !== undefined) {
                  return this.getRightValue(rawValue.x);
                }
              } else if (rawValue.y !== undefined) {
                return this.getRightValue(rawValue.y);
              }
            }
            // Value is good, return it
            return rawValue;
          },

          /**
           * Used to get the value to display in the tooltip for the data at the given index
           * @param index
           * @param datasetIndex
           */
          getLabelForIndex: helpers.noop,

          /**
           * Returns the location of the given data point. Value can either be an index or a numerical value
           * The coordinate (0, 0) is at the upper-left corner of the canvas
           * @param value
           * @param index
           * @param datasetIndex
           */
          getPixelForValue: helpers.noop,

          /**
           * Used to get the data value from a given pixel. This is the inverse of getPixelForValue
           * The coordinate (0, 0) is at the upper-left corner of the canvas
           * @param pixel
           */
          getValueForPixel: helpers.noop,

          /**
           * Returns the location of the tick at the given index
           * The coordinate (0, 0) is at the upper-left corner of the canvas
           */
          getPixelForTick: function(index) {
            var me = this;
            var offset = me.options.offset;
            if (me.isHorizontal()) {
              var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
              var tickWidth =
                innerWidth / Math.max(me._ticks.length - (offset ? 0 : 1), 1);
              var pixel = tickWidth * index + me.paddingLeft;

              if (offset) {
                pixel += tickWidth / 2;
              }
              var finalVal = me.left + Math.round(pixel);
              finalVal += me.isFullWidth() ? me.margins.left : 0;
              return finalVal;
            }
            var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
            return me.top + index * (innerHeight / (me._ticks.length - 1));
          },

          /**
           * Utility for getting the pixel location of a percentage of scale
           * The coordinate (0, 0) is at the upper-left corner of the canvas
           */
          getPixelForDecimal: function(decimal) {
            var me = this;
            if (me.isHorizontal()) {
              var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
              var valueOffset = innerWidth * decimal + me.paddingLeft;

              var finalVal = me.left + Math.round(valueOffset);
              finalVal += me.isFullWidth() ? me.margins.left : 0;
              return finalVal;
            }
            return me.top + decimal * me.height;
          },

          /**
           * Returns the pixel for the minimum chart value
           * The coordinate (0, 0) is at the upper-left corner of the canvas
           */
          getBasePixel: function() {
            return this.getPixelForValue(this.getBaseValue());
          },

          getBaseValue: function() {
            var me = this;
            var min = me.min;
            var max = me.max;

            return me.beginAtZero
              ? 0
              : min < 0 && max < 0
              ? max
              : min > 0 && max > 0
              ? min
              : 0;
          },

          /**
           * Returns a subset of ticks to be plotted to avoid overlapping labels.
           * @private
           */
          _autoSkip: function(ticks) {
            var skipRatio;
            var me = this;
            var isHorizontal = me.isHorizontal();
            var optionTicks = me.options.ticks.minor;
            var tickCount = ticks.length;
            var labelRotationRadians = helpers.toRadians(me.labelRotation);
            var cosRotation = Math.cos(labelRotationRadians);
            var longestRotatedLabel = me.longestLabelWidth * cosRotation;
            var result = [];
            var i, tick, shouldSkip;

            // figure out the maximum number of gridlines to show
            var maxTicks;
            if (optionTicks.maxTicksLimit) {
              maxTicks = optionTicks.maxTicksLimit;
            }
            if (isHorizontal) {
              skipRatio = false;

              if (
                (longestRotatedLabel + optionTicks.autoSkipPadding) *
                  tickCount >
                me.width - (me.paddingLeft + me.paddingRight)
              ) {
                skipRatio =
                  1 +
                  Math.floor(
                    ((longestRotatedLabel + optionTicks.autoSkipPadding) *
                      tickCount) /
                      (me.width - (me.paddingLeft + me.paddingRight))
                  );
              }
              // if they defined a max number of optionTicks,
              // increase skipRatio until that number is met
              if (maxTicks && tickCount > maxTicks) {
                skipRatio = Math.max(
                  skipRatio,
                  Math.floor(tickCount / maxTicks)
                );
              }
            }
            for (i = 0; i < tickCount; i++) {
              tick = ticks[i];
              // Since we always show the last tick,we need may need to hide the last shown one before
              shouldSkip =
                (skipRatio > 1 && i % skipRatio > 0) ||
                (i % skipRatio === 0 && i + skipRatio >= tickCount);
              if (shouldSkip && i !== tickCount - 1) {
                // leave tick in place but make sure it's not displayed (#4635)
                delete tick.label;
              }
              result.push(tick);
            }
            return result;
          },

          // Actually draw the scale on the canvas
          // @param {rectangle} chartArea : the area of the chart to draw full grid lines on
          draw: function(chartArea) {
            var me = this;
            var options = me.options;
            if (!options.display) {
              return;
            }
            var context = me.ctx;
            var globalDefaults = defaults.global;
            var optionTicks = options.ticks.minor;
            var optionMajorTicks = options.ticks.major || optionTicks;
            var gridLines = options.gridLines;
            var scaleLabel = options.scaleLabel;

            var isRotated = me.labelRotation !== 0;
            var isHorizontal = me.isHorizontal();

            var ticks = optionTicks.autoSkip
              ? me._autoSkip(me.getTicks())
              : me.getTicks();
            var tickFontColor = helpers.valueOrDefault(
              optionTicks.fontColor,
              globalDefaults.defaultFontColor
            );
            var tickFont = parseFontOptions(optionTicks);
            var majorTickFontColor = helpers.valueOrDefault(
              optionMajorTicks.fontColor,
              globalDefaults.defaultFontColor
            );
            var majorTickFont = parseFontOptions(optionMajorTicks);

            var tl = gridLines.drawTicks ? gridLines.tickMarkLength : 0;

            var scaleLabelFontColor = helpers.valueOrDefault(
              scaleLabel.fontColor,
              globalDefaults.defaultFontColor
            );
            var scaleLabelFont = parseFontOptions(scaleLabel);
            var scaleLabelPadding = helpers.options.toPadding(
              scaleLabel.padding
            );
            var labelRotationRadians = helpers.toRadians(me.labelRotation);

            var itemsToDraw = [];

            var axisWidth = me.options.gridLines.lineWidth;
            var xTickStart =
              options.position === 'right'
                ? me.left
                : me.right - axisWidth - tl;
            var xTickEnd =
              options.position === 'right' ? me.left + tl : me.right;
            var yTickStart =
              options.position === 'bottom'
                ? me.top + axisWidth
                : me.bottom - tl - axisWidth;
            var yTickEnd =
              options.position === 'bottom'
                ? me.top + axisWidth + tl
                : me.bottom + axisWidth;

            helpers.each(ticks, function(tick, index) {
              // autoskipper skipped this tick (#4635)
              if (helpers.isNullOrUndef(tick.label)) {
                return;
              }
              var label = tick.label;
              var lineWidth, lineColor, borderDash, borderDashOffset;
              if (
                index === me.zeroLineIndex &&
                options.offset === gridLines.offsetGridLines
              ) {
                // Draw the first index specially
                lineWidth = gridLines.zeroLineWidth;
                lineColor = gridLines.zeroLineColor;
                borderDash = gridLines.zeroLineBorderDash;
                borderDashOffset = gridLines.zeroLineBorderDashOffset;
              } else {
                lineWidth = helpers.valueAtIndexOrDefault(
                  gridLines.lineWidth,
                  index
                );
                lineColor = helpers.valueAtIndexOrDefault(
                  gridLines.color,
                  index
                );
                borderDash = helpers.valueOrDefault(
                  gridLines.borderDash,
                  globalDefaults.borderDash
                );
                borderDashOffset = helpers.valueOrDefault(
                  gridLines.borderDashOffset,
                  globalDefaults.borderDashOffset
                );
              }
              // Common properties
              var tx1, ty1, tx2, ty2, x1, y1, x2, y2, labelX, labelY;
              var textAlign = 'middle';
              var textBaseline = 'middle';
              var tickPadding = optionTicks.padding;
              if (isHorizontal) {
                var labelYOffset = tl + tickPadding;
                if (options.position === 'bottom') {
                  // bottom
                  textBaseline = !isRotated ? 'top' : 'middle';
                  textAlign = !isRotated ? 'center' : 'right';
                  labelY = me.top + labelYOffset;
                } else {
                  // top
                  textBaseline = !isRotated ? 'bottom' : 'middle';
                  textAlign = !isRotated ? 'center' : 'left';
                  labelY = me.bottom - labelYOffset;
                }
                var xLineValue = getLineValue(
                  me,
                  index,
                  gridLines.offsetGridLines && ticks.length > 1
                );
                if (xLineValue < me.left) {
                  lineColor = 'rgba(0,0,0,0)';
                }
                xLineValue += helpers.aliasPixel(lineWidth);

                labelX = me.getPixelForTick(index) + optionTicks.labelOffset; // x values for optionTicks (need to consider offsetLabel option)

                tx1 = tx2 = x1 = x2 = xLineValue;
                ty1 = yTickStart;
                ty2 = yTickEnd;
                y1 = chartArea.top;
                y2 = chartArea.bottom + axisWidth;
              } else {
                var isLeft = options.position === 'left';
                var labelXOffset;

                if (optionTicks.mirror) {
                  textAlign = isLeft ? 'left' : 'right';
                  labelXOffset = tickPadding;
                } else {
                  textAlign = isLeft ? 'right' : 'left';
                  labelXOffset = tl + tickPadding;
                }
                labelX = isLeft
                  ? me.right - labelXOffset
                  : me.left + labelXOffset;

                var yLineValue = getLineValue(
                  me,
                  index,
                  gridLines.offsetGridLines && ticks.length > 1
                );
                if (yLineValue < me.top) {
                  lineColor = 'rgba(0,0,0,0)';
                }
                yLineValue += helpers.aliasPixel(lineWidth);
                labelY = me.getPixelForTick(index) + optionTicks.labelOffset;
                tx1 = xTickStart;
                tx2 = xTickEnd;
                x1 = chartArea.left;
                x2 = chartArea.right + axisWidth;
                ty1 = ty2 = y1 = y2 = yLineValue;
              }
              itemsToDraw.push({
                tx1: tx1,
                ty1: ty1,
                tx2: tx2,
                ty2: ty2,
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                labelX: labelX,
                labelY: labelY,
                glWidth: lineWidth,
                glColor: lineColor,
                glBorderDash: borderDash,
                glBorderDashOffset: borderDashOffset,
                rotation: -1 * labelRotationRadians,
                label: label,
                major: tick.major,
                textBaseline: textBaseline,
                textAlign: textAlign
              });
            });
            // Draw all of the tick labels, tick marks, and grid lines at the correct places
            helpers.each(itemsToDraw, function(itemToDraw) {
              if (gridLines.display) {
                context.save();
                context.lineWidth = itemToDraw.glWidth;
                context.strokeStyle = itemToDraw.glColor;
                if (context.setLineDash) {
                  context.setLineDash(itemToDraw.glBorderDash);
                  context.lineDashOffset = itemToDraw.glBorderDashOffset;
                }
                context.beginPath();
                if (gridLines.drawTicks) {
                  context.moveTo(itemToDraw.tx1, itemToDraw.ty1);
                  context.lineTo(itemToDraw.tx2, itemToDraw.ty2);
                }
                if (gridLines.drawOnChartArea) {
                  context.moveTo(itemToDraw.x1, itemToDraw.y1);
                  context.lineTo(itemToDraw.x2, itemToDraw.y2);
                }
                context.stroke();
                context.restore();
              }
              if (optionTicks.display) {
                // Make sure we draw text in the correct color and font
                context.save();
                context.translate(itemToDraw.labelX, itemToDraw.labelY);
                context.rotate(itemToDraw.rotation);
                context.font = itemToDraw.major
                  ? majorTickFont.font
                  : tickFont.font;
                context.fillStyle = itemToDraw.major
                  ? majorTickFontColor
                  : tickFontColor;
                context.textBaseline = itemToDraw.textBaseline;
                context.textAlign = itemToDraw.textAlign;

                var label = itemToDraw.label;
                if (helpers.isArray(label)) {
                  var lineCount = label.length;
                  var lineHeight = tickFont.size * 1.5;
                  var y = me.isHorizontal()
                    ? 0
                    : (-lineHeight * (lineCount - 1)) / 2;

                  for (var i = 0; i < lineCount; ++i) {
                    // We just make sure the multiline element is a string here..
                    context.fillText('' + label[i], 0, y);
                    // apply same lineSpacing as calculated @ L#320
                    y += lineHeight;
                  }
                } else {
                  context.fillText(label, 0, 0);
                }
                context.restore();
              }
            });
            if (scaleLabel.display) {
              // Draw the scale label
              var scaleLabelX;
              var scaleLabelY;
              var rotation = 0;
              var halfLineHeight = parseLineHeight(scaleLabel) / 2;

              if (isHorizontal) {
                scaleLabelX = me.left + (me.right - me.left) / 2; // midpoint of the width
                scaleLabelY =
                  options.position === 'bottom'
                    ? me.bottom - halfLineHeight - scaleLabelPadding.bottom
                    : me.top + halfLineHeight + scaleLabelPadding.top;
              } else {
                var isLeft = options.position === 'left';
                scaleLabelX = isLeft
                  ? me.left + halfLineHeight + scaleLabelPadding.top
                  : me.right - halfLineHeight - scaleLabelPadding.top;
                scaleLabelY = me.top + (me.bottom - me.top) / 2;
                rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
              }
              context.save();
              context.translate(scaleLabelX, scaleLabelY);
              context.rotate(rotation);
              context.textAlign = 'center';
              context.textBaseline = 'middle';
              context.fillStyle = scaleLabelFontColor; // render in correct colour
              context.font = scaleLabelFont.font;
              context.fillText(scaleLabel.labelString, 0, 0);
              context.restore();
            }
            if (gridLines.drawBorder) {
              // Draw the line at the edge of the axis
              context.lineWidth = helpers.valueAtIndexOrDefault(
                gridLines.lineWidth,
                0
              );
              context.strokeStyle = helpers.valueAtIndexOrDefault(
                gridLines.color,
                0
              );
              var x1 = me.left;
              var x2 = me.right + axisWidth;
              var y1 = me.top;
              var y2 = me.bottom + axisWidth;

              var aliasPixel = helpers.aliasPixel(context.lineWidth);
              if (isHorizontal) {
                y1 = y2 = options.position === 'top' ? me.bottom : me.top;
                y1 += aliasPixel;
                y2 += aliasPixel;
              } else {
                x1 = x2 = options.position === 'left' ? me.right : me.left;
                x1 += aliasPixel;
                x2 += aliasPixel;
              }
              context.beginPath();
              context.moveTo(x1, y1);
              context.lineTo(x2, y2);
              context.stroke();
            }
          }
        });
      },
      {
        '../helpers/index': 63,
        './core.defaults': 43,
        './core.element': 44,
        './core.ticks': 52
    ],
    51: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('./core.defaults');
        var helpers = require('../helpers/index');
        var layouts = require('./core.layouts');

        module.exports = {
          // Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
          // use the new chart options to grab the correct scale
          constructors: {},
          // Use a registration function so that we can move to an ES6 map when we no longer need to support
          // old browsers

          // Scale config defaults
          defaults: {},
          registerScaleType: function(type, scaleConstructor, scaleDefaults) {
            this.constructors[type] = scaleConstructor;
            this.defaults[type] = helpers.clone(scaleDefaults);
          },
          getScaleConstructor: function(type) {
            return this.constructors.hasOwnProperty(type)
              ? this.constructors[type]
              : undefined;
          },
          getScaleDefaults: function(type) {
            // Return the scale defaults merged with the global settings so that we always use the latest ones
            return this.defaults.hasOwnProperty(type)
              ? helpers.merge({}, [defaults.scale, this.defaults[type]])
              : {};
          },
          updateScaleDefaults: function(type, additions) {
            var me = this;
            if (me.defaults.hasOwnProperty(type)) {
              me.defaults[type] = helpers.extend(me.defaults[type], additions);
            }
          },
          addScalesToLayout: function(chart) {
            // Adds each scale to the chart.boxes array to be sized accordingly
            helpers.each(chart.scales, function(scale) {
              // Set ILayoutItem parameters for backwards compatibility
              scale.fullWidth = scale.options.fullWidth;
              scale.position = scale.options.position;
              scale.weight = scale.options.weight;
              layouts.addBox(chart, scale);
            });
          }
        };
      },
      { '../helpers/index': 63, './core.defaults': 43, './core.layouts': 48 }
    ],
    52: [
      function(require, module, exports) {
        'use strict';
        var helpers = require('../helpers/index');
        /**
         * Namespace to hold static tick generation functions
         * @namespace Chart.Ticks
         */
        module.exports = {
          /**
           * Namespace to hold formatters for different types of ticks
           * @namespace Chart.Ticks.formatters
           */
          formatters: {
            /**
             * Formatter for value labels
             * @method Chart.Ticks.formatters.values
             * @param value the value to display
             * @return {String|Array} the label to display
             */
            values: function(value) {
              return helpers.isArray(value) ? value : '' + value;
            },

            /**
             * Formatter for linear numeric ticks
             * @method Chart.Ticks.formatters.linear
             * @param tickValue {Number} the value to be formatted
             * @param index {Number} the position of the tickValue parameter in the ticks array
             * @param ticks {Array<Number>} the list of ticks being converted
             * @return {String} string representation of the tickValue parameter
             */
            linear: function(tickValue, index, ticks) {
              // If we have lots of ticks, don't use the ones
              var delta =
                ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];

              // If we have a number like 2.5 as the delta, figure out how many decimal places we need
              if (Math.abs(delta) > 1) {
                if (tickValue !== Math.floor(tickValue)) {
                  // not an integer
                  delta = tickValue - Math.floor(tickValue);
                }
              }
              var logDelta = helpers.log10(Math.abs(delta));
              var tickString = '';

              if (tickValue !== 0) {
                var maxTick = Math.max(
                  Math.abs(ticks[0]),
                  Math.abs(ticks[ticks.length - 1])
                );
                if (maxTick < 1e-4) {
                  // all ticks are small numbers; use scientific notation
                  var logTick = helpers.log10(Math.abs(tickValue));
                  tickString = tickValue.toExponential(
                    Math.floor(logTick) - Math.floor(logDelta)
                  );
                } else {
                  var numDecimal = -1 * Math.floor(logDelta);
                  numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
                  tickString = tickValue.toFixed(numDecimal);
                }
              } else {
                tickString = '0'; // never show decimal places for 0
              }
              return tickString;
            },

            logarithmic: function(tickValue, index, ticks) {
              var remain =
                tickValue / Math.pow(10, Math.floor(helpers.log10(tickValue)));

              if (tickValue === 0) {
                return '0';
              } else if (
                remain === 1 ||
                remain === 2 ||
                remain === 5 ||
                index === 0 ||
                index === ticks.length - 1
              ) {
                return tickValue.toExponential();
              }
              return '';
            }
          }
        };
      },
      { '../helpers/index': 63 }
    ],
    53: [
      function(require, module, exports) {
        'use strict';

        var defaults = require('./core.defaults');
        var Element = require('./core.element');
        var helpers = require('../helpers/index');

        defaults._set('global', {
          tooltips: {
            enabled: true,
            custom: null,
            mode: 'nearest',
            position: 'average',
            intersect: true,
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleFontStyle: 'bold',
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleFontColor: '#fff',
            titleAlign: 'left',
            bodySpacing: 2,
            bodyFontColor: '#fff',
            bodyAlign: 'left',
            footerFontStyle: 'bold',
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFontColor: '#fff',
            footerAlign: 'left',
            yPadding: 6,
            xPadding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            multiKeyBackground: '#fff',
            displayColors: true,
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            callbacks: {
              // Args are: (tooltipItems, data)
              beforeTitle: helpers.noop,
              title: function(tooltipItems, data) {
                // Pick first xLabel for now
                var title = '';
                var labels = data.labels;
                var labelCount = labels ? labels.length : 0;

                if (tooltipItems.length > 0) {
                  var item = tooltipItems[0];

                  if (item.xLabel) {
                    title = item.xLabel;
                  } else if (labelCount > 0 && item.index < labelCount) {
                    title = labels[item.index];
                  }
                }
                return title;
              },
              afterTitle: helpers.noop,
              // Args are: (tooltipItems, data)
              beforeBody: helpers.noop,
              // Args are: (tooltipItem, data)
              beforeLabel: helpers.noop,
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += tooltipItem.yLabel;
                return label;
              },
              labelColor: function(tooltipItem, chart) {
                var meta = chart.getDatasetMeta(tooltipItem.datasetIndex);
                var activeElement = meta.data[tooltipItem.index];
                var view = activeElement._view;
                return {
                  borderColor: view.borderColor,
                  backgroundColor: view.backgroundColor
                };
              },
              labelTextColor: function() {
                return this._options.bodyFontColor;
              },
              afterLabel: helpers.noop,

              // Args are: (tooltipItems, data)
              afterBody: helpers.noop,

              // Args are: (tooltipItems, data)
              beforeFooter: helpers.noop,
              footer: helpers.noop,
              afterFooter: helpers.noop
            }
        });
        var positioners = {
          /**
           * Average mode places the tooltip at the average position of the elements shown
           * @function Chart.Tooltip.positioners.average
           * @param elements {ChartElement[]} the elements being displayed in the tooltip
           * @returns {Point} tooltip position
           */
          average: function(elements) {
            if (!elements.length) {
              return false;
            }
            var i, len;
            var x = 0;
            var y = 0;
            var count = 0;

            for (i = 0, len = elements.length; i < len; ++i) {
              var el = elements[i];
              if (el && el.hasValue()) {
                var pos = el.tooltipPosition();
                x += pos.x;
                y += pos.y;
                ++count;
              }
            }
            return {
              x: Math.round(x / count),
              y: Math.round(y / count)
            };
          },

          /**
           * Gets the tooltip position nearest of the item nearest to the event position
           * @function Chart.Tooltip.positioners.nearest
           * @param elements {Chart.Element[]} the tooltip elements
           * @param eventPosition {Point} the position of the event in canvas coordinates
           * @returns {Point} the tooltip position
           */
          nearest: function(elements, eventPosition) {
            var x = eventPosition.x;
            var y = eventPosition.y;
            var minDistance = Number.POSITIVE_INFINITY;
            var i, len, nearestElement;

            for (i = 0, len = elements.length; i < len; ++i) {
              var el = elements[i];
              if (el && el.hasValue()) {
                var center = el.getCenterPoint();
                var d = helpers.distanceBetweenPoints(eventPosition, center);

                if (d < minDistance) {
                  minDistance = d;
                  nearestElement = el;
                }
              }
            }
            if (nearestElement) {
              var tp = nearestElement.tooltipPosition();
              x = tp.x;
              y = tp.y;
            }
            return {
              x: x,
              y: y
            };
          }
        };
        /**
         * Helper method to merge the opacity into a color
         */
        function mergeOpacity(colorString, opacity) {
          var color = helpers.color(colorString);
          return color.alpha(opacity * color.alpha()).rgbaString();
        // Helper to push or concat based on if the 2nd parameter is an array or not
        function pushOrConcat(base, toPush) {
          if (toPush) {
            if (helpers.isArray(toPush)) {
              // base = base.concat(toPush);
              Array.prototype.push.apply(base, toPush);
            } else {
              base.push(toPush);
            }
          }
          return base;
        }
        /**
         * Returns array of strings split by newline
         * @param {String} value - The value to split by newline.
         * @returns {Array} value if newline present - Returned from String split() method
         * @function
         */
        function splitNewlines(str) {
          if (
            (typeof str === 'string' || str instanceof String) &&
            str.indexOf('\n') > -1
          ) {
            return str.split('\n');
          }
          return str;
        }

        // Private helper to create a tooltip item model
        // @param element : the chart element (point, arc, bar) to create the tooltip item for
        // @return : new tooltip item
        function createTooltipItem(element) {
          var xScale = element._xScale;
          var yScale = element._yScale || element._scale; // handle radar || polarArea charts
          var index = element._index;
          var datasetIndex = element._datasetIndex;

          return {
            xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : '',
            yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : '',
            index: index,
            datasetIndex: datasetIndex,
            x: element._model.x,
            y: element._model.y
          };
        }

        /**
         * Helper to get the reset model for the tooltip
         * @param tooltipOpts {Object} the tooltip options
         */
        function getBaseModel(tooltipOpts) {
          var globalDefaults = defaults.global;
          var valueOrDefault = helpers.valueOrDefault;

          return {
            // Positioning
            xPadding: tooltipOpts.xPadding,
            yPadding: tooltipOpts.yPadding,
            xAlign: tooltipOpts.xAlign,
            yAlign: tooltipOpts.yAlign,

            // Body
            bodyFontColor: tooltipOpts.bodyFontColor,
            _bodyFontFamily: valueOrDefault(
              tooltipOpts.bodyFontFamily,
              globalDefaults.defaultFontFamily
            ),
            _bodyFontStyle: valueOrDefault(
              tooltipOpts.bodyFontStyle,
              globalDefaults.defaultFontStyle
            ),
            _bodyAlign: tooltipOpts.bodyAlign,
            bodyFontSize: valueOrDefault(
              tooltipOpts.bodyFontSize,
              globalDefaults.defaultFontSize
            ),
            bodySpacing: tooltipOpts.bodySpacing,

            // Title
            titleFontColor: tooltipOpts.titleFontColor,
            _titleFontFamily: valueOrDefault(
              tooltipOpts.titleFontFamily,
              globalDefaults.defaultFontFamily
            ),
            _titleFontStyle: valueOrDefault(
              tooltipOpts.titleFontStyle,
              globalDefaults.defaultFontStyle
            ),
            titleFontSize: valueOrDefault(
              tooltipOpts.titleFontSize,
              globalDefaults.defaultFontSize
            ),
            _titleAlign: tooltipOpts.titleAlign,
            titleSpacing: tooltipOpts.titleSpacing,
            titleMarginBottom: tooltipOpts.titleMarginBottom,

            // Footer
            footerFontColor: tooltipOpts.footerFontColor,
            _footerFontFamily: valueOrDefault(
              tooltipOpts.footerFontFamily,
              globalDefaults.defaultFontFamily
            ),
            _footerFontStyle: valueOrDefault(
              tooltipOpts.footerFontStyle,
              globalDefaults.defaultFontStyle
            ),
            footerFontSize: valueOrDefault(
              tooltipOpts.footerFontSize,
              globalDefaults.defaultFontSize
            ),
            _footerAlign: tooltipOpts.footerAlign,
            footerSpacing: tooltipOpts.footerSpacing,
            footerMarginTop: tooltipOpts.footerMarginTop,

            // Appearance
            caretSize: tooltipOpts.caretSize,
            cornerRadius: tooltipOpts.cornerRadius,
            backgroundColor: tooltipOpts.backgroundColor,
            opacity: 0,
            legendColorBackground: tooltipOpts.multiKeyBackground,
            displayColors: tooltipOpts.displayColors,
            borderColor: tooltipOpts.borderColor,
            borderWidth: tooltipOpts.borderWidth
          };
        }

        /**
         * Get the size of the tooltip
         */
        function getTooltipSize(tooltip, model) {
          var ctx = tooltip._chart.ctx;

          var height = model.yPadding * 2; // Tooltip Padding
          var width = 0;

          // Count of all lines in the body
          var body = model.body;
          var combinedBodyLength = body.reduce(function(count, bodyItem) {
            return (
              count +
              bodyItem.before.length +
              bodyItem.lines.length +
              bodyItem.after.length
            );
          }, 0);
          combinedBodyLength +=
            model.beforeBody.length + model.afterBody.length;

          var titleLineCount = model.title.length;
          var footerLineCount = model.footer.length;
          var titleFontSize = model.titleFontSize;
          var bodyFontSize = model.bodyFontSize;
          var footerFontSize = model.footerFontSize;

          height += titleLineCount * titleFontSize; // Title Lines
          height += titleLineCount
            ? (titleLineCount - 1) * model.titleSpacing
            : 0; // Title Line Spacing
          height += titleLineCount ? model.titleMarginBottom : 0; // Title's bottom Margin
          height += combinedBodyLength * bodyFontSize; // Body Lines
          height += combinedBodyLength
            ? (combinedBodyLength - 1) * model.bodySpacing
            : 0; // Body Line Spacing
          height += footerLineCount ? model.footerMarginTop : 0; // Footer Margin
          height += footerLineCount * footerFontSize; // Footer Lines
          height += footerLineCount
            ? (footerLineCount - 1) * model.footerSpacing
            : 0; // Footer Line Spacing

          // Title width
          var widthPadding = 0;
          var maxLineWidth = function(line) {
            width = Math.max(width, ctx.measureText(line).width + widthPadding);
          };

          ctx.font = helpers.fontString(
            titleFontSize,
            model._titleFontStyle,
            model._titleFontFamily
          );
          helpers.each(model.title, maxLineWidth);

          // Body width
          ctx.font = helpers.fontString(
            bodyFontSize,
            model._bodyFontStyle,
            model._bodyFontFamily
          );
          helpers.each(model.beforeBody.concat(model.afterBody), maxLineWidth);

          // Body lines may include some extra width due to the color box
          widthPadding = model.displayColors ? bodyFontSize + 2 : 0;
          helpers.each(body, function(bodyItem) {
            helpers.each(bodyItem.before, maxLineWidth);
            helpers.each(bodyItem.lines, maxLineWidth);
            helpers.each(bodyItem.after, maxLineWidth);
          });
          // Reset back to 0
          widthPadding = 0;
          // Footer width
          ctx.font = helpers.fontString(
            footerFontSize,
            model._footerFontStyle,
            model._footerFontFamily
          );
          helpers.each(model.footer, maxLineWidth);
          // Add padding
          width += 2 * model.xPadding;
          return {
            width: width,
            height: height
          };
        }
        /**
         * Helper to get the alignment of a tooltip given the size
         */
        function determineAlignment(tooltip, size) {
          var model = tooltip._model;
          var chart = tooltip._chart;
          var chartArea = tooltip._chart.chartArea;
          var xAlign = 'center';
          var yAlign = 'center';

          if (model.y < size.height) {
            yAlign = 'top';
          } else if (model.y > chart.height - size.height) {
            yAlign = 'bottom';
          }
          var lf, rf; // functions to determine left, right alignment
          var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
          var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
          var midX = (chartArea.left + chartArea.right) / 2;
          var midY = (chartArea.top + chartArea.bottom) / 2;
          if (yAlign === 'center') {
            lf = function(x) {
              return x <= midX;
            };
            rf = function(x) {
              return x > midX;
            };
          } else {
            lf = function(x) {
              return x <= size.width / 2;
            };
            rf = function(x) {
              return x >= chart.width - size.width / 2;
            };
          }
          olf = function(x) {
            return (
              x + size.width + model.caretSize + model.caretPadding >
              chart.width
            );
          };
          orf = function(x) {
            return x - size.width - model.caretSize - model.caretPadding < 0;
          };
          yf = function(y) {
            return y <= midY ? 'top' : 'bottom';
          };

          if (lf(model.x)) {
            xAlign = 'left';

            // Is tooltip too wide and goes over the right side of the chart.?
            if (olf(model.x)) {
              xAlign = 'center';
              yAlign = yf(model.y);
            }
          } else if (rf(model.x)) {
            xAlign = 'right';
            // Is tooltip too wide and goes outside left edge of canvas?
            if (orf(model.x)) {
              xAlign = 'center';
              yAlign = yf(model.y);
            }
          }
          var opts = tooltip._options;
          return {
            xAlign: opts.xAlign ? opts.xAlign : xAlign,
            yAlign: opts.yAlign ? opts.yAlign : yAlign
          };
        }
        /**
         * Helper to get the location a tooltip needs to be placed at given the initial position (via the vm) and the size and alignment
         */
        function getBackgroundPoint(vm, size, alignment, chart) {
          // Background Position
          var x = vm.x;
          var y = vm.y;

          var caretSize = vm.caretSize;
          var caretPadding = vm.caretPadding;
          var cornerRadius = vm.cornerRadius;
          var xAlign = alignment.xAlign;
          var yAlign = alignment.yAlign;
          var paddingAndSize = caretSize + caretPadding;
          var radiusAndPadding = cornerRadius + caretPadding;

          if (xAlign === 'right') {
            x -= size.width;
          } else if (xAlign === 'center') {
            x -= size.width / 2;
            if (x + size.width > chart.width) {
              x = chart.width - size.width;
            }
            if (x < 0) {
              x = 0;
            }
          }
          if (yAlign === 'top') {
            y += paddingAndSize;
          } else if (yAlign === 'bottom') {
            y -= size.height + paddingAndSize;
          } else {
            y -= size.height / 2;
          }
              x += paddingAndSize;