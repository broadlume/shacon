# Shacon (Shared Config)

This repo houses a set of shared configuration packages used for this @adHawk
organization so we can re-use core tooling in different projects.

## Packages

### [@adhawk/babel-preset](./packages/babel-preset)

To use, add this packages to your `presets` in a Babel config.

```json
{
  "presets": [
    ["@adhawk/babel-preset", {
      "react": true
    }]
  ]
}
```

### [@adhawk/jest-preset](./packages/babel-config)

To use, add this packages to your `preset` in a Jest config.

```javascript
module.exports = {
  preset: "@adhawk/jest-preset/default"
}

// Or for React
module.exports = {
  preset: "@adhawk/jest-preset/react"
}
```
