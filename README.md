# check

GitHub Action to check for unowned dependencies using [dependency-owners](https://github.com/dependency-owners/dependency-owners).

## Usage

See [action.yml](action.yml)

```yaml
- uses: dependency-owners/check@v1
  with:
    # Path to the configuration file. Default: 'dependency-owners.json'
    config-file: ''

    # Path to the dependency file. Default: 'package.json'
    dependency-file: ''

    # Loader to use for loading dependencies. Default: '@dependency-owners/package-json-loader'
    loader: ''
```
