# Setting up Node.js with NVM and pnpm

This guide will walk you through installing Node.js using NVM (Node Version Manager) and setting up pnpm as your package manager.

## Installing Node Version Manager (NVM)

NVM allows you to install and manage multiple versions of Node.js on your system.

### macOS and Linux

1. Install NVM by running the following command in your terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

Or using wget:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

2. Close and reopen your terminal to load NVM.

3. Verify NVM is installed correctly:

```bash
nvm --version
```
## Installing Node.js

Giselle requires Node.js version 22.14.0 or later.

1. Install the required Node.js version:

```bash
nvm install 22.14.0
```

2. Set this version as default:

```bash
nvm use 22.14.0
```

3. Verify the installation:

```bash
node --version
```

The output should show v22.14.0 or later.

## Setting up pnpm

pnpm is a fast, disk space efficient package manager that's used by the Giselle project.

1. Install pnpm using the recommended method:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

2. Close and reopen your terminal to load pnpm.

3. Verify pnpm is installed correctly:

```bash
pnpm --version
```

## Troubleshooting

If you encounter any issues:

- Make sure your terminal is restarted after installing NVM
- Check that you're using the correct Node.js version with `node --version`
- Ensure pnpm is installed globally with `pnpm --version`
- If commands aren't recognized, verify your PATH environment variables
