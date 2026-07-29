# Properties File Security Validation

## Overview

The i18n-manage executor now includes comprehensive security validation for `.properties` files to prevent code injection attacks via fork PRs to the `i18n-auto-generate.yml` workflow.

## Security Context

The `.github/workflows/i18n-auto-generate.yml` workflow automatically processes `.properties` files from fork PRs and generates TypeScript files. This automation requires validation to prevent malicious actors from injecting code through translation files.

## Validation Implementation

### File: `libs/nx-plugin/src/executors/i18n-manage/utils/properties-validator.ts`

A dedicated validator that checks `.properties` files for:

#### 1. **Key Validation**

- Keys must only contain: `a-z`, `A-Z`, `0-9`, `.`, `-`, `_`
- Empty keys are rejected
- Prevents special characters that could be exploited

#### 2. **Code Injection Prevention**

Detects and rejects suspicious patterns:

- **Script injection**: `<script>`, `javascript:`, event handlers (`onclick=`, etc.)
- **Command injection**: Backticks, `$(...)`, `${...}` template literals
- **Path traversal**: `../` sequences
- **Null byte injection**: `\0` characters
- **Prototype pollution**: `__proto__`, `constructor:`, `prototype:` references

#### 3. **DoS Prevention**

- Maximum value length: 10,000 characters
- Prevents resource exhaustion attacks

#### 4. **Syntax Validation**

- All non-comment lines must follow `key=value` format
- Control characters trigger warnings (but don't fail validation)

## Integration

### Validation Order

The `validate` operation runs security checks **first**, before TypeScript validation:

```typescript
// Step 1: Security validation (properties files)
// Step 2: TypeScript validation (generated files)
// Step 3: Key consistency checks
// Step 4: Interface matching
```

This ensures malicious content is caught before any code generation occurs.

### GitHub Workflow Integration

The `i18n-auto-generate.yml` workflow already calls validation:

```yaml
- name: Validate .properties syntax (fork PRs)
  if: github.event.pull_request.head.repo.full_name != github.repository
  run: |
      echo "🔍 Validating .properties file syntax..."
      npx nx run i18n:i18n-manage --command=validate
      echo "✅ Syntax validation passed"
```

This validation now includes all security checks.

## Usage

### Command Line

```bash
# Validate all translation files (includes security checks)
nx run i18n:i18n-manage --command=validate
```

### Programmatic

```typescript
import { validatePropertiesFile, validatePropertiesFiles } from './properties-validator';

// Single file
const result = validatePropertiesFile('/path/to/file.properties');
if (!result.valid) {
    console.error('Security violations found:', result.errors);
}

// Multiple files
const result = validatePropertiesFiles(['/path/to/file1.properties', '/path/to/file2.properties']);
```

## Error Types

| Type                  | Severity | Description                          |
| --------------------- | -------- | ------------------------------------ |
| `invalid-key-chars`   | error    | Key contains disallowed characters   |
| `empty-key`           | error    | Key is empty                         |
| `suspicious-content`  | error    | Value contains injection patterns    |
| `oversized-value`     | error    | Value exceeds length limit           |
| `invalid-syntax`      | error    | Line doesn't follow key=value format |
| `invalid-value-chars` | warning  | Value contains control characters    |

## Testing

Comprehensive test coverage in `properties-validator.spec.ts`:

- Valid file scenarios
- Key validation (empty keys, special characters, spaces)
- Code injection attempts (XSS, command injection, path traversal)
- Prototype pollution attempts
- DoS prevention (oversized values)
- Syntax validation
- Multiple file validation

## Security Properties

✅ **Defense in Depth**: Multiple layers prevent exploitation
✅ **Fail-Safe**: Invalid input is rejected before processing
✅ **Comprehensive**: Covers all common injection vectors
✅ **Performance**: Efficient pattern matching, no external dependencies
✅ **Maintainable**: Clear patterns, well-documented, tested

## Limitations

- Validation is syntax-based; cannot detect all semantic attacks
- New injection vectors may require pattern updates
- Relies on workflow enforcement (fork PRs must pass validation)

## Maintenance

When updating suspicious patterns:

1. Add pattern to `SUSPICIOUS_PATTERNS` array
2. Add corresponding test case
3. Document the attack vector being prevented
4. Run full test suite to ensure no false positives

## References

- GitHub Workflow: `.github/workflows/i18n-auto-generate.yml`
- Validator Implementation: `libs/nx-plugin/src/executors/i18n-manage/utils/properties-validator.ts`
- Test Suite: `libs/nx-plugin/src/executors/i18n-manage/utils/properties-validator.spec.ts`
- Validation Operation: `libs/nx-plugin/src/executors/i18n-manage/operations/validate.ts`
