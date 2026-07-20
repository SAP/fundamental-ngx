# @fundamental-ngx/cdk

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fcdk.svg)](//www.npmjs.com/package/@fundamental-ngx/cdk)
![Build Status](https://github.com/SAP/fundamental-ngx/actions/workflows/create-release.yml/badge.svg?branch=main)
![npm](https://img.shields.io/npm/dm/@fundamental-ngx/cdk?label=npm%20downloads)
[![Slack](https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack)](https://ui-fundamentals.slack.com)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

## Description

`@fundamental-ngx/cdk` is a set of utilities and Angular directives for building custom UI components with common interaction patterns. It includes `DataSource` abstractions, `ControlValueAccessor` helpers, focusable/selectable list utilities, drag-and-drop directives, and more.

See the [Component Documentation](https://sap.github.io/fundamental-ngx) for examples and API details.

## Requirements

Angular 22 or newer. Prior knowledge of Angular is recommended.

## Getting Started

```bash
ng add @fundamental-ngx/cdk
```

Import individual modules:

```typescript
import { DragAndDropModule } from '@fundamental-ngx/cdk/utils';
import { DataSourceModule } from '@fundamental-ngx/cdk/data-source';
```

## Versioning

Check the [Breaking Changes](https://github.com/SAP/fundamental-ngx/wiki#breaking-changes) for upgrade guidance.

## Known Issues

See [Issues](https://github.com/SAP/fundamental-ngx/issues).

## Support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

## Contributing

See [CONTRIBUTING.md](https://github.com/SAP/fundamental-ngx/blob/main/CONTRIBUTING.md) for guidelines and [NEW_COMPONENT.md](https://github.com/SAP/fundamental-ngx/blob/main/NEW_COMPONENT.md) for building new components.

## License

See [LICENSE.txt](https://github.com/SAP/fundamental-ngx/blob/main/LICENSE.txt).
