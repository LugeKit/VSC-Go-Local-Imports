# Go Local Imports

**Go Local Imports** is a Visual Studio Code extension that automates the configuration of local import grouping for Go projects.

When working on Go projects, it's a common practice to separate standard library imports, third-party imports, and local project imports into distinct groups. This is typically handled by `goimports` via the `local` flag. This extension automates setting that flag for `gopls` based on your project's `go.mod` file.

## Features

*   **Automatic Module Detection**: Scans your workspace's `go.mod` file to identify the module name.
*   **Seamless Configuration**: Automatically updates the workspace `gopls` settings (`formatting.local`) to include your module name.
*   **Standardized Formatting**: Ensures that when you save or format your Go files, imports from your current project are grouped separately from third-party dependencies.

## How It Works

1.  Open a Go project in VS Code that contains a `go.mod` file.
2.  The extension activates and reads the module name from `go.mod`.
3.  It checks your workspace settings for `gopls`.
4.  If `formatting.local` is not already configured, it updates your `.vscode/settings.json` (Workspace Settings) to set `formatting.local` to your module name.

**Example Result:**

Before (mixed imports):
```go
import (
    "fmt"
    "github.com/gin-gonic/gin"
    "github.com/my-org/my-project/utils" // Local import mixed with 3rd party
    "net/http"
)
```

After (grouped imports):
```go
import (
    "fmt"
    "net/http"

    "github.com/gin-gonic/gin"

    "github.com/my-org/my-project/utils" // Local import separated
)
```

## Requirements

This extension relies on the official [Go extension for VS Code](https://marketplace.visualstudio.com/items?itemName=golang.go) to handle the actual formatting via `gopls`.

## Extension Settings

This extension modifies the following setting in your workspace configuration:

*   `gopls`: Adds or updates the `formatting.local` property.

## Release Notes

### 0.0.1
*   Initial release.
*   Basic functionality to read `go.mod` and set `gopls.formatting.local`.

---

**Enjoy coding with cleaner imports!**
