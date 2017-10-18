const AsciiArt = require('../lib/ascii-art')

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AsciiArt', function () {
  let [workspaceElement, activationPromise] = Array.from([])

  beforeEach(function () {
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('ascii-art')

    return waitsForPromise(() => atom.workspace.open())
  })

  return it('converts', function () {
    const editor = atom.workspace.getActiveTextEditor()
    editor.insertText('cool')
    editor.selectAll()
    const changeHandler = jasmine.createSpy('changeHandler')
    editor.onDidChange(changeHandler)

    atom.commands.dispatch(workspaceElement, 'ascii-art:convert')

    waitsForPromise(() => activationPromise)

    waitsFor(() => changeHandler.callCount > 0)

    return runs(() =>
      expect(editor.getText()).toEqual(`\

                                   o888  
  ooooooo     ooooooo     ooooooo   888  
888     888 888     888 888     888 888  
888         888     888 888     888 888  
  88ooo888    88ooo88     88ooo88  o888o 
                                         
\
`
      )
    )
  })
})
