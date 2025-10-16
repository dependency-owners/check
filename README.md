# check

GitHub Action to check for unowned dependencies using [dependency-owners](https://github.com/dependency-owners/dependency-owners).

## Usage

See [action.yml](action.yml)

```yaml
- uses: dependency-owners/check@v2
  with:
    # Path to the configuration file. Default: 'dependency-owners.json'
    config-file: ''

    # Path to the dependency file.
    dependency-file: ''

    # Loader to use for loading dependencies.
    loader: ''
```
