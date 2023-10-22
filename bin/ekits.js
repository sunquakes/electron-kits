#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const command = process.argv[2]
if (command === '-V' || command === '--version') {
  const packageJson = require('../package.json')
  console.info(packageJson.version)
  process.exit(1)
} else if (command === 'create') {
  const projectName = process.argv[3]
  const projectDirectory = path.join(process.cwd(), projectName)

  // Check if the project directory already exists
  if (fs.existsSync(projectDirectory)) {
    console.error('Project directory already exists.')
    process.exit(1)
  }

  // Create the project directory
  fs.mkdirSync(projectDirectory)

  const templatePath = __dirname + '/../'

  const excludes = ['node_modules', '.vscode', 'dist', '.git']
  copyDirectory(templatePath, projectDirectory, excludes)
} else {
  console.info(help())
  process.exit(1)
}

function copyDirectory(source, destination, excludes) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination)
  }

  const files = fs.readdirSync(source)

  for (const file of files) {
    if (excludes.includes(file)) {
      continue
    }
    const sourceFilePath = path.join(source, file)
    const destinationFilePath = path.join(destination, file)

    if (fs.statSync(sourceFilePath).isDirectory()) {
      copyDirectory(sourceFilePath, destinationFilePath, excludes)
    } else {
      fs.copyFileSync(sourceFilePath, destinationFilePath)
    }
  }
}

function help() {
  return `Usage: ekits <command> [options]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  init           generate a new project from a template
  build          prototype a new project
  create         (for v3 warning only)
  help [cmd]     display help for [cmd]
`
}
