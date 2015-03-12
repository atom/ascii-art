AsciiArt = require '../lib/ascii-art'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "AsciiArt", ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('ascii-art')

    waitsForPromise ->
      atom.workspace.open()

  it "converts", ->
    atom.commands.dispatch workspaceElement, 'ascii-art:convert'

    waitsForPromise ->
      activationPromise
