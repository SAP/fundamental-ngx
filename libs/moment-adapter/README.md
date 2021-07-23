# Fundamental Moment date time adapter implementation

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fplatform.svg)](//www.npmjs.com/package/@fundamental-ngx/platform)
[![Minified Size](https://badgen.net/bundlephobia/min/%40fundamental-ngx%2Fplatform)](https://bundlephobia.com/result?p=%40fundamental-ngx%2Fplatform)
[![Minzipped Size](https://badgen.net/bundlephobia/minzip/%40fundamental-ngx%2Fplatform)](https://bundlephobia.com/result?p=%40fundamental-ngx%2Fplatform)
[![Build Status](https://travis-ci.org/SAP/fundamental-ngx.svg?branch=main)](https://travis-ci.org/SAP/fundamental-ngx)
[![Coverage Status](https://coveralls.io/repos/github/SAP/fundamental-ngx/badge.svg?branch=main)](https://coveralls.io/github/SAP/fundamental-ngx?branch=main)
[![Slack](https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack)](https://ui-fundamentals.slack.com)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

## Description

Fundamental Date Picker, Time Picker, Date Time Picker and similar components rely on provided datetime implementation (DatetimeAdapter) and datetime formats (DateTimeFormats).

These components could be used with FdDatetimeAdapter, based on the JavaScript's native Date object, but one of the biggest shortcomings of the native Date object is the inability to set the parse format. As an alternative could be the MomentDateAdapter or a custom DateAdapter that works with the formatting/parsing library of your choice.